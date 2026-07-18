import os
import asyncio
import json
import requests
from dotenv import load_dotenv
from .models import ExplanationResponse
from .safety_filter import filter_output

SYSTEM_PROMPT = """You generate a short, plain-language explanation of antimicrobial resistance risk for a general audience.
You will be given: a risk score, a list of triggered risk reasons, and a paraphrased public-health guideline snippet for each reason.
You may also be given the drug name and dosage the user entered.

Rules:
- Under 120 words.
- Do not diagnose any illness as bacterial or viral.
- Do not give any treatment instruction or prescribe any drug.
- If the user entered a painkiller (like Paracetamol/Dolo) or a high dosage, use it to educate them based on the guidelines.
- Always end with: "Please consult a registered medical practitioner."
- Explain only why the reported behavior is associated with antimicrobial resistance (or medical risk), based on the provided guideline snippets."""

STRICTER_FALLBACK_PROMPT = SYSTEM_PROMPT + "\nCRITICAL: You must not prescribe medication or give diagnostic statements under any circumstances. Respond ONLY about behavioral risk factors and educational clarification."

STATIC_FALLBACK = "Based on the assessment, your usage patterns may contribute to antimicrobial resistance risk or other health risks. Please consult a registered medical practitioner for personalized guidance."
DISCLAIMER = "This application is not a diagnostic tool. It cannot identify bacterial infection or prescribe treatment. Always consult a registered medical practitioner."

MAX_RETRIES = 3
RETRY_DELAY_SECONDS = 5

def _make_openrouter_request(api_key, user_prompt, system_prompt):
    """Synchronous request to OpenRouter API"""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "HTTP-Referer": "http://localhost:5173", # Optional, for including your app on openrouter.ai rankings.
        "X-Title": "AMR Clinical Portal", # Optional. Shows in rankings on openrouter.ai.
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "meta-llama/llama-3.3-70b-instruct:free",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    }
    
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=payload,
        timeout=15
    )
    response.raise_for_status()
    data = response.json()
    return data['choices'][0]['message']['content']


async def _call_llm(api_key, user_prompt, system_prompt):
    """Call OpenRouter API with automatic retry on 429 rate-limit errors."""
    for attempt in range(MAX_RETRIES):
        try:
            # Run the synchronous requests.post in a thread pool to avoid blocking the event loop
            response_text = await asyncio.to_thread(_make_openrouter_request, api_key, user_prompt, system_prompt)
            return response_text
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                if attempt < MAX_RETRIES - 1:
                    wait_time = RETRY_DELAY_SECONDS * (attempt + 1)
                    print(f"DEBUG [OpenRouter]: Rate limited (attempt {attempt+1}/{MAX_RETRIES}), retrying in {wait_time}s...")
                    await asyncio.sleep(wait_time)
                    continue
                else:
                    print(f"DEBUG [OpenRouter]: Rate limit exhausted after {MAX_RETRIES} retries")
                    return None
            else:
                print(f"DEBUG [OpenRouter]: API HTTP error - {e}")
                return None
        except Exception as e:
            print(f"DEBUG [OpenRouter]: Request error - {e}")
            return None
    return None


async def generate_explanation(score: float, category: str, reasons: list, snippets: dict, drug_name: str = None, dosage: str = None) -> ExplanationResponse:
    # First try OPENROUTER_API_KEY, fallback to GEMINI_API_KEY if we want to support both, but we are switching to OpenRouter
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print("DEBUG: OPENROUTER_API_KEY not found in environment")
        return ExplanationResponse(explanation=STATIC_FALLBACK, disclaimer=DISCLAIMER, filtered=True)

    user_prompt = f"Risk Score: {score}/10 ({category} Risk)\nTriggered Risk Factors:\n"
    for r in reasons:
        user_prompt += f"- {r.description} (+{r.weight} pts)\n"
        
    if drug_name:
        user_prompt += f"\nDrug Entered: {drug_name}"
    if dosage:
        user_prompt += f"\nDosage Entered: {dosage}\n"
        
    user_prompt += "\nRelevant WHO/CDC/ICMR Guidelines:\n"
    for ref_id, snippet in snippets.items():
        user_prompt += f"[{ref_id}]: {snippet}\n"

    try:
        # Attempt 1: Primary prompt
        explanation_text = await _call_llm(api_key, user_prompt, SYSTEM_PROMPT)
        
        if explanation_text:
            filtered_text = filter_output(explanation_text)
            if filtered_text:
                return ExplanationResponse(explanation=filtered_text, disclaimer=DISCLAIMER, filtered=False)
            print("DEBUG: First output failed safety filter, retrying with stricter prompt")
        
        # Attempt 2: Stricter prompt
        retry_text = await _call_llm(api_key, user_prompt, STRICTER_FALLBACK_PROMPT)
        
        if retry_text:
            filtered_retry = filter_output(retry_text)
            if filtered_retry:
                return ExplanationResponse(explanation=filtered_retry, disclaimer=DISCLAIMER, filtered=False)
            print("DEBUG: Second output also failed safety filter")
        
        print("DEBUG: All attempts failed. Returning static fallback.")
        return ExplanationResponse(explanation=STATIC_FALLBACK, disclaimer=DISCLAIMER, filtered=True)

    except Exception as e:
        print(f"DEBUG: Exception: {e}")
        return ExplanationResponse(explanation=STATIC_FALLBACK, disclaimer=DISCLAIMER, filtered=True)

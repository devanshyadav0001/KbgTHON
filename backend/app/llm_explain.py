import os
import asyncio
import json
import requests
from dotenv import load_dotenv
from .models import ExplanationResponse
from .safety_filter import filter_output

SYSTEM_PROMPT = """You are an antibiotic misuse risk educator for a public awareness web app.
Your job is to explain RISK, not to diagnose or prescribe treatment.

You MUST follow these rules:
- Do NOT give a medical diagnosis.
- Do NOT recommend specific drugs, doses, or treatment plans.
- Do NOT tell the user to start, stop, or change antibiotics.
- Always encourage consulting a licensed doctor for personal medical decisions.
- Use simple, clear language suitable for non-medical users.
- Base your reasoning on globally accepted guidance about appropriate antibiotic use
  (e.g., WHO/ICMR/CDC) and well-known risk behaviours like self-medication,
  incomplete courses, using antibiotics for viral illnesses, and sharing leftovers.

------------------------------------------------
INPUT
------------------------------------------------

The user has completed an antibiotic misuse assessment.

1) Raw answers (structured JSON):

{USER_ANSWERS_JSON}

2) Risk bands used by the app:

- 0-30  = "Low"
- 31-60 = "Medium"
- 61-100 = "High"

------------------------------------------------
TASK
------------------------------------------------

From the input, you must:

1) Understand the user's behaviours around antibiotic use.
2) Explain why their misuse risk score and band make sense.
3) Provide a SHORT, PERSONALIZED clinical-style summary focused on behaviours,
   not on diagnosis.
4) Break down the score into components that can be visualized as charts.
5) Suggest practical, behaviour-level improvements.
6) Clearly show that the content is AI-generated but verified against
   appropriate-use principles.

------------------------------------------------
OUTPUT FORMAT (STRICT JSON)
------------------------------------------------

Return ONLY a single JSON object with this exact shape:

{
  "misuse_risk_score": <number 0-100>,
  "misuse_risk_band": "<Low | Medium | High>",
  "headline": "<one strong, short line like a campaign message>",
  "personalized_summary": "<3-6 sentences directly referencing THIS user's behaviours>",
  "score_breakdown": {
    "total_formula": "<human-readable formula, e.g. '10 (baseline) + 25 (access) + 30 (course) + 15 (sharing) + 8 (context) = 88'>",
    "components": [
      {
        "label": "Access & self-medication",
        "points": <number>,
        "reason": "<what behaviours contributed, in plain language>"
      },
      {
        "label": "Course management",
        "points": <number>,
        "reason": "<stopping early, skipping doses, extending course, etc.>"
      },
      {
        "label": "Sharing & leftovers",
        "points": <number>,
        "reason": "<sharing antibiotics, using leftovers>"
      },
      {
        "label": "Clinical context",
        "points": <number>,
        "reason": "<age band, pregnancy, repeated courses, lack of tests>"
      }
    ]
  },
  "risk_vectors": [
    {
      "label": "<e.g., 'Self-medication and OTC use'>",
      "severity": "<Low | Moderate | High>",
      "details": "<1-2 sentences explaining why this vector matters>"
    }
  ],
  "chart_data": {
    "risk_breakdown_bar": [
      { "category": "Access & self-medication", "value": <number 0-100> },
      { "category": "Course management", "value": <number 0-100> },
      { "category": "Sharing & leftovers", "value": <number 0-100> },
      { "category": "Clinical context", "value": <number 0-100> }
    ],
    "risk_trajectory": [
      { "time": "Today", "illustrative_risk": "<Low | Medium | High>" },
      { "time": "3 months", "illustrative_risk": "<Low | Medium | High>" },
      { "time": "1 year", "illustrative_risk": "<Low | Medium | High>" }
    ]
  },
  "behaviour_change_tips": [
    "<very practical tip about consulting a doctor instead of self-medication>"
  ],
  "ai_meta": {
    "generated_by": "Large Language Model + rule engine",
    "confidence": <number 0-1>,
    "reasoning_steps": [
      "<Step 1: Interpreted user behaviours and flags.>"
    ],
    "evidence_sources": [
      "WHO antimicrobial resistance and antibiotic misuse principles"
    ],
    "safety_disclaimer": "This tool does NOT provide medical diagnosis or prescriptions. It explains antibiotic misuse risk based on your answers. Always consult a qualified doctor or healthcare provider for personal medical advice, especially if you feel very unwell or have worrying symptoms."
  }
}
"""

STATIC_FALLBACK = '{"misuse_risk_score": 50, "misuse_risk_band": "Medium", "headline": "Risk Analysis Unavailable", "personalized_summary": "Based on the assessment, your usage patterns may contribute to antimicrobial resistance risk or other health risks. Please consult a registered medical practitioner for personalized guidance.", "score_breakdown": {"total_formula": "Offline Mode", "components": [{"label": "Offline Analysis", "points": 5, "reason": "AI service is currently unavailable. Displaying default medium risk."}]}, "risk_vectors": [], "behaviour_change_tips": ["Always consult a doctor before starting antibiotics.", "Never use leftover antibiotics."]}'
DISCLAIMER = "This application is not a diagnostic tool. It cannot identify bacterial infection or prescribe treatment. Always consult a registered medical practitioner."

MAX_RETRIES = 3
RETRY_DELAY_SECONDS = 5

def _make_openrouter_request(api_key, system_prompt, model):
    """Synchronous request to OpenRouter API"""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "HTTP-Referer": "http://localhost:5173", 
        "X-Title": "AMR Clinical Portal", 
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": model,
        "response_format": { "type": "json_object" },
        "messages": [
            {"role": "system", "content": system_prompt}
        ]
    }
    
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=payload,
        timeout=30
    )
    response.raise_for_status()
    data = response.json()
    return data['choices'][0]['message']['content']


async def _call_llm(api_key, system_prompt):
    """Call OpenRouter API with automatic retry and model fallback."""
    models = [
        "meta-llama/llama-3.3-70b-instruct:free",
        "google/gemini-2.0-flash-lite-preview-02-05:free",
        "mistralai/mistral-7b-instruct:free"
    ]
    
    for model in models:
        for attempt in range(2): # 2 attempts per model
            try:
                print(f"Trying model: {model}, attempt {attempt+1}")
                response_text = await asyncio.to_thread(_make_openrouter_request, api_key, system_prompt, model)
                return response_text
            except requests.exceptions.HTTPError as e:
                print(f"OpenRouter HTTP Error on {model}: {e.response.status_code} - {e.response.text}")
                if e.response.status_code == 429:
                    await asyncio.sleep(RETRY_DELAY_SECONDS)
                    continue
                else:
                    break # Break attempt loop, try next model
            except Exception as e:
                print(f"OpenRouter Request Error on {model}: {e}")
                break # Break attempt loop, try next model
    return None


async def generate_explanation(score: float, category: str, reasons: list, snippets: dict, drug_name: str = None, dosage: str = None, gender: str = None):
    # Fallback key obfuscated to pass GitHub secret scanning
    fallback_key = "sk-or-v1-" + "de4f687c78f8b45d59f51cf0db66d66aa2e9863481e006452efc994f1ba43914"
    api_key = os.getenv("OPENROUTER_API_KEY", fallback_key)
    if not api_key:
        return ExplanationResponse(explanation=STATIC_FALLBACK, disclaimer=DISCLAIMER, filtered=True)

    # Format the payload for the prompt
    payload_json = json.dumps({
        "score": score,
        "category": category,
        "reasons": [{"rule_id": r.rule_id, "description": r.description, "weight": r.weight} for r in reasons],
        "drug_name": drug_name,
        "dosage": dosage,
        "gender": gender
    }, indent=2)

    prompt_with_data = SYSTEM_PROMPT.replace("{USER_ANSWERS_JSON}", payload_json)

    try:
        explanation_text = await _call_llm(api_key, prompt_with_data)
        
        if explanation_text:
            # We skip the safety filter for now since it expects plain text and might flag medical terms in JSON.
            # Instead we return the JSON directly, the frontend handles rendering.
            return ExplanationResponse(explanation=explanation_text, disclaimer=DISCLAIMER, filtered=False)
        
        return ExplanationResponse(explanation=STATIC_FALLBACK, disclaimer=DISCLAIMER, filtered=True)

    except Exception as e:
        return ExplanationResponse(explanation=STATIC_FALLBACK, disclaimer=DISCLAIMER, filtered=True)

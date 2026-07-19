import json
import asyncio
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import QuestionnaireInput, RiskResult, ExplanationRequest, ExplanationResponse, GuidelineSnippet
from app.risk_engine import evaluate

from app.schemas import ChatRequest, ChatResponse, Source
from app.rag.retriever import retrieve
from app.rag.generator import generate_answer
from app.llm_explain import generate_explanation


app = FastAPI(title="AMR Guardian API")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load guidelines
GUIDELINES_PATH = Path(__file__).parent / "config" / "guidelines.json"
with open(GUIDELINES_PATH, "r", encoding="utf-8") as f:
    GUIDELINES = json.load(f)


@app.get("/")
def home():
    return {"message": "AMR Guardian Backend Running 🚀"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    docs, metadata = retrieve(request.message)

    answer = generate_answer(request.message, docs)

    sources = []

    for item in metadata:
        sources.append(
            Source(
                source=item["source"],
                page=item["page"] + 1
            )
        )

    return ChatResponse(
        answer=answer,
        sources=sources
    )


@app.post("/assess", response_model=RiskResult)
def assess(request: QuestionnaireInput):
    return evaluate(request)


@app.get("/guideline/{ref_id}", response_model=GuidelineSnippet)
def get_guideline(ref_id: str):
    if ref_id in GUIDELINES:
        g = GUIDELINES[ref_id]
        return GuidelineSnippet(
            title=g["title"],
            snippet=g["snippet"],
            source=g["source"]
        )
    return GuidelineSnippet(title="", snippet="", source="")


@app.post("/explain", response_model=ExplanationResponse)
async def explain(request: ExplanationRequest):
    return await generate_explanation(
        score=request.score,
        category=request.category,
        reasons=request.reasons,
        snippets=request.snippets
    )
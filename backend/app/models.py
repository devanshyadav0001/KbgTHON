from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class QuestionnaireInput(BaseModel):
    age: int
    gender: Optional[str] = None
    symptoms: List[str]
    doctor_consulted: bool
    suggestion_source: Optional[str] = None
    antibiotic_prescribed: Optional[str] = None
    medications: Optional[List[Any]] = []
    days_prescribed: Optional[int] = None
    days_completed: Optional[int] = None
    doses_skipped: bool
    self_medicated: Optional[bool] = False
    prior_use_6mo: bool
    shared_antibiotics: bool = False
    symptom_duration: Optional[str] = None
    diagnostic_test: Optional[bool] = None
    kept_leftovers: Optional[bool] = None
    pregnancy: Optional[bool] = None
    chronic_disease: Optional[bool] = None
    recent_test_results: Optional[str] = None

    def model_post_init(self, __context):
        # Derive self_medicated from suggestion_source if not explicitly set
        if self.suggestion_source and self.suggestion_source not in ('Doctor', 'None'):
            self.self_medicated = True

class RiskReason(BaseModel):
    rule_id: str
    description: str
    weight: int
    guideline_ref: str

class RiskResult(BaseModel):
    score: float
    category: str

    summary: str
    explanation: str

    positives: List[str]
    recommendations: List[str]

    reasons: List[RiskReason]

    session_id: str

class ExplanationRequest(BaseModel):
    score: float
    category: str
    reasons: List[RiskReason]
    snippets: Dict[str, str]

class ExplanationResponse(BaseModel):
    explanation: str
    disclaimer: str
    filtered: bool

class GuidelineSnippet(BaseModel):
    title: str
    snippet: str
    source: str

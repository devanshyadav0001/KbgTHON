from pydantic import BaseModel
from typing import List, Optional, Dict

class Medication(BaseModel):
    name: str
    dosage: str

class QuestionnaireInput(BaseModel):
    age: int
    gender: Optional[str] = None
    symptoms: List[str]
    doctor_consulted: bool
    suggestion_source: Optional[str] = None
    medications: List[Medication] = []
    days_prescribed: Optional[int] = None
    days_completed: Optional[int] = None
    doses_skipped: bool
    prior_use_6mo: bool
    shared_antibiotics: bool = False
    symptom_duration: Optional[str] = None
    diagnostic_test: Optional[bool] = None
    kept_leftovers: Optional[bool] = None
    pregnancy: Optional[bool] = None
    chronic_disease: Optional[bool] = None

class RiskReason(BaseModel):
    rule_id: str
    description: str
    weight: int
    guideline_ref: str

class RiskResult(BaseModel):
    score: float
    category: str
    reasons: List[RiskReason]
    session_id: str
    red_flags: bool = False

class ExplanationRequest(BaseModel):
    score: float
    category: str
    reasons: List[RiskReason]
    snippets: Dict[str, str]
    gender: Optional[str] = None
    medications: List[Medication] = []

class ExplanationResponse(BaseModel):
    explanation: str
    disclaimer: str
    filtered: bool

class GuidelineSnippet(BaseModel):
    title: str
    snippet: str
    source: str

import json
import uuid
from pathlib import Path
from .models import QuestionnaireInput, RiskResult, RiskReason

RULES_PATH = Path(__file__).parent / 'config' / 'rules.json'
with open(RULES_PATH, 'r', encoding='utf-8') as f:
    RULES = json.load(f)

MAX_RAW_SUM = sum(r['weight'] for r in RULES)  # 17

def is_high_dose(dosage_str):
    if not dosage_str:
        return False
    dosage_str = dosage_str.lower()
    return any(x in dosage_str for x in ["500", "650", "800", "1000", "1g", "1 g"])

def evaluate(input_data: QuestionnaireInput) -> RiskResult:
    triggered_reasons = []
    raw_sum = 0
    
    red_flag_symptoms = {'high persistent fever', 'confusion', 'breathlessness', 'severe abdominal pain'}
    symptoms_lower = {s.lower() for s in input_data.symptoms}
    
    red_flags_triggered = len(red_flag_symptoms.intersection(symptoms_lower)) > 0
    
    for rule in RULES:
        triggered = False
        if rule['id'] == 'RULE-01':
            triggered = input_data.suggestion_source in ['Pharmacist', 'Friend/Family', 'Self/Online']
        elif rule['id'] == 'RULE-02':
            if input_data.days_completed is not None and input_data.days_prescribed is not None:
                if input_data.days_completed < input_data.days_prescribed:
                    triggered = True
        elif rule['id'] == 'RULE-03':
            triggered = input_data.suggestion_source == 'Self/Online'
        elif rule['id'] == 'RULE-04':
            viral_set = {'cold', 'cough', 'sore throat', 'runny nose', 'body ache', 'fever', 'dengue-like fever'}
            if symptoms_lower.issubset(viral_set) and len(symptoms_lower) > 0 and input_data.suggestion_source != 'Doctor':
                triggered = True
        elif rule['id'] == 'RULE-05':
            triggered = input_data.doses_skipped
        elif rule['id'] == 'RULE-06':
            triggered = input_data.prior_use_6mo
        elif rule['id'] == 'RULE-07':
            triggered = input_data.shared_antibiotics
        elif rule['id'] == 'RULE-08':
            triggered = input_data.suggestion_source == 'Pharmacist'
        elif rule['id'] == 'RULE-09':
            triggered = input_data.antibiotic_prescribed and "Painkiller" in input_data.antibiotic_prescribed
        elif rule['id'] == 'RULE-10':
            triggered = input_data.age < 15 and is_high_dose(input_data.dosage)
        elif rule['id'] == 'RULE-11':
            triggered = input_data.diagnostic_test == False and input_data.suggestion_source != 'Doctor'
        elif rule['id'] == 'RULE-12':
            triggered = input_data.kept_leftovers == True
        elif rule['id'] == 'RULE-13':
            viral_set = {'cold', 'cough', 'sore throat', 'runny nose', 'body ache', 'fever', 'dengue-like fever'}
            triggered = input_data.symptom_duration == 'Less than 3 days' and symptoms_lower.issubset(viral_set) and len(symptoms_lower) > 0
        elif rule['id'] == 'RULE-14':
            triggered = input_data.age > 65
        elif rule['id'] == 'RULE-15':
            triggered = input_data.pregnancy == True
        elif rule['id'] == 'RULE-16':
            triggered = input_data.chronic_disease == True
            
        if triggered:
            raw_sum += rule['weight']
            triggered_reasons.append(RiskReason(
                rule_id=rule['id'],
                description=rule['description'],
                weight=rule['weight'],
                guideline_ref=rule['guideline_ref']
            ))
            
    score = round((raw_sum / MAX_RAW_SUM) * 10, 1)
    
    if red_flags_triggered:
        category = "Urgent Care"
        score = 10.0
    elif score <= 3:
        category = "Low"
    elif score <= 6:
        category = "Medium"
    else:
        category = "High"
        
    session_id = str(uuid.uuid4())
    
    return RiskResult(
        score=score,
        category=category,
        reasons=triggered_reasons,
        session_id=session_id,
        red_flags=red_flags_triggered
    )

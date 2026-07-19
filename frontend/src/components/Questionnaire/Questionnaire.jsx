import React, { useState, useMemo } from 'react';

const SYMPTOMS = ["Fever", "Cough", "Cold", "Sore throat", "Runny nose", "Body ache", "Dengue-like fever", "High persistent fever", "Confusion", "Breathlessness", "Severe abdominal pain", "Urinary pain", "Skin infection", "Pneumonia (bacterial)", "Urinary Tract Infection (UTI)", "Infected wounds", "Some ear infections", "Some sinus infections", "Dental abscesses", "Bacterial meningitis", "Bone infections (osteomyelitis)", "Other"];
const ANTIBIOTICS = [
  "Amoxicillin (e.g. Mox, Augmentin) — [Ear/throat/sinus infections, UTI]", 
  "Azithromycin (e.g. Azee, Zithromax) — [Respiratory, skin, ear infections]", 
  "Ciprofloxacin (e.g. Cifran) — [UTI, GI infections, bone/joint infections]", 
  "Metronidazole (e.g. Flagyl) — [Dental, GI, anaerobic infections]", 
  "Doxycycline / Tetracycline — [Acne, malaria prevention, respiratory]", 
  "Cephalosporin (e.g. Taxim, Ceftum) — [Serious bacterial infections, surgical prophylaxis]", 
  "Erythromycin — [Chest, skin infections, STIs]",
  "Levofloxacin — [Pneumonia, chronic bronchitis, sinusitis]",
  "Paracetamol / Dolo / Calpol (Painkiller) — [Fever, headache, body pain – NOT an antibiotic]",
  "Ibuprofen / Combiflam (Painkiller) — [Pain, inflammation, fever – NOT an antibiotic]",
  "Other (Type custom medication)",
  "I don't remember the name (just know it's a 'strong' antibiotic)"
];

const SOURCES = [
  { id: 'Doctor', label: 'Medical Doctor', icon: 'stethoscope' },
  { id: 'Pharmacist', label: 'Pharmacist (OTC)', icon: 'local_pharmacy' },
  { id: 'Friend/Family', label: 'Friend or Family', icon: 'group' },
  { id: 'Self/Online', label: 'Self / Online Search', icon: 'search' }
];

const YesNoCard = ({ label, description, value, onChange }) => {
  const radioName = React.useId();
  return (
  <div className="flex flex-col gap-md w-full">
    <h1 className="text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-on-surface">{label}</h1>
    {description && (
      <div className="bg-surface-container-low p-md rounded flex gap-md items-start border border-outline-variant/50">
        <span className="material-symbols-outlined text-on-surface-variant mt-0.5">info</span>
        <p className="text-body-sm font-body-sm text-on-surface-variant">{description}</p>
      </div>
    )}
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-sm">
      <label className="cursor-pointer relative group">
        <input 
          className="peer sr-only" 
          name={radioName} 
          type="radio" 
          checked={value === true}
          onChange={() => onChange(true)}
        />
        <div className="w-full h-full p-1.5 border border-outline-variant rounded-[2rem] bg-surface-container-highest flex flex-col transition-all duration-500 ease-spring peer-checked:bg-primary/20 peer-checked:border-primary/50 hover:scale-[1.02]">
          <div className="bg-surface-container-lowest rounded-[calc(2rem-6px)] w-full h-full flex flex-col items-center justify-center gap-sm min-h-[140px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] transition-all duration-500 ease-spring peer-checked:bg-primary peer-checked:shadow-ambient">
            <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-on-surface peer-checked:text-on-primary transition-colors">check_circle</span>
            <span className="text-label-md font-label-md text-on-surface-variant group-hover:text-on-surface peer-checked:text-on-primary peer-checked:font-bold transition-all">Yes</span>
          </div>
        </div>
      </label>
      
      <label className="cursor-pointer relative group">
        <input 
          className="peer sr-only" 
          name={radioName} 
          type="radio" 
          checked={value === false}
          onChange={() => onChange(false)}
        />
        <div className="w-full h-full p-1.5 border border-outline-variant rounded-[2rem] bg-surface-container-highest flex flex-col transition-all duration-500 ease-spring peer-checked:bg-error/20 peer-checked:border-error/50 hover:scale-[1.02]">
          <div className="bg-surface-container-lowest rounded-[calc(2rem-6px)] w-full h-full flex flex-col items-center justify-center gap-sm min-h-[140px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] transition-all duration-500 ease-spring peer-checked:bg-error peer-checked:shadow-ambient">
            <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-on-surface peer-checked:text-on-error transition-colors">cancel</span>
            <span className="text-label-md font-label-md text-on-surface-variant group-hover:text-on-surface peer-checked:text-on-error peer-checked:font-bold transition-all">No</span>
          </div>
        </div>
      </label>
    </div>
  </div>
  );
};

export default function Questionnaire({ onSubmit, loading }) {
  const [data, setData] = useState({
    age: '',
    gender: '',
    symptoms: [],
    suggestion_source: '',
    medications: [], // Array of { name: '', dosage: '', isCustom: false, customName: '' }
    days_prescribed: '',
    days_completed: '',
    doses_skipped: null,
    prior_use_6mo: null,
    shared_antibiotics: null,
    symptom_duration: '',
    diagnostic_test: null,
    kept_leftovers: null,
    pregnancy: null,
    chronic_disease: null,
    chronic_disease_types: [],
    recent_test_results: '',
    doses_skipped_freq: '',
    past_courses: '',
  });

  const update = (fields) => setData(prev => ({ ...prev, ...fields }));

  const toggleSymptom = (sym) => {
    if (data.symptoms.includes(sym)) {
      update({ symptoms: data.symptoms.filter(s => s !== sym) });
    } else {
      update({ symptoms: [...data.symptoms, sym] });
    }
  };

  const steps = useMemo(() => {
    const s = [];
    s.push({ id: 'context', label: 'Patient Context' });
    s.push({ id: 'symptoms', label: 'Symptoms' });
    s.push({ id: 'source', label: 'Antibiotic Use' });

    if (data.suggestion_source !== '' && data.suggestion_source !== 'None') {
      s.push({ id: 'course', label: 'Treatment Adherence' });
    }

    s.push({ id: 'history', label: 'Prior History' });
    return s;
  }, [data.suggestion_source]);

  const [stepIdx, setStepIdx] = useState(0);
  const currentStep = steps[stepIdx] || steps[0];
  const totalSteps = steps.length;
  const isLastStep = stepIdx === totalSteps - 1;

  const handleNext = () => {
    if (stepIdx < totalSteps - 1) {
      setStepIdx(i => i + 1);
    }
  };
  const handleBack = () => {
    if (stepIdx > 0) {
      setStepIdx(i => i - 1);
    }
  };

  const handleSubmit = () => {
    // Process medications to clean up custom names
    const processedMedications = data.medications.map(m => ({
      name: m.isCustom ? m.customName : m.name,
      dosage: m.dosage
    }));

    onSubmit({
      ...data,
      medications: processedMedications,
      age: parseInt(data.age, 10),
      doctor_consulted: data.suggestion_source === 'Doctor',
      doses_skipped: data.doses_skipped === true,
      prior_use_6mo: data.prior_use_6mo === true,
      shared_antibiotics: data.shared_antibiotics === true,
      days_prescribed: data.days_prescribed ? parseInt(data.days_prescribed, 10) : null,
      days_completed: data.days_completed ? parseInt(data.days_completed, 10) : null,
      pregnancy: data.pregnancy === true,
      chronic_disease: data.chronic_disease === true,
      chronic_disease_types: data.chronic_disease_types,
      diagnostic_test: data.diagnostic_test === true,
      kept_leftovers: data.kept_leftovers === true,
      recent_test_results: data.recent_test_results || '',
      doses_skipped_freq: data.doses_skipped_freq || '',
      past_courses: data.past_courses || '',
    });
  };

  const canProceed = () => {
    switch (currentStep.id) {
      case 'context': 
        const isAdultFemale = data.gender === 'Female' && parseInt(data.age) >= 18;
        return data.age > 0 && data.gender !== '' && (!isAdultFemale || data.pregnancy !== null) && data.chronic_disease !== null && (!data.chronic_disease || data.chronic_disease_types.length > 0);
      case 'symptoms': return data.symptoms.length > 0 && data.symptom_duration !== '';
      case 'source': 
        if (data.suggestion_source === '') return false;
        if (data.suggestion_source === 'None') return true;
        if (data.medications.length === 0) return false;
        // Check if all added medications are completely filled out
        const allMedsValid = data.medications.every(m => {
          if (m.name === '') return false;
          if (m.isCustom && m.customName === '') return false;
          if (m.name !== "I don't remember the name (just know it's a 'strong' antibiotic)" && m.dosage === '') return false;
          return true;
        });
        if (!allMedsValid) return false;
        if (data.diagnostic_test === null) return false;
        return true;
      case 'course': 
        return data.days_prescribed !== '' && data.days_completed !== '' && data.doses_skipped !== null && (!data.doses_skipped || data.doses_skipped_freq !== '') && data.kept_leftovers !== null;
      case 'history': return data.past_courses !== '' && data.shared_antibiotics !== null;
      default: return true;
    }
  };

  const getSkipNote = () => {
    if (currentStep.id === 'history' && data.suggestion_source === 'Doctor') {
      return "✅ Consultation verified. Proceeding to medical history.";
    }
    if (currentStep.id === 'course' && data.suggestion_source === 'Doctor') {
      return "📋 Prescription verified. Assessing course completion.";
    }
    if (currentStep.id === 'history' && data.suggestion_source === 'None') {
      return "ℹ️ No recent antibiotic use reported. Proceeding to medical history.";
    }
    if (currentStep.id === 'course' && data.suggestion_source !== 'Doctor' && data.suggestion_source !== 'None') {
      return "⚠️ No doctor consultation recorded. Assessing unprescribed usage. Even if you completed the days, using antibiotics without a doctor's plan can still be risky.";
    }
    return null;
  };

  const skipNote = getSkipNote();

  return (
    <div className="flex-grow flex items-center justify-center py-24 md:py-32 w-full">
      <div className="w-full max-w-[720px] bg-surface-container-lowest border border-outline-variant rounded-[2rem] shadow-ambient p-8 md:p-12 flex flex-col gap-xl relative overflow-hidden animate-fade-up">
        
        {/* Progress Indicator */}
        <div className="flex flex-col gap-sm">
          <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
            <span>Step {currentStep.id === 'history' && totalSteps < 5 ? 5 : stepIdx + 1} of 5 {totalSteps < 5 && stepIdx === totalSteps - 1 ? "(Adaptive Skip)" : ""}</span>
            <span>{currentStep.label}</span>
          </div>
          <div className="h-1 bg-surface-container-high rounded-full w-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300" 
              style={{ width: `${((currentStep.id === 'history' && totalSteps < 5 ? 5 : stepIdx + 1) / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Adaptive Context Note */}
        {skipNote && (
          <div className="bg-surface-container-low p-sm rounded flex gap-sm items-center border border-outline-variant/50">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">info</span>
            <p className="text-body-sm font-body-sm text-on-surface-variant">{skipNote}</p>
          </div>
        )}

        {/* Dynamic Content */}
        <div className="min-h-[320px] flex flex-col animate-fade-up">
          <div className="flex-grow" key={currentStep.id}>
            
            {/* CONTEXT */}
            {currentStep.id === 'context' && (
              <div className="flex flex-col gap-md">
                <h1 className="text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-on-surface">Patient Context</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-2">
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-xs">Patient Age</label>
                    <input 
                      type="number" min="1" max="120"
                      value={data.age}
                      onChange={e => update({ age: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                      placeholder="Enter age"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-xs">Patient Gender</label>
                    <select 
                      value={data.gender}
                      onChange={e => update({ gender: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                    >
                      <option value="" disabled>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {data.gender === 'Female' && parseInt(data.age) >= 18 && (
                  <div className="mt-6 border-t border-outline-variant pt-md">
                    <YesNoCard
                      label="Are you pregnant?"
                      value={data.pregnancy}
                      onChange={(v) => update({ pregnancy: v })}
                    />
                  </div>
                )}

                <div className="mt-6 border-t border-outline-variant pt-md">
                  <YesNoCard
                    label="Do you have any chronic diseases (e.g., Diabetes, Asthma)?"
                    value={data.chronic_disease}
                    onChange={(v) => update({ chronic_disease: v, chronic_disease_types: v ? data.chronic_disease_types : [] })}
                  />

                  {data.chronic_disease === true && (
                    <div className="mt-4 animate-fade-in">
                      <label className="block text-label-md font-label-md text-on-surface mb-sm">Select condition(s):</label>
                      <div className="flex flex-wrap gap-sm">
                        {['Diabetes', 'Asthma', 'Heart disease', 'Kidney disease', 'Liver disease', 'Other'].map(cond => {
                          const isSelected = data.chronic_disease_types.includes(cond);
                          const styleClass = isSelected 
                            ? 'bg-primary border-primary text-on-primary' 
                            : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:border-outline';
                          return (
                            <label key={cond} className="cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="peer sr-only" 
                                checked={isSelected}
                                onChange={() => {
                                  if (isSelected) {
                                    update({ chronic_disease_types: data.chronic_disease_types.filter(c => c !== cond) });
                                  } else {
                                    update({ chronic_disease_types: [...data.chronic_disease_types, cond] });
                                  }
                                }}
                              />
                              <div className={`text-label-md font-label-md px-4 py-2 rounded-full border transition-all duration-200 ${styleClass}`}>
                                {cond}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SYMPTOMS */}
            {currentStep.id === 'symptoms' && (
              <div className="flex flex-col gap-md">
                <h1 className="text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-on-surface">Symptoms</h1>
                
                <div className="mt-2">
                  <label className="block text-label-md font-label-md text-on-surface mb-xs">Symptom Duration</label>
                  <select 
                    value={data.symptom_duration}
                    onChange={e => update({ symptom_duration: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                  >
                    <option value="" disabled>Select duration</option>
                    <option value="Less than 3 days">Less than 3 days</option>
                    <option value="3-7 days">3-7 days</option>
                    <option value="More than 7 days">More than 7 days</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-label-md font-label-md text-on-surface mb-sm">Symptoms (Select all that apply)</label>
                  
                  {data.symptoms.some(s => ["High persistent fever", "Confusion", "Breathlessness", "Severe abdominal pain"].includes(s)) && (
                    <div className="bg-error-container/20 border border-error/50 rounded p-sm flex items-start gap-sm mb-md animate-fade-in">
                      <span className="material-symbols-outlined text-error mt-0.5">warning</span>
                      <p className="text-body-sm font-body-sm text-error font-medium">
                        You selected symptoms that can be serious. This tool will still explain misuse risk, but please consider seeing a doctor urgently.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-sm">
                    {SYMPTOMS.map(sym => {
                      const isSelected = data.symptoms.includes(sym);
                      let styleClass = isSelected 
                        ? 'bg-primary border-primary text-on-primary' 
                        : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:border-outline';
                      
                      const isRedFlag = ["High persistent fever", "Confusion", "Breathlessness", "Severe abdominal pain"].includes(sym);
                      if (isRedFlag && !isSelected) {
                        styleClass = 'bg-error-container/20 border-error/40 text-error hover:bg-error-container/50';
                      } else if (isRedFlag && isSelected) {
                        styleClass = 'bg-error text-on-error border-error';
                      }

                      let tooltipText = '';
                      if (sym === 'Dengue-like fever') tooltipText = 'High fever with body pain, maybe rash';
                      if (sym === 'Urinary Tract Infection (UTI)') tooltipText = 'Pain or burning during urination';

                      return (
                        <label key={sym} className="cursor-pointer relative group">
                          <input 
                            type="checkbox" 
                            className="peer sr-only" 
                            checked={isSelected}
                            onChange={() => toggleSymptom(sym)}
                          />
                          <div className={`text-label-md font-label-md px-4 py-2 rounded-full border transition-all duration-200 ${styleClass}`}>
                            {sym}
                          </div>
                          {tooltipText && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max max-w-[200px] bg-surface-container-highest text-on-surface text-xs p-2 rounded shadow-lg z-20 normal-case text-center">
                              {tooltipText}
                            </div>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SOURCE OF RECOMMENDATION */}
            {currentStep.id === 'source' && (
              <div className="flex flex-col gap-md">
                <h1 className="text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-on-surface">Antibiotic Use</h1>

                <div className="mt-2">
                  <label className="block text-label-md font-label-md text-on-surface mb-sm">Are you currently taking medications for these symptoms?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    {[{id: 'Doctor', label: 'Yes, prescribed by Doctor'}, {id: 'Pharmacist', label: 'Yes, suggested by Pharmacist'}, {id: 'Self/Online', label: 'Yes, self-medicated'}, {id: 'None', label: 'No, just checking symptoms'}].map(src => (
                      <label key={src.id} className="cursor-pointer relative group">
                        <input 
                          className="peer sr-only" 
                          name="source" 
                          type="radio" 
                          checked={data.suggestion_source === src.id}
                          onChange={() => update({ suggestion_source: src.id, medications: src.id === 'None' ? [] : data.medications })}
                        />
                        <div className="w-full h-full p-md border border-outline-variant rounded bg-surface-container-lowest flex items-center gap-sm transition-all duration-200 peer-checked:border-primary peer-checked:border-2 peer-checked:bg-surface-container-low hover:border-outline">
                          <span className="text-label-md font-label-md text-on-surface-variant group-hover:text-on-surface peer-checked:text-primary peer-checked:font-bold transition-all">
                            {src.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {data.suggestion_source !== '' && data.suggestion_source !== 'None' && (
                  <div className="mt-6 animate-fade-in flex flex-col gap-md">
                    <div className="flex flex-col gap-md">
                      <label className="block text-label-md font-label-md text-on-surface mb-xs border-b border-outline-variant pb-2">Medications Used</label>
                      
                      {data.medications.map((med, index) => (
                        <div key={index} className="bg-surface-container-lowest border border-outline-variant rounded p-md relative shadow-sm">
                          <button 
                            type="button"
                            onClick={() => {
                              const newMeds = [...data.medications];
                              newMeds.splice(index, 1);
                              update({ medications: newMeds });
                            }}
                            className="absolute top-2 right-2 text-on-surface-variant hover:text-error transition-colors"
                            title="Remove medication"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>

                          <div className="flex flex-col gap-sm">
                            <div>
                              <label className="block text-label-sm font-label-sm text-on-surface mb-xs">Drug / Medication</label>
                              <select 
                                value={med.name}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const newMeds = [...data.medications];
                                  newMeds[index].name = val;
                                  newMeds[index].isCustom = val === 'Other (Type custom medication)';
                                  update({ medications: newMeds });
                                }}
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-sm font-body-sm"
                              >
                                <option value="" disabled>Select an option</option>
                                {ANTIBIOTICS.map(a => <option key={a} value={a}>{a}</option>)}
                              </select>
                            </div>

                            {med.isCustom && (
                              <div className="animate-fade-in">
                                <label className="block text-label-sm font-label-sm text-on-surface mb-xs">Custom Medication Name</label>
                                <input 
                                  type="text"
                                  value={med.customName}
                                  onChange={(e) => {
                                    const newMeds = [...data.medications];
                                    newMeds[index].customName = e.target.value;
                                    update({ medications: newMeds });
                                  }}
                                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-sm font-body-sm"
                                  placeholder="Enter medication name"
                                />
                              </div>
                            )}

                            {med.name !== '' && (
                              <div className="animate-fade-in">
                                <label className="block text-label-sm font-label-sm text-on-surface mb-xs">Dosage</label>
                                <select 
                                  value={med.dosage}
                                  onChange={(e) => {
                                    const newMeds = [...data.medications];
                                    newMeds[index].dosage = e.target.value;
                                    update({ medications: newMeds });
                                  }}
                                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-sm font-body-sm"
                                >
                                  <option value="" disabled>Select dosage</option>
                                  <option value="250mg">Low (250mg or less)</option>
                                  <option value="500mg">Standard (e.g., 500mg)</option>
                                  <option value="625mg">Standard Plus (e.g., 625mg)</option>
                                  <option value="1000mg">High (1000mg or more)</option>
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          update({ medications: [...data.medications, { name: '', dosage: '', isCustom: false, customName: '' }] });
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/10 transition-colors rounded font-label-md mt-sm self-start"
                      >
                        <span className="material-symbols-outlined">add</span>
                        Add Medication
                      </button>
                    </div>

                    <div className="border-t border-outline-variant pt-md mt-2">
                      <YesNoCard
                        label="Did you get a diagnostic lab test (e.g., blood test, culture) before starting?"
                        value={data.diagnostic_test}
                        onChange={(v) => update({ diagnostic_test: v })}
                      />

                      {data.diagnostic_test === true && (
                        <div className="mt-md animate-fade-in bg-surface-container-low p-sm rounded border border-outline-variant/50">
                          <p className="text-body-sm font-body-sm text-on-surface-variant flex gap-sm items-center">
                            <span className="material-symbols-outlined text-primary text-sm">verified</span>
                            Lab tests help doctors prescribe the right antibiotic and prevent resistance.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* COURSE */}
            {currentStep.id === 'course' && (
              <div className="flex flex-col gap-md">
                <h1 className="text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-on-surface">Treatment Adherence</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-sm">
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-xs">Days Planned/Prescribed</label>
                    <select 
                      value={data.days_prescribed}
                      onChange={e => update({ days_prescribed: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                    >
                      <option value="" disabled>Select duration</option>
                      <option value="1">1-2 days</option>
                      <option value="3">3 days</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                      <option value="10">10 days</option>
                      <option value="14">14 days</option>
                      <option value="21">More than 14 days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-xs">Days Actually Completed</label>
                    <select 
                      value={data.days_completed}
                      onChange={e => update({ days_completed: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                    >
                      <option value="" disabled>Select completed</option>
                      <option value="1">1-2 days</option>
                      <option value="3">3 days</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                      <option value="10">10 days</option>
                      <option value="14">14 days</option>
                      <option value="21">More than 14 days</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-outline-variant pt-md mt-md">
                  <YesNoCard
                    label="Were any doses skipped or delayed?"
                    value={data.doses_skipped}
                    onChange={(v) => update({ doses_skipped: v, doses_skipped_freq: v ? data.doses_skipped_freq : '' })}
                  />

                  {data.doses_skipped === true && (
                    <div className="mt-4 animate-fade-in">
                      <label className="block text-label-md font-label-md text-on-surface mb-xs">How many doses were skipped or delayed?</label>
                      <select 
                        value={data.doses_skipped_freq}
                        onChange={e => update({ doses_skipped_freq: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                      >
                        <option value="" disabled>Select frequency</option>
                        <option value="1-2">1-2 doses</option>
                        <option value="3-5">3-5 doses</option>
                        <option value="More than 5">More than 5 doses</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="border-t border-outline-variant pt-md mt-md">
                  <YesNoCard
                    label="Did you keep leftover antibiotics for future use?"
                    value={data.kept_leftovers}
                    onChange={(v) => update({ kept_leftovers: v })}
                  />
                </div>
              </div>
            )}

            {/* HISTORY */}
            {currentStep.id === 'history' && (
              <div className="flex flex-col gap-xl">
                <div>
                  <label className="block text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-on-surface mb-xs">How many courses of antibiotics have you taken in the last 6 months?</label>
                  <select 
                    value={data.past_courses}
                    onChange={e => update({ past_courses: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded p-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-lg font-body-lg mt-sm cursor-pointer"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="0">0 courses</option>
                    <option value="1">1 course</option>
                    <option value="2-3">2-3 courses</option>
                    <option value="4+">4 or more courses</option>
                  </select>
                </div>

                <div className="border-t border-outline-variant pt-md">
                  <YesNoCard
                    label="Have you ever shared your antibiotics with others?"
                    value={data.shared_antibiotics}
                    onChange={(v) => update({ shared_antibiotics: v })}
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Actions */}
          <div className="flex justify-between items-center mt-xl pt-lg border-t border-outline-variant">
            {stepIdx > 0 ? (
              <button 
                type="button" 
                onClick={handleBack} 
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md group cursor-pointer ease-spring"
              >
                <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform ease-spring">arrow_back</span>
                Back
              </button>
            ) : <div></div>}
            
            {!isLastStep ? (
              <button 
                type="button" 
                onClick={handleNext} 
                disabled={!canProceed()}
                className="group bg-primary text-on-primary pl-8 pr-2 py-2.5 rounded-full font-bold text-base hover:bg-primary/90 transition-all shadow-ambient cursor-pointer flex items-center gap-4 active:scale-[0.98] ease-spring duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 ease-spring group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                  <span className="material-symbols-outlined text-base transition-transform ease-spring" style={{fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
                </div>
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={loading || !canProceed()}
                className="group bg-primary text-on-primary pl-8 pr-2 py-2.5 rounded-full font-bold text-base hover:bg-primary/90 transition-all shadow-ambient cursor-pointer flex items-center gap-4 active:scale-[0.98] ease-spring duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2 pr-6">
                    <span className="material-symbols-outlined animate-spin-slow text-xl">sync</span>
                    Analyzing...
                  </span>
                ) : (
                  <>
                    Complete
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 ease-spring group-hover:scale-105">
                      <span className="material-symbols-outlined text-base transition-transform ease-spring" style={{fontVariationSettings: "'wght' 600" }}>check</span>
                    </div>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

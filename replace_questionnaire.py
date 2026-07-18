import re

file_path = 'c:/Users/devan/OneDrive/Documents/kbg thon/frontend/src/components/Questionnaire/Questionnaire.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace everything between {/* Dynamic Content */} and {/* Navigation Actions */}
start_marker = "{/* Dynamic Content */}"
end_marker = "{/* Navigation Actions */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_content = """{/* Dynamic Content */}
        <div className="min-h-[320px] flex flex-col animate-fade-in">
          <div className="flex-grow" key={currentStep.id}>
            
            {/* CONTEXT */}
            {currentStep.id === 'context' && (
              <div className="flex flex-col gap-md">
                <h1 className="text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-on-surface">Patient Context</h1>
                
                <div className="mt-2">
                  <label className="block text-label-md font-label-md text-on-surface mb-xs">Patient Age</label>
                  <input 
                    type="number" min="1" max="120"
                    value={data.age}
                    onChange={e => update({ age: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                    placeholder="Enter age"
                  />
                </div>

                <div className="mt-6">
                  <YesNoCard
                    label="Are you pregnant?"
                    value={data.pregnancy}
                    onChange={(v) => update({ pregnancy: v })}
                  />
                </div>

                <div className="mt-6 border-t border-outline-variant pt-md">
                  <YesNoCard
                    label="Do you have any chronic diseases (e.g., Diabetes, Asthma)?"
                    value={data.chronic_disease}
                    onChange={(v) => update({ chronic_disease: v })}
                  />
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

                      return (
                        <label key={sym} className="cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="peer sr-only" 
                            checked={isSelected}
                            onChange={() => toggleSymptom(sym)}
                          />
                          <div className={`text-label-md font-label-md px-4 py-2 rounded-full border transition-all duration-200 ${styleClass}`}>
                            {sym}
                          </div>
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
                  <label className="block text-label-md font-label-md text-on-surface mb-sm">Are you currently taking antibiotics for these symptoms?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    {[{id: 'Doctor', label: 'Yes, prescribed by Doctor'}, {id: 'Pharmacist', label: 'Yes, suggested by Pharmacist'}, {id: 'Self/Online', label: 'Yes, self-medicated'}, {id: 'None', label: 'No, just checking symptoms'}].map(src => (
                      <label key={src.id} className="cursor-pointer relative group">
                        <input 
                          className="peer sr-only" 
                          name="source" 
                          type="radio" 
                          checked={data.suggestion_source === src.id}
                          onChange={() => update({ suggestion_source: src.id, antibiotic_prescribed: src.id === 'None' ? '' : data.antibiotic_prescribed })}
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
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs">Drug / Medication Used</label>
                      <select 
                        value={data.antibiotic_prescribed}
                        onChange={e => update({ antibiotic_prescribed: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                      >
                        <option value="" disabled>Select an option</option>
                        {ANTIBIOTICS.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    {data.antibiotic_prescribed === 'Other (Type custom medication)' && (
                      <div className="animate-fade-in">
                        <label className="block text-label-md font-label-md text-on-surface mb-xs">Custom Medication Name</label>
                        <input 
                          type="text"
                          value={data.custom_medication}
                          onChange={e => update({ custom_medication: e.target.value })}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                          placeholder="Enter medication name"
                        />
                      </div>
                    )}
                    {data.antibiotic_prescribed !== '' && (
                      <div className="animate-fade-in">
                        <label className="block text-label-md font-label-md text-on-surface mb-xs">Dosage (e.g., 500mg, 650mg)</label>
                        <input 
                          type="text"
                          value={data.dosage}
                          onChange={e => update({ dosage: e.target.value })}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                          placeholder="Enter dosage amount (required)"
                        />
                      </div>
                    )}
                    <div className="border-t border-outline-variant pt-md mt-2">
                      <YesNoCard
                        label="Did you get a diagnostic lab test (e.g., blood test, culture) before starting?"
                        value={data.diagnostic_test}
                        onChange={(v) => update({ diagnostic_test: v })}
                      />
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
                    <input 
                      type="number" min="0"
                      value={data.days_prescribed}
                      onChange={e => update({ days_prescribed: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                      placeholder="e.g. 7"
                    />
                  </div>
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-xs">Days Completed</label>
                    <input 
                      type="number" min="0"
                      value={data.days_completed}
                      onChange={e => update({ days_completed: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                      placeholder="e.g. 3"
                    />
                  </div>
                </div>

                <div className="border-t border-outline-variant pt-md mt-md">
                  <YesNoCard
                    label="Were any doses skipped or delayed?"
                    value={data.doses_skipped}
                    onChange={(v) => update({ doses_skipped: v })}
                  />
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
                <YesNoCard
                  label="Have you taken antibiotics in the last 6 months?"
                  value={data.prior_use_6mo}
                  onChange={(v) => update({ prior_use_6mo: v })}
                />

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
          
          """

final_content = content[:start_idx] + new_content + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Replaced dynamic content successfully")

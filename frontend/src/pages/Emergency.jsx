import React from 'react';

const HELPLINES = [
  { name: "India National Emergency", number: "112", icon: "emergency", description: "All emergencies — police, fire, ambulance", primary: true },
  { name: "Ambulance (India)", number: "108", icon: "local_hospital", description: "Government ambulance service available in most states" },
  { name: "Health Helpline (India)", number: "104", icon: "phone_in_talk", description: "Free health advice and information hotline" },
  { name: "ICMR Helpline", number: "011-26588700", icon: "biotech", description: "Indian Council of Medical Research — AMR queries and reporting" },
  { name: "WHO India", number: "011-66564800", icon: "public", description: "World Health Organization India Office" },
  { name: "Poison Information Centre (AIIMS)", number: "1800-116-117", icon: "science", description: "National toll-free poison & drug reaction helpline" }
];

const DANGER_SIGNS = [
  { symptom: "Difficulty breathing or swallowing", severity: "critical", detail: "Could indicate anaphylaxis — a life-threatening allergic reaction to antibiotics. Call 112 immediately." },
  { symptom: "Severe rash, hives, or facial swelling", severity: "critical", detail: "Signs of a severe allergic reaction. Stop the medication and seek emergency care." },
  { symptom: "Persistent high fever (>103°F / 39.4°C) for 48+ hours", severity: "urgent", detail: "May indicate treatment failure or a resistant infection. Contact your doctor urgently." },
  { symptom: "Severe or bloody diarrhea", severity: "urgent", detail: "Could indicate C. difficile infection, a dangerous side effect of antibiotics. Seek medical attention immediately." },
  { symptom: "Confusion, disorientation, or altered consciousness", severity: "critical", detail: "May indicate sepsis or severe drug reaction. Call emergency services." },
  { symptom: "Yellowing of skin or eyes (jaundice)", severity: "urgent", detail: "Could indicate liver damage from certain antibiotics. Stop medication and see a doctor." },
  { symptom: "Seizures or uncontrolled shaking", severity: "critical", detail: "A rare but serious side effect of some antibiotics. Call emergency services." },
  { symptom: "Dark or significantly reduced urine output", severity: "urgent", detail: "Could indicate kidney problems. Drink fluids and contact your doctor." }
];

export default function Emergency() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl animate-fade-in">
      <h1 className="text-headline-lg font-headline-lg text-on-surface mb-sm flex items-center gap-3">
        <span className="material-symbols-outlined text-error" style={{fontSize: '40px', fontVariationSettings: "'FILL' 1"}}>emergency</span>
        Emergency Help & Helplines
      </h1>
      <p className="text-body-md text-on-surface-variant mb-xl max-w-[900px]">
        If you or someone you know is experiencing a medical emergency related to antibiotic use, contact emergency services immediately.
      </p>
      
      {/* Critical Disclaimer */}
      <div className="bg-error-container border border-error rounded-xl p-lg mb-xl shadow-sm">
        <div className="flex items-start gap-md">
          <span className="material-symbols-outlined text-error shrink-0 mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>gpp_maybe</span>
          <div>
            <h2 className="text-headline-sm font-headline-sm text-on-error-container mb-xs">Medical Disclaimer</h2>
            <p className="text-body-md text-on-error-container">
              <strong>This platform is NOT a substitute for professional medical care or emergency services.</strong> If you are experiencing a severe allergic reaction, difficulty breathing, high unmanageable fever, or any other life-threatening condition, <strong>call 112 (India) immediately</strong>. Do not rely on this application for urgent medical decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-xl">
          {/* Helpline Cards */}
          <section>
            <h2 className="text-headline-sm font-headline-sm text-primary mb-md flex items-center gap-xs">
              <span className="material-symbols-outlined">call</span>
              Emergency Helplines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {HELPLINES.map((h, i) => (
                <a 
                  key={i}
                  href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}
                  className={`flex items-start gap-md p-md rounded-lg border transition-all hover:shadow-md cursor-pointer group ${
                    h.primary 
                      ? 'bg-error-container/50 border-error hover:bg-error-container' 
                      : 'bg-surface-container-lowest border-outline-variant hover:border-primary'
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl mt-0.5 ${h.primary ? 'text-error' : 'text-primary'} group-hover:scale-110 transition-transform`} style={{fontVariationSettings: "'FILL' 1"}}>{h.icon}</span>
                  <div className="flex-grow">
                    <h3 className="text-label-md font-bold text-on-surface">{h.name}</h3>
                    <p className="text-headline-sm font-headline-sm text-primary">{h.number}</p>
                    <p className="text-body-sm text-on-surface-variant mt-xs">{h.description}</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors mt-2">phone_forwarded</span>
                </a>
              ))}
            </div>
          </section>

          {/* Danger Signs */}
          <section>
            <h2 className="text-headline-sm font-headline-sm text-primary mb-md flex items-center gap-xs">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
              When to Seek Immediate Medical Help
            </h2>
            <div className="space-y-sm">
              {DANGER_SIGNS.map((d, i) => (
                <div 
                  key={i} 
                  className={`p-md rounded-lg border flex items-start gap-md ${
                    d.severity === 'critical' 
                      ? 'bg-error-container/20 border-error/40' 
                      : 'bg-secondary-container/20 border-secondary/40'
                  }`}
                >
                  <span className={`material-symbols-outlined shrink-0 mt-0.5 ${d.severity === 'critical' ? 'text-error' : 'text-secondary'}`} style={{fontVariationSettings: "'FILL' 1"}}>
                    {d.severity === 'critical' ? 'emergency' : 'report_problem'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-label-md font-bold text-on-surface">{d.symptom}</h4>
                      <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        d.severity === 'critical' ? 'bg-error text-on-primary' : 'bg-secondary text-on-primary'
                      }`}>{d.severity}</span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-1">{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-xl">
          {/* Key Things to Know - Added from User Request */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-lg">
            <h2 className="text-headline-sm font-headline-sm text-primary mb-md flex items-center gap-xs">
              <span className="material-symbols-outlined">info</span>
              Key Things to Know About Antibiotics
            </h2>
            
            <p className="text-body-md text-on-surface mb-md">
              Antibiotics only treat bacterial infections and are completely ineffective against viruses like the common cold or flu. Always complete the full prescribed course to ensure all bacteria are eliminated, take doses at the same time daily, and consult your healthcare provider about whether to take them with food. <span className="text-xs text-on-surface-variant align-super">[1, 2]</span>
            </p>

            <ul className="space-y-sm mb-lg">
              <li className="flex items-start gap-sm text-body-sm text-on-surface-variant bg-surface p-sm rounded border border-outline-variant/50">
                <span className="material-symbols-outlined text-error mt-0.5 shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>block</span>
                <div>
                  <strong className="text-on-surface block mb-1">Do Not Share or Reuse:</strong>
                  Never take antibiotics prescribed for someone else, and do not save leftovers for a later illness. Using the wrong medication delays proper treatment and contributes to antibiotic resistance.
                </div>
              </li>
              <li className="flex items-start gap-sm text-body-sm text-on-surface-variant bg-surface p-sm rounded border border-outline-variant/50">
                <span className="material-symbols-outlined text-secondary mt-0.5 shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>sick</span>
                <div>
                  <strong className="text-on-surface block mb-1">Potential Side Effects:</strong>
                  Common side effects include nausea, diarrhea, and loss of appetite. Taking the medication with food can often help lessen stomach upset.
                </div>
              </li>
              <li className="flex items-start gap-sm text-body-sm text-on-surface-variant bg-surface p-sm rounded border border-outline-variant/50">
                <span className="material-symbols-outlined text-warning mt-0.5 shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
                <div>
                  <strong className="text-on-surface block mb-1">Interactions with Other Drugs:</strong>
                  Some antibiotics can make birth control pills less effective. Additionally, it is generally recommended to avoid alcohol while taking antibiotics, as it can cause adverse reactions.
                </div>
              </li>
              <li className="flex items-start gap-sm text-body-sm text-on-surface-variant bg-surface p-sm rounded border border-outline-variant/50">
                <span className="material-symbols-outlined text-tertiary mt-0.5 shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>woman</span>
                <div>
                  <strong className="text-on-surface block mb-1">Birth Control & Yeast Infections:</strong>
                  Women may be at a higher risk of developing a vaginal yeast infection while on antibiotics.
                </div>
              </li>
              <li className="flex items-start gap-sm text-body-sm text-on-surface-variant bg-error-container/30 p-sm rounded border border-error/30">
                <span className="material-symbols-outlined text-error mt-0.5 shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
                <div>
                  <strong className="text-on-surface block mb-1">Allergic Reactions:</strong>
                  Seek immediate medical attention if you experience severe symptoms of an allergic reaction, such as a rash, hives, difficulty breathing, or severe swelling. <span className="text-xs align-super">[6, 7, 8, 9, 10]</span>
                </div>
              </li>
            </ul>
            
            <div className="bg-primary-container/30 p-md rounded-lg border border-primary/20">
              <p className="font-body-sm text-on-surface mb-2">If you are currently experiencing symptoms or have been prescribed an antibiotic, our tool can help you understand:</p>
              <ul className="list-disc pl-5 font-body-sm text-on-surface-variant mb-3 space-y-1">
                <li>Common side effects associated with your specific medication</li>
                <li>Important food or drug interactions to avoid</li>
                <li>General tips on how to manage stomach discomfort</li>
              </ul>
              <p className="font-body-sm text-on-surface mb-2">Take the assessment to let us know which antibiotic you were prescribed or what symptoms you are dealing with.</p>
              <p className="font-label-sm text-on-surface-variant italic mt-3 pt-2 border-t border-outline-variant/50">AI can make mistakes, so always double-check responses with a healthcare provider.</p>
            </div>
          </section>

          {/* What to tell the doctor */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-lg">
            <h2 className="text-headline-sm font-headline-sm text-primary mb-md flex items-center gap-xs">
              <span className="material-symbols-outlined">assignment</span>
              What to Tell Your Doctor
            </h2>
            <p className="text-body-md text-on-surface-variant mb-md">When visiting a doctor about antibiotic-related concerns, be sure to share:</p>
            <ul className="space-y-sm">
              {[
                "The exact name and dosage of the antibiotic you took",
                "When you started it and how many days you've taken it",
                "Whether you skipped any doses",
                "Any side effects you've experienced (rash, diarrhea, nausea)",
                "Other medications, vitamins, or supplements you are taking",
                "Any known drug allergies",
                "Whether you are pregnant or breastfeeding"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

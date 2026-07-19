import React, { useState } from 'react';

const MYTH_FACTS = [
  {
    myth: "Antibiotics cure viral fevers and colds.",
    fact: "Antibiotics only treat bacterial infections; using them for viral illnesses doesn't help and drives resistance.",
    source: "Based on: WHO AMR Fact Sheet & Guidelines"
  },
  {
    myth: "Stronger/broad-spectrum antibiotics are always better.",
    fact: "Guidelines recommend the narrowest effective antibiotic for the shortest duration; broad-spectrum misuse accelerates resistance.",
    source: "Based on: ICMR Treatment Guidelines for Antimicrobial Use"
  },
  {
    myth: "Stopping the antibiotic when I feel better is fine.",
    fact: "Not completing the prescribed course increases the risk of treatment failure and contributes heavily to antimicrobial resistance.",
    source: "Based on: CDC Antibiotic Use and Antimicrobial Resistance Facts"
  },
  {
    myth: "Everyone keeps antibiotics at home for emergencies.",
    fact: "Self-medication and OTC use without a prescription is a major driver of AMR, widely documented in Indian behavioral studies.",
    source: "Based on: Evidence-based Indian AMR behavioral research"
  }
];

const SAFE_USE_CHECKLIST = [
  { do: true, text: "Use antibiotics only for clear bacterial infections (e.g., strep throat, bacterial pneumonia, UTI) after medical evaluation.", source: "CDC" },
  { do: false, text: "Never use antibiotics for colds, flu, most sore throats, or viral bronchitis (e.g. taking azithromycin for a runny nose).", source: "ICMR" },
  { do: true, text: "Always follow the exact dose and duration prescribed; don’t stop early or extend “just in case.”", source: "CDC" },
  { do: false, text: "Never use leftover antibiotics or someone else’s prescription; doing so directly promotes resistant strains.", source: "WHO" }
];

const CLINICAL_SCENARIOS = [
  {
    condition: "Viral pharyngitis / rhinosinusitis / common cold",
    recommendation: "Usually no antibiotics; focus on symptomatic relief.",
    source: "CDC"
  },
  {
    condition: "Acute viral bronchitis",
    recommendation: "Antibiotics rarely indicated unless strong bacterial features.",
    source: "ICMR"
  },
  {
    condition: "Asymptomatic bacteriuria",
    recommendation: "No antibiotics except pregnancy or selected urologic procedures.",
    source: "ICMR"
  },
  {
    condition: "Uncomplicated skin abscess after proper drainage",
    recommendation: "Often no systemic antibiotics needed.",
    source: "ICMR"
  }
];

const RISK_LOGIC_RULES = [
  { condition: "Antibiotics used for cold/flu + no doctor consult", risk: "High", reason: "Viral infections don't respond to antibiotics.", source: "CDC" },
  { condition: "Stopped before minimum guideline duration", risk: "Medium-High", reason: "Fails to eradicate infection, selects for resistance.", source: "ICMR" },
  { condition: "OTC/leftover use + repeated courses in last 3 months", risk: "High", reason: "Cumulative selective pressure creates superbugs.", source: "PMCID 8472180" }
];

const VERIFIED_REFERENCES = [
  { title: "WHO AMR Fact Sheet", desc: "Global overview of Antimicrobial Resistance.", url: "https://www.who.int/docs/default-source/antimicrobial-resistance/amr-factsheet.pdf" },
  { title: "ICMR Treatment Guidelines", desc: "India‑specific antibiotic use protocols (2019).", url: "https://www.icmr.gov.in/icmrobject/custom_data/pdf/resource-guidelines/Treatment_Guidelines_2019_Final.pdf" },
  { title: "CDC Antibiotic Use", desc: "Patient‑friendly explanations and stats.", url: "https://www.cdc.gov/antibiotic-use/data-research/facts-stats/index.html" }
];

function FlipCard({ item }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div 
      className={`relative w-full h-[220px] cursor-pointer transition-transform duration-500`}
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`absolute w-full h-full p-1.5 transition-all duration-500 ease-spring rounded-[2rem] border ${flipped ? 'opacity-0 scale-95 pointer-events-none border-outline-variant bg-surface-container-highest' : 'opacity-100 scale-100 border-outline-variant bg-surface-container-highest hover:scale-[1.02]'}`}>
        <div className="bg-surface-container-lowest rounded-[calc(2rem-6px)] w-full h-full flex flex-col items-center justify-center p-8 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
          <span className="bg-error/10 text-error font-label-sm text-label-sm px-2 py-1 rounded absolute top-4 left-4">Myth</span>
          <h4 className="font-headline-sm text-headline-sm text-on-surface">{item.myth}</h4>
          <div className="absolute bottom-4 right-4 flex items-center gap-1 text-on-surface-variant font-label-sm">
            <span className="material-symbols-outlined text-sm transition-transform group-hover:scale-110">touch_app</span> Tap to reveal
          </div>
        </div>
      </div>
      <div className={`absolute w-full h-full p-1.5 transition-all duration-500 ease-spring rounded-[2rem] border ${flipped ? 'opacity-100 scale-100 bg-primary/20 border-primary/50' : 'opacity-0 scale-95 pointer-events-none border-primary/20 bg-surface-container-highest'}`}>
        <div className="bg-primary rounded-[calc(2rem-6px)] w-full h-full flex flex-col items-center justify-center p-8 text-center shadow-ambient">
          <span className="bg-white/20 text-on-primary font-label-sm text-label-sm px-2 py-1 rounded absolute top-4 left-4">Fact</span>
          <p className="font-body-md text-body-md text-on-primary mb-sm font-bold">{item.fact}</p>
          <p className="font-label-sm text-label-sm text-on-primary/80 absolute bottom-4 text-center w-full">{item.source}</p>
        </div>
      </div>
    </div>
  );
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-1 border border-outline-variant rounded-2xl mb-4 bg-surface-container-highest transition-all duration-500 ease-spring">
      <div className="bg-surface-container-lowest rounded-[calc(1rem-4px)] w-full overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
        <button 
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center p-6 hover:bg-surface-container transition-colors text-left outline-none cursor-pointer"
        >
          <span className="font-headline-sm text-headline-sm text-on-surface">{title}</span>
          <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-500 ease-spring" style={{transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}}>
            expand_more
          </span>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-spring ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-6 pt-0 border-t border-outline-variant/30 mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Learn() {
  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-2xl pb-3xl flex flex-col gap-3xl">
      
      {/* Header Section */}
      <section>
        <h1 className="font-display-lg text-display-lg text-primary mb-sm">Professional Education Center</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[768px]">
          Comprehensive clinical resources on Antimicrobial Resistance (AMR). Review pathophysiology, epidemiological data, and evidence-based prevention strategies verified by WHO, ICMR, and CDC.
        </p>
      </section>

      {/* India Stats */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-lg border-b border-outline-variant pb-sm">India at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="p-1.5 border border-primary/20 rounded-[2rem] bg-primary/10 transition-transform duration-500 ease-spring hover:scale-[1.02]">
            <div className="bg-primary text-on-primary p-6 rounded-[calc(2rem-6px)] h-full shadow-ambient flex flex-col justify-center text-center">
              <span className="material-symbols-outlined text-4xl mb-sm mx-auto" style={{fontVariationSettings: "'FILL' 1"}}>pill</span>
              <h3 className="font-headline-md text-headline-md mb-xs">53–82%</h3>
              <p className="font-body-sm text-body-sm opacity-90">Self-medication rates in pooled Indian studies, spiking up to 82% in northern regions.</p>
            </div>
          </div>
          <div className="p-1.5 border border-outline-variant rounded-[2rem] bg-surface-container-highest transition-transform duration-500 ease-spring hover:scale-[1.02]">
            <div className="bg-surface-container-lowest text-on-surface p-6 rounded-[calc(2rem-6px)] h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] flex flex-col justify-center text-center">
              <span className="material-symbols-outlined text-4xl mb-sm mx-auto text-primary" style={{fontVariationSettings: "'FILL' 1"}}>local_pharmacy</span>
              <h3 className="font-headline-md text-headline-md mb-xs">85–95%</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Pharmacies dispensing antibiotics OTC without a prescription for simple fever or cough.</p>
            </div>
          </div>
          <div className="p-1.5 border border-error/20 rounded-[2rem] bg-error/10 transition-transform duration-500 ease-spring hover:scale-[1.02]">
            <div className="bg-error text-on-error p-6 rounded-[calc(2rem-6px)] h-full shadow-ambient flex flex-col justify-center text-center">
              <span className="material-symbols-outlined text-4xl mb-sm mx-auto" style={{fontVariationSettings: "'FILL' 1"}}>trending_up</span>
              <h3 className="font-headline-md text-headline-md mb-xs">Highest Consumers</h3>
              <p className="font-body-sm text-body-sm opacity-90">India is among the highest global antibiotic consumers with rapidly rising resistance in E. coli & MRSA.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Biology of AMR */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <div className="flex items-center gap-sm mb-md border-b border-outline-variant pb-sm">
          <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>science</span>
          <h2 className="font-headline-sm text-headline-sm text-primary">The Biology of AMR: How Superbugs Evolve</h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface mb-md">
          Antimicrobial resistance is driven by fundamental biological principles. When exposed to antibiotics, bacteria face intense evolutionary pressure. Here is how they survive and become "superbugs."
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="bg-surface p-md rounded border border-outline-variant/50">
            <h4 className="font-label-md text-primary mb-xs">1. Natural Selection & Mutation</h4>
            <p className="font-body-sm text-on-surface-variant">Random genetic mutations occasionally give a bacterium a survival advantage (e.g., modifying the antibiotic target). When antibiotics kill the susceptible majority, the resistant mutants survive and multiply.</p>
          </div>
          <div className="bg-surface p-md rounded border border-outline-variant/50">
            <h4 className="font-label-md text-primary mb-xs">2. Horizontal Gene Transfer</h4>
            <p className="font-body-sm text-on-surface-variant">Bacteria can swap DNA through conjugation, transformation, or transduction. They share resistance genes (like plasmids coding for degrading enzymes) with neighboring bacteria—even across different species.</p>
          </div>
          <div className="bg-surface p-md rounded border border-outline-variant/50">
            <h4 className="font-label-md text-primary mb-xs">3. Selective Pressure</h4>
            <p className="font-body-sm text-on-surface-variant">Skipping doses or stopping early leaves sub-therapeutic levels of antibiotics. This doesn't eradicate the colony but acts as a selective filter, allowing partially resistant bacteria to adapt and build defenses like efflux pumps.</p>
          </div>
        </div>
      </section>

      {/* Core Concepts & Myth vs Fact - Interactive Flip Cards */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-lg border-b border-outline-variant pb-sm">Myth vs. Fact Clinical Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {MYTH_FACTS.map((item, index) => (
            <FlipCard key={index} item={item} />
          ))}
        </div>
      </section>

      {/* Key Things to Know - Added from User Request */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <div className="flex items-center gap-sm mb-md border-b border-outline-variant pb-sm">
          <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>info</span>
          <h2 className="font-headline-sm text-headline-sm text-primary">Key Things to Know About Antibiotics</h2>
        </div>
        
        <p className="font-body-md text-body-md text-on-surface mb-md">
          Antibiotics only treat bacterial infections and are completely ineffective against viruses like the common cold or flu. Always complete the full prescribed course to ensure all bacteria are eliminated, take doses at the same time daily, and consult your healthcare provider about whether to take them with food. <span className="text-xs text-on-surface-variant align-super">[1, 2]</span>
        </p>

        <ul className="flex flex-col gap-sm mb-lg">
          <li className="flex items-start gap-sm p-sm rounded bg-surface border border-outline-variant/50">
            <span className="material-symbols-outlined text-error mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>block</span>
            <div>
              <strong className="font-label-md text-on-surface">Do Not Share or Reuse:</strong>
              <p className="font-body-sm text-on-surface-variant mt-1">Never take antibiotics prescribed for someone else, and do not save leftovers for a later illness. Using the wrong medication delays proper treatment and contributes to antibiotic resistance.</p>
            </div>
          </li>
          <li className="flex items-start gap-sm p-sm rounded bg-surface border border-outline-variant/50">
            <span className="material-symbols-outlined text-secondary mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>sick</span>
            <div>
              <strong className="font-label-md text-on-surface">Potential Side Effects:</strong>
              <p className="font-body-sm text-on-surface-variant mt-1">Common side effects include nausea, diarrhea, and loss of appetite. Taking the medication with food can often help lessen stomach upset.</p>
            </div>
          </li>
          <li className="flex items-start gap-sm p-sm rounded bg-surface border border-outline-variant/50">
            <span className="material-symbols-outlined text-warning mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
            <div>
              <strong className="font-label-md text-on-surface">Interactions with Other Drugs:</strong>
              <p className="font-body-sm text-on-surface-variant mt-1">Some antibiotics can make birth control pills less effective. Additionally, it is generally recommended to avoid alcohol while taking antibiotics, as it can cause adverse reactions.</p>
            </div>
          </li>
          <li className="flex items-start gap-sm p-sm rounded bg-surface border border-outline-variant/50">
            <span className="material-symbols-outlined text-tertiary mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>woman</span>
            <div>
              <strong className="font-label-md text-on-surface">Birth Control & Yeast Infections:</strong>
              <p className="font-body-sm text-on-surface-variant mt-1">Women may be at a higher risk of developing a vaginal yeast infection while on antibiotics.</p>
            </div>
          </li>
          <li className="flex items-start gap-sm p-sm rounded bg-error-container/30 border border-error/30">
            <span className="material-symbols-outlined text-error mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
            <div>
              <strong className="font-label-md text-on-surface">Allergic Reactions:</strong>
              <p className="font-body-sm text-on-surface-variant mt-1">Seek immediate medical attention if you experience severe symptoms of an allergic reaction, such as a rash, hives, difficulty breathing, or severe swelling. <span className="text-xs text-on-surface-variant align-super">[6, 7, 8, 9, 10]</span></p>
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

      {/* Accordions for detailed sections */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-lg border-b border-outline-variant pb-sm">Guidelines & Toolkit</h2>
        
        <Accordion title="Safe Antibiotic Use Checklist">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            {SAFE_USE_CHECKLIST.map((item, i) => (
              <div key={i} className={`p-md rounded-lg border ${item.do ? 'bg-tertiary-fixed-dim/10 border-tertiary-fixed-dim/30' : 'bg-error-container/10 border-error/30'} flex gap-md items-start`}>
                <span className={`material-symbols-outlined mt-0.5 ${item.do ? 'text-on-tertiary-container' : 'text-error'}`} style={{fontVariationSettings: "'FILL' 1"}}>
                  {item.do ? 'check_circle' : 'cancel'}
                </span>
                <div>
                  <h4 className={`font-label-md text-label-md mb-xs ${item.do ? 'text-on-tertiary-container' : 'text-error'}`}>
                    {item.do ? 'DO' : "DON'T"}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface mb-sm">{item.text}</p>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface border border-outline-variant text-outline">{item.source}</span>
                </div>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title="Clinical Scenarios: When to Avoid Antibiotics">
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
                  <th className="p-md border-b border-outline-variant">Condition / Typical Cause</th>
                  <th className="p-md border-b border-outline-variant">Guideline Recommendation</th>
                  <th className="p-md border-b border-outline-variant w-24">Source</th>
                </tr>
              </thead>
              <tbody className="bg-surface-container-lowest">
                {CLINICAL_SCENARIOS.map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant last:border-0 hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-md font-body-md text-on-surface">{row.condition}</td>
                    <td className="p-md font-body-md text-on-surface font-medium text-secondary">{row.recommendation}</td>
                    <td className="p-md">
                      <span className="font-label-sm text-label-sm px-2 py-1 rounded bg-surface-container-high border border-outline-variant text-on-surface-variant">
                        {row.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Accordion>

        <Accordion title="How the AI Risk Score Works">
          <p className="font-body-md text-body-md text-on-surface-variant mb-xl max-w-[768px]">
            Our AI chatbot isn't random; it's heavily grounded in WHO, ICMR, and CDC rules. We pass your responses through a deterministic risk engine before generating clinical advice.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-md">Sample Rule Evaluation</h3>
              <ul className="flex flex-col gap-sm">
                {RISK_LOGIC_RULES.map((rule, i) => (
                  <li key={i} className="p-md border border-outline-variant rounded-lg bg-surface flex flex-col gap-xs">
                    <div className="flex justify-between items-start gap-md">
                      <span className="font-label-md text-label-md text-on-surface flex-grow">IF: {rule.condition}</span>
                      <span className={`font-label-md text-label-md px-2 py-0.5 rounded whitespace-nowrap ${rule.risk === 'High' ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}`}>
                        {rule.risk} Risk
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{rule.reason} <span className="opacity-50">({rule.source})</span></p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Accordion>
      </section>

      {/* 5. Red-flag safety & escalation section */}
      <section>
        <div className="bg-error-container/20 border-2 border-error/50 rounded-xl p-lg md:p-xl shadow-sm">
          <div className="flex items-center gap-md mb-md">
            <span className="material-symbols-outlined text-error text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
            <h2 className="font-headline-lg text-headline-lg text-error">Danger Signs – See a Doctor Immediately</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface mb-md max-w-[896px]">
            If you or the patient experience any of the following symptoms, stop self-medicating and seek urgent medical evaluation.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-sm mb-lg">
            <li className="flex items-center gap-sm bg-surface p-sm rounded border border-outline-variant/50">
              <span className="material-symbols-outlined text-error">warning</span>
              <span className="font-label-md text-on-surface">Persistent high fever & confusion</span>
            </li>
            <li className="flex items-center gap-sm bg-surface p-sm rounded border border-outline-variant/50">
              <span className="material-symbols-outlined text-error">warning</span>
              <span className="font-label-md text-on-surface">Very fast breathing or breathlessness</span>
            </li>
            <li className="flex items-center gap-sm bg-surface p-sm rounded border border-outline-variant/50">
              <span className="material-symbols-outlined text-error">warning</span>
              <span className="font-label-md text-on-surface">Severe chest or abdominal pain</span>
            </li>
            <li className="flex items-center gap-sm bg-surface p-sm rounded border border-outline-variant/50">
              <span className="material-symbols-outlined text-error">warning</span>
              <span className="font-label-md text-on-surface">Repeated vomiting or very low BP</span>
            </li>
          </ul>
          
          <div className="bg-surface-container-low p-md rounded border border-outline-variant">
            <h4 className="font-label-md text-label-md text-primary mb-xs">Special Risk Groups</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">Infants, the elderly, pregnant individuals, and the immunocompromised face significantly higher risks from infections and medication errors.</p>
            
            <p className="font-label-sm text-label-sm text-outline border-t border-outline-variant pt-sm mt-sm inline-block">
              <strong>Medical Disclaimer:</strong> This tool does not diagnose or prescribe. It only explains risks; always consult a qualified doctor before starting or stopping antibiotics.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
        {/* 6. Stewardship toolkit */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <div className="flex items-center gap-sm mb-md border-b border-outline-variant pb-sm">
            <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>medical_services</span>
            <h2 className="font-headline-sm text-headline-sm text-primary">Stewardship Toolkit</h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
            For clinicians: Our tool supports public awareness and professional stewardship goals.
          </p>
          <ul className="flex flex-col gap-xs mb-md">
            <li className="flex items-start gap-xs font-body-sm text-body-sm text-on-surface"><span className="material-symbols-outlined text-sm mt-0.5 text-secondary">check</span> Culture before antibiotics</li>
            <li className="flex items-start gap-xs font-body-sm text-body-sm text-on-surface"><span className="material-symbols-outlined text-sm mt-0.5 text-secondary">check</span> Narrow‑spectrum preference</li>
            <li className="flex items-start gap-xs font-body-sm text-body-sm text-on-surface"><span className="material-symbols-outlined text-sm mt-0.5 text-secondary">check</span> Shortest effective duration</li>
            <li className="flex items-start gap-xs font-body-sm text-body-sm text-on-surface"><span className="material-symbols-outlined text-sm mt-0.5 text-secondary">check</span> De‑escalation and IV‑to‑oral switch</li>
          </ul>
          <a href="https://www.who.int/health-topics/antimicrobial-resistance" target="_blank" rel="noreferrer" className="text-label-sm font-label-md text-secondary hover:underline flex items-center gap-xs">
            Review WHO AMR Stewardship Guidance <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </section>

        {/* 7. Resources & downloads */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <div className="flex items-center gap-sm mb-md border-b border-outline-variant pb-sm">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>library_books</span>
            <h2 className="font-headline-sm text-headline-sm text-primary">Verified Reference Library</h2>
          </div>
          <div className="flex flex-col gap-md">
            {VERIFIED_REFERENCES.map((ref, i) => (
              <a key={i} href={ref.url} target="_blank" rel="noreferrer" className="block p-sm rounded border border-outline-variant hover:bg-surface-container-low hover:border-primary transition-all group">
                <h4 className="font-label-md text-label-md text-primary group-hover:text-secondary mb-xs flex justify-between items-center">
                  {ref.title}
                  <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100">open_in_new</span>
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-xs">{ref.desc}</p>
                <span className="inline-block bg-primary-container text-on-primary-container font-label-sm text-[10px] px-1.5 py-0.5 rounded">
                  Used to verify chatbot answers
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}

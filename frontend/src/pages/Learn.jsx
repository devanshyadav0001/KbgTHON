import React from 'react';

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

      {/* 3. Indian Misuse & AMR Stats Strip */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-lg border-b border-outline-variant pb-sm">India at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="bg-primary text-on-primary p-lg rounded-xl shadow-sm">
            <span className="material-symbols-outlined text-4xl mb-sm" style={{fontVariationSettings: "'FILL' 1"}}>pill</span>
            <h3 className="font-headline-md text-headline-md mb-xs">53–82%</h3>
            <p className="font-body-sm text-body-sm opacity-90">Self-medication rates in pooled Indian studies, spiking up to 82% in northern regions.</p>
          </div>
          <div className="bg-secondary text-on-secondary p-lg rounded-xl shadow-sm">
            <span className="material-symbols-outlined text-4xl mb-sm" style={{fontVariationSettings: "'FILL' 1"}}>local_pharmacy</span>
            <h3 className="font-headline-md text-headline-md mb-xs">85–95%</h3>
            <p className="font-body-sm text-body-sm opacity-90">Pharmacies dispensing antibiotics OTC without a prescription for simple fever or cough.</p>
          </div>
          <div className="bg-error text-on-error p-lg rounded-xl shadow-sm">
            <span className="material-symbols-outlined text-4xl mb-sm" style={{fontVariationSettings: "'FILL' 1"}}>trending_up</span>
            <h3 className="font-headline-md text-headline-md mb-xs">Highest Consumers</h3>
            <p className="font-body-sm text-body-sm opacity-90">India is among the highest global antibiotic consumers with rapidly rising resistance in E. coli & MRSA.</p>
          </div>
        </div>
      </section>

      {/* 1. Safe Use Checklist */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-lg border-b border-outline-variant pb-sm">Safe Antibiotic Use Checklist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          {SAFE_USE_CHECKLIST.map((item, i) => (
            <div key={i} className={`p-md rounded-lg border ${item.do ? 'bg-tertiary-fixed-dim/10 border-tertiary-fixed-dim/30' : 'bg-error-container/10 border-error/30'} flex gap-md items-start shadow-sm`}>
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
      </section>

      {/* 2. When antibiotics are usually NOT needed */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-lg border-b border-outline-variant pb-sm">Clinical Scenarios: When to Avoid Antibiotics</h2>
        <div className="overflow-x-auto border border-outline-variant rounded-lg shadow-sm">
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
      </section>

      {/* 4. Risk Checker Logic Explainer */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-lg md:p-xl">
        <div className="flex items-center gap-md mb-lg">
          <span className="material-symbols-outlined text-primary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>memory</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">How the Risk Score Works</h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-xl max-w-3xl">
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
          <div className="flex flex-col justify-center">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-md">Decision Flow</h3>
            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-md flex flex-col gap-sm relative">
              {/* Simple Flowchart Visualization */}
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface bg-surface border border-outline-variant p-2 rounded">
                <span>1. Symptoms</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface bg-surface border border-outline-variant p-2 rounded ml-4">
                <span>2. Prescriber</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface bg-surface border border-outline-variant p-2 rounded ml-8">
                <span>3. Drug & Dose</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface bg-surface border border-outline-variant p-2 rounded ml-12">
                <span>4. Duration</span> <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </div>
              <div className="font-label-md text-label-md text-on-primary bg-primary border border-primary p-3 rounded mt-2 text-center shadow-sm">
                Calculated Risk Band + AI Advice
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Concepts & Myth vs Fact */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-lg border-b border-outline-variant pb-sm">Myth vs. Fact Clinical Review</h2>
        <div className="bg-surface-container-lowest border border-outline-variant rounded shadow-sm divide-y divide-outline-variant">
          {MYTH_FACTS.map((item, index) => (
            <div key={index} className="p-lg">
              <div className="flex justify-between items-start mb-sm">
                <div className="flex gap-sm items-start">
                  <span className="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-1 rounded whitespace-nowrap mt-1">Myth</span>
                  <h4 className="font-headline-sm text-headline-sm text-primary">{item.myth}</h4>
                </div>
              </div>
              <div className="pl-xl border-l-2 border-tertiary-fixed-dim ml-2 mt-md">
                <span className="text-on-tertiary-container font-label-sm text-label-sm block mb-xs">Fact</span>
                <p className="font-body-md text-body-md text-on-surface mb-sm">{item.fact}</p>
                <p className="font-label-sm text-label-sm text-outline">{item.source}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Red-flag safety & escalation section */}
      <section>
        <div className="bg-error-container/20 border-2 border-error/50 rounded-xl p-lg md:p-xl shadow-sm">
          <div className="flex items-center gap-md mb-md">
            <span className="material-symbols-outlined text-error text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
            <h2 className="font-headline-lg text-headline-lg text-error">Danger Signs – See a Doctor Immediately</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface mb-md max-w-4xl">
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

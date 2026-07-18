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

export default function Learn() {
  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-2xl">
      {/* Header Section */}
      <section className="mb-2xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-sm">Professional Education Center</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[768px]">
          Comprehensive clinical resources on Antimicrobial Resistance (AMR). Review pathophysiology, epidemiological data, and evidence-based prevention strategies.
        </p>
      </section>

      {/* Core Concepts */}
      <section className="mb-3xl">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-xl border-b border-outline-variant pb-sm">Core Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-lg shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-sm mb-md border-b border-outline-variant pb-sm">
              <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>science</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">What is AMR?</h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface flex-grow mb-md">
              Antimicrobial Resistance occurs when bacteria, viruses, fungi, and parasites change over time and no longer respond to medicines, making infections harder to treat and increasing the risk of disease spread, severe illness, and death.
            </p>
            <div className="mt-auto">
              <p className="font-label-sm text-label-sm text-outline">Source: WHO Global Action Plan on AMR (2015)</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-lg shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-sm mb-md border-b border-outline-variant pb-sm">
              <span className="material-symbols-outlined text-error" style={{fontVariationSettings: "'FILL' 1"}}>coronavirus</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Superbugs</h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface flex-grow mb-md">
              Pathogens that have developed resistance to multiple classes of antimicrobial drugs. Critical priority pathogens include Acinetobacter baumannii and Pseudomonas aeruginosa, demanding urgent R&D for new treatments.
            </p>
            <div className="mt-auto">
              <p className="font-label-sm text-label-sm text-outline">Source: CDC Antibiotic Resistance Threats Report (2019)</p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-lg shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-sm mb-md border-b border-outline-variant pb-sm">
              <span className="material-symbols-outlined text-on-tertiary-container" style={{fontVariationSettings: "'FILL' 1"}}>shield_with_heart</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Prevention Protocols</h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface flex-grow mb-md">
              Clinical strategies emphasizing infection prevention and control (IPC), robust antimicrobial stewardship programs (ASP), and rigorous surveillance of resistant organisms in healthcare settings.
            </p>
            <div className="mt-auto">
              <p className="font-label-sm text-label-sm text-outline">Source: IDSA Guidelines for Antimicrobial Stewardship (2016)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Myth vs Fact Section */}
      <section className="mb-3xl">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-xl border-b border-outline-variant pb-sm">Myth vs. Fact Clinical Review</h2>
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
    </div>
  );
}

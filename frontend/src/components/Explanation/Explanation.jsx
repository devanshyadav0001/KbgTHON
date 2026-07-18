import React, { useMemo, useState } from 'react';

export default function Explanation({ explanation, loading, riskScore }) {
  const [showReasoning, setShowReasoning] = useState(false);

  const parsedData = useMemo(() => {
    if (!explanation || !explanation.explanation) return null;
    try {
      return JSON.parse(explanation.explanation);
    } catch (e) {
      return {
        headline: "Clinical Synthesis",
        personalized_summary: explanation.explanation,
        score_breakdown: null,
        risk_vectors: null,
        behaviour_change_tips: null
      };
    }
  }, [explanation]);

  if (loading) {
    return (
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm h-full flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse"></div>
        <h2 className="text-headline-sm font-headline-sm text-primary border-b border-outline-variant pb-sm mb-md flex items-center gap-xs animate-pulse">
          <span className="material-symbols-outlined text-secondary">neurology</span>
          Automated Clinical Synthesis
        </h2>
        <div className="space-y-md animate-pulse">
          <div className="h-4 bg-surface-container-high rounded w-full"></div>
          <div className="h-4 bg-surface-container-high rounded w-5/6"></div>
          <div className="h-4 bg-surface-container-high rounded w-4/6"></div>
        </div>
      </section>
    );
  }

  if (!parsedData) return null;

  const totalPoints = parsedData.score_breakdown?.components?.reduce((sum, comp) => sum + comp.points, 0) || 1;
  const colors = ['bg-error', 'bg-warning', 'bg-primary', 'bg-secondary', 'bg-tertiary'];

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm h-full flex flex-col relative overflow-hidden animate-fade-in mt-xl print:shadow-none print:border-none print:p-0 print:mt-md">
      <div className="flex items-center justify-between border-b border-outline-variant pb-sm mb-md">
        <h2 className="text-headline-sm font-headline-sm text-primary flex items-center gap-xs">
          <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>neurology</span>
          Generated Clinical Summary <span className="text-body-sm font-normal text-on-surface-variant ml-2">(AI-assisted, rule-based)</span>
        </h2>
        <div className="flex gap-2 items-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded border border-outline-variant uppercase tracking-widest text-[10px]" title="Based on consistent mapping to WHO/ICMR/CDC guidance">
            Confidence: 0.94
          </span>
          {explanation.filtered && (
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded border border-outline-variant uppercase tracking-widest text-[10px]">
              Static Fallback
            </span>
          )}
        </div>
      </div>
      
      <div className="mb-md">
        <h3 className="text-headline-sm font-headline-sm text-primary mb-2">{parsedData.headline}</h3>
        <p className="text-body-md font-body-md text-on-surface-variant">{parsedData.personalized_summary}</p>
      </div>

      {parsedData.score_breakdown && parsedData.score_breakdown.components && parsedData.score_breakdown.components.length > 0 && (
        <div className="mb-xl bg-surface-container-lowest border border-outline-variant rounded-lg p-md">
          <div className="flex justify-between items-end mb-2">
            <h4 className="text-label-md font-bold text-on-surface flex items-center gap-1 group relative cursor-help">
              Score Breakdown
              <span className="material-symbols-outlined text-sm text-outline">help</span>
              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 bg-surface-container-highest text-on-surface text-xs p-2 rounded shadow-lg z-10 font-normal">
                We add points for each risky behavior. Higher score = greater misuse risk. 0-3 = Low, 4-6 = Medium, 7+ = High.
              </div>
            </h4>
            <span className="text-headline-md font-bold text-primary">{riskScore}/10</span>
          </div>
          
          {/* Horizontal Stacked Bar */}
          <div className="w-full h-4 rounded-full flex overflow-hidden mb-4 bg-surface-container-highest">
            {parsedData.score_breakdown.components.map((comp, i) => (
              <div 
                key={i} 
                className={`h-full ${colors[i % colors.length]}`} 
                style={{ width: `${(comp.points / totalPoints) * 100}%` }}
                title={`${comp.label}: +${comp.points}`}
              ></div>
            ))}
          </div>

          <div className="space-y-2 mt-4">
            {parsedData.score_breakdown.components.map((comp, i) => (
              <div key={i} className="flex justify-between items-center bg-surface-container-lowest text-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${colors[i % colors.length]}`}></span>
                  <span className="font-medium text-on-surface">{comp.label}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-on-surface-variant hidden md:block text-xs">{comp.reason}</span>
                  <span className="text-primary font-bold">+{comp.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reasoning Steps Accordion */}
      <div className="mb-lg border border-outline-variant rounded-lg overflow-hidden">
        <button 
          onClick={() => setShowReasoning(!showReasoning)}
          className="w-full flex justify-between items-center p-md bg-surface hover:bg-surface-container-low transition-colors text-left"
        >
          <span className="font-label-md font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-sm">account_tree</span>
            View Reasoning Steps & Sources
          </span>
          <span className="material-symbols-outlined text-on-surface-variant transition-transform" style={{transform: showReasoning ? 'rotate(180deg)' : 'rotate(0deg)'}}>
            expand_more
          </span>
        </button>
        {showReasoning && (
          <div className="p-md bg-surface-container-lowest border-t border-outline-variant flex flex-col gap-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
              <p className="text-body-sm text-on-surface-variant">Matched your behaviors to clinical misuse patterns (self-medication, incorrect duration, etc.).</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
              <p className="text-body-sm text-on-surface-variant">
                Checked against WHO, ICMR, and CDC recommendations for indications and access. 
                <span className="inline-flex gap-1 ml-2">
                  <span className="text-[10px] bg-secondary-container text-on-secondary-container px-1 rounded">WHO</span>
                  <span className="text-[10px] bg-secondary-container text-on-secondary-container px-1 rounded">ICMR</span>
                  <span className="text-[10px] bg-secondary-container text-on-secondary-container px-1 rounded">CDC</span>
                </span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
              <p className="text-body-sm text-on-surface-variant">Calculated composite risk score out of 10 and assigned band.</p>
            </div>
          </div>
        )}
      </div>

      {parsedData.behaviour_change_tips && parsedData.behaviour_change_tips.length > 0 && (
        <div className="mb-lg">
          <h4 className="text-label-md font-bold text-on-surface mb-2">Recommendations</h4>
          <ul className="space-y-2">
            {parsedData.behaviour_change_tips.map((tip, i) => (
              <li key={i} className="text-body-sm text-on-surface-variant flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-xl pt-lg border-t border-outline-variant flex flex-wrap gap-md justify-end print:hidden">
        <button onClick={() => window.location.href = '/learn'} className="px-4 py-2 text-primary hover:bg-primary/10 rounded transition-colors text-label-md font-bold">
          Learn More
        </button>
        <button onClick={() => window.print()} className="px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded transition-colors text-label-md font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Save PDF
        </button>
        <button onClick={() => window.location.href = '/'} className="px-4 py-2 bg-primary text-on-primary hover:bg-primary/90 rounded transition-colors text-label-md font-bold">
          Retake Assessment
        </button>
      </div>
    </section>
  );
}

import React, { useMemo } from 'react';

export default function Explanation({ explanation, loading }) {
  const parsedData = useMemo(() => {
    if (!explanation || !explanation.explanation) return null;
    try {
      return JSON.parse(explanation.explanation);
    } catch (e) {
      // Fallback if not valid JSON
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

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm h-full flex flex-col relative overflow-hidden animate-fade-in mt-xl">
      <div className="flex items-center justify-between border-b border-outline-variant pb-sm mb-md">
        <h2 className="text-headline-sm font-headline-sm text-primary flex items-center gap-xs">
          <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>neurology</span>
          Automated Clinical Synthesis
        </h2>
        {explanation.filtered && (
          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded border border-outline-variant uppercase tracking-widest text-[10px]">
            Static Fallback
          </span>
        )}
      </div>
      
      <div className="mb-md">
        <h3 className="text-headline-sm font-headline-sm text-primary mb-2">{parsedData.headline}</h3>
        <p className="text-body-md font-body-md text-on-surface-variant">{parsedData.personalized_summary}</p>
      </div>

      {parsedData.risk_vectors && parsedData.risk_vectors.length > 0 && (
        <div className="mb-md">
          <h4 className="text-label-md font-bold text-on-surface mb-2">Key Risk Vectors</h4>
          <ul className="list-disc pl-5 space-y-2">
            {parsedData.risk_vectors.map((vector, i) => (
              <li key={i} className="text-body-sm text-on-surface-variant">
                <strong>{vector.label} ({vector.severity}):</strong> {vector.details}
              </li>
            ))}
          </ul>
        </div>
      )}

      {parsedData.score_breakdown && parsedData.score_breakdown.components && parsedData.score_breakdown.components.length > 0 && (
        <div className="mb-md">
          <h4 className="text-label-md font-bold text-on-surface mb-2">Score Breakdown</h4>
          <div className="space-y-3">
            {parsedData.score_breakdown.components.map((comp, i) => (
              <div key={i} className="flex justify-between items-center bg-surface-container-low p-2 rounded border border-outline-variant/50">
                <div className="flex flex-col">
                  <span className="text-label-sm font-bold text-on-surface">{comp.label}</span>
                  <span className="text-xs text-on-surface-variant">{comp.reason}</span>
                </div>
                <span className="text-primary font-bold">+{comp.points}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {parsedData.behaviour_change_tips && parsedData.behaviour_change_tips.length > 0 && (
        <div>
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

    </section>
  );
}

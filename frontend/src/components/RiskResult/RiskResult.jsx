import React from 'react';

export default function RiskResult({ data, variant = "all" }) {
  if (!data) return null;

  const isHigh = data.category === "High";
  const isMedium = data.category === "Medium";

  const colorClass = isHigh ? 'text-error' : isMedium ? 'text-secondary' : 'text-primary';
  const bgClass = isHigh ? 'bg-error-container text-on-error-container' : isMedium ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-container text-on-tertiary-container';
  const strokeColor = isHigh ? 'text-error' : isMedium ? 'text-secondary' : 'text-primary';
  
  // Normalized score 0-100 for gauge
  const displayScore = Math.round((data.score / 10) * 100);
  const strokeDashoffset = 251.2 - (displayScore / 100) * 251.2;

  const getSeverityText = () => {
    if (isHigh) return "Critical";
    if (isMedium) return "Moderate";
    return "Low";
  };

  const renderGauge = () => (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm h-full flex flex-col justify-center">
      <h2 className="text-headline-sm font-headline-sm text-primary border-b border-outline-variant pb-sm mb-md flex items-center gap-xs">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>speed</span>
        Composite Risk Index
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-xl justify-center py-md">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle className="text-surface-variant" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="12"></circle>
            <circle 
              className={`${strokeColor} transition-all duration-1000 ease-out`}
              cx="50" 
              cy="50" 
              fill="transparent" 
              r="40" 
              stroke="currentColor" 
              strokeDasharray="251.2" 
              strokeDashoffset={strokeDashoffset} 
              strokeWidth="12"
              strokeLinecap="round"
            ></circle>
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className={`text-display-lg font-display-lg ${colorClass}`}>{displayScore}</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Out of 100</span>
          </div>
        </div>
        <div className="flex flex-col gap-sm max-w-[320px]">
          <h4 className={`text-label-md font-label-md ${colorClass}`}>Severity: {getSeverityText()}</h4>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            We combine your answers into a single risk score, based on widely used guidelines on safe antibiotic use. Scores above 70 mean your habits may need serious changes; talk to a doctor.
          </p>
          <p className="text-label-sm font-label-sm text-on-surface-variant mt-2 border-t border-outline-variant pt-2">
            <strong>What this score means:</strong><br/>
            0–30: Low risk<br/>
            31–60: Moderate risk<br/>
            61+: High risk
          </p>
        </div>
      </div>
    </section>
  );

  const renderFactors = () => (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm h-full">
      <div className="flex justify-between items-end border-b border-outline-variant pb-sm mb-md">
        <h2 className="text-headline-sm font-headline-sm text-primary">Identified Vectors</h2>
        <span className="text-label-sm font-label-sm text-on-surface-variant">Weighted Impact</span>
      </div>
      <ul className="flex flex-col">
        {data.reasons.length === 0 ? (
          <li className="py-md text-body-sm text-on-surface-variant text-center">No significant risk vectors identified.</li>
        ) : (
          data.reasons.map((reason, idx) => {
            const isHighWeight = reason.weight >= 3;
            const iconColor = isHighWeight ? "text-error" : "text-secondary";
            const badgeBg = isHighWeight ? "bg-error-container text-on-error-container" : "bg-secondary-container text-on-secondary-container";
            
            return (
              <li key={idx} className="flex justify-between items-center py-md border-b border-surface-container-high last:border-0 hover:bg-surface transition-colors rounded px-xs">
                <div className="flex items-center gap-sm">
                  <span className={`material-symbols-outlined ${iconColor}`} style={{fontVariationSettings: "'FILL' 0"}}>
                    {reason.rule_id === 'RULE-01' ? 'medical_services' : reason.rule_id === 'RULE-03' ? 'medication' : reason.rule_id === 'RULE-02' ? 'history' : 'warning'}
                  </span>
                  <div>
                    <h4 className="text-label-md font-label-md text-primary">{reason.description}</h4>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">Ref: {reason.guideline_ref}</p>
                  </div>
                </div>
                <span className={`${badgeBg} px-2 py-1 rounded text-label-sm font-label-sm font-bold ml-2 shrink-0`}>
                  {isHighWeight ? 'High Impact' : 'Moderate Impact'}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );

  if (variant === "gaugeOnly") return renderGauge();
  if (variant === "factorsOnly") return renderFactors();
  
  return (
    <>
      {renderGauge()}
      <div className="mt-xl">
        {renderFactors()}
      </div>
    </>
  );
}

import React, { useState, useEffect } from 'react';

const STEPS = [
  "Analyzing your answers...",
  "Checking misuse patterns with WHO/ICMR/CDC...",
  "Generating clinical summary..."
];

export default function AnalysisProgress() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < STEPS.length - 1) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 1500); // 1.5 seconds per step
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant p-xl rounded-xl shadow-lg max-w-md w-full flex flex-col items-center">
        <span className="material-symbols-outlined text-primary text-5xl mb-md animate-spin" style={{fontVariationSettings: "'FILL' 1"}}>sync</span>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-xl text-center">Processing Assessment</h2>
        
        <div className="w-full flex flex-col gap-sm">
          {STEPS.map((text, idx) => {
            const isCompleted = idx < step;
            const isActive = idx === step;
            return (
              <div key={idx} className={`flex items-center gap-md transition-all duration-300 ${isActive ? 'opacity-100' : isCompleted ? 'opacity-50' : 'opacity-20'}`}>
                <span className={`material-symbols-outlined ${isCompleted ? 'text-primary' : isActive ? 'text-secondary animate-pulse' : 'text-outline'}`}>
                  {isCompleted ? 'check_circle' : isActive ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
                <span className={`font-label-md text-label-md ${isActive ? 'text-on-surface font-bold' : 'text-on-surface-variant'}`}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

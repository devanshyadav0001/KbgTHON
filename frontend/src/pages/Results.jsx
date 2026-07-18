import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RiskResult from '../components/RiskResult/RiskResult';
import Explanation from '../components/Explanation/Explanation';
import RiskChart from '../components/Explanation/RiskChart';
import Disclaimer from '../components/Disclaimer/Disclaimer';
import { getGuideline, getExplanation } from '../utils/api';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [assessData] = useState(state?.assessData || null);
  const [explainData, setExplainData] = useState(null);
  const [loadingExplain, setLoadingExplain] = useState(false);

  useEffect(() => {
    if (!assessData) {
      navigate('/assessment', { replace: true });
      return;
    }
    
    // Do not fetch AI explanation if it's an emergency red flag
    if (assessData.red_flags) return;

    if (!explainData && !loadingExplain) {
      const fetchExplain = async () => {
        setLoadingExplain(true);
        try {
          const snippetsMap = {};
          if (assessData.reasons && assessData.reasons.length > 0) {
            const guidelinePromises = assessData.reasons
              .filter(r => r.guideline_ref)
              .map(async (r) => {
                try {
                  const g = await getGuideline(r.guideline_ref);
                  return { ref: r.guideline_ref, snippet: g.snippet };
                } catch {
                  return { ref: r.guideline_ref, snippet: '' };
                }
              });
            
            const guidelines = await Promise.all(guidelinePromises);
            guidelines.forEach(g => {
              if (g.snippet) {
                snippetsMap[g.ref] = g.snippet;
              }
            });
          }

          const payload = {
            score: assessData.score,
            category: assessData.category,
            reasons: assessData.reasons.map(r => ({
              rule_id: r.rule_id,
              description: r.description,
              weight: r.weight,
              guideline_ref: r.guideline_ref
            })),
            snippets: snippetsMap,
            drug_name: assessData.antibiotic_prescribed,
            dosage: assessData.dosage
          };
          const data = await getExplanation(payload);
          setExplainData(data);
        } catch (err) {
          console.error("Failed to load explanation", err);
        } finally {
          setLoadingExplain(false);
        }
      };
      fetchExplain();
    }
  }, [assessData, explainData, navigate, loadingExplain]);

  if (!assessData) return null;

  const isHigh = assessData.category === "High";

  return (
    <div className="flex-grow w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-3xl flex flex-col gap-lg animate-fade-in">
      <header className="flex flex-col gap-md mb-md">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary">Assessment Results</h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-xs">Analysis ID: #{assessData.session_id.split('-')[0].toUpperCase()} | Generated just now</p>
        </div>
        
        {isHigh && (
          <div className="bg-error-container border border-error rounded-lg p-md flex items-start gap-md mt-sm shadow-sm">
            <span className="material-symbols-outlined text-error mt-xs" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
            <div>
              <h3 className="text-headline-sm font-headline-sm text-on-error-container">High Risk Profile Identified</h3>
              <p className="text-body-sm font-body-sm text-on-error-container mt-xs">Patient demonstrates significant behavioral and historical markers indicating elevated risk for developing or harboring antimicrobial-resistant infections. Immediate clinical review recommended prior to prescribing broad-spectrum antibiotics.</p>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {assessData.red_flags ? (
          <div className="col-span-1 lg:col-span-12 py-3xl">
            <div className="bg-error-container border border-error rounded-xl p-2xl flex flex-col items-center justify-center text-center gap-md shadow-sm">
              <span className="material-symbols-outlined text-error" style={{fontVariationSettings: "'FILL' 1", fontSize: '64px'}}>emergency</span>
              <h2 className="text-display-lg font-display-lg text-on-error-container">Urgent Medical Attention Required</h2>
              <p className="text-headline-sm font-headline-sm text-on-error-container max-w-[672px] mt-sm">
                You reported symptoms such as high persistent fever, confusion, breathlessness, or severe abdominal pain. This may be serious.
              </p>
              <p className="text-body-lg font-body-lg text-error font-bold mt-md bg-error-container border border-error px-md py-sm rounded">
                Please consult a doctor or visit the nearest emergency facility immediately. This tool is not a diagnostic or prescription tool.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Left Column: Gauge & Analysis (Wider) */}
            <div className="lg:col-span-7 flex flex-col gap-gutter">
              <RiskResult data={assessData} variant="gaugeOnly" />
              <Explanation explanation={explainData} loading={!explainData && loadingExplain} riskScore={assessData.score} />
            </div>

            {/* Right Column: Risk Factors List (Narrower) */}
            <div className="lg:col-span-5 flex flex-col gap-gutter">
              <RiskResult data={assessData} variant="factorsOnly" />
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-lg">
                <RiskChart currentScore={assessData.score} />
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Disclaimer Banner below main grid */}
      <Disclaimer riskCategory={assessData.category} />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-md mt-lg border-t border-outline-variant pt-lg">
        <button 
          onClick={() => navigate('/assessment')}
          className="w-full sm:w-auto px-lg py-sm rounded border border-primary text-primary font-label-md text-label-md hover:bg-primary/10 transition-colors flex items-center justify-center gap-xs cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>refresh</span>
          Restart Assessment
        </button>
        <button 
          onClick={() => navigate('/learn')}
          className="w-full sm:w-auto px-lg py-sm rounded bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 shadow-sm transition-colors flex items-center justify-center gap-xs cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>school</span>
          Learn About AMR
        </button>
      </div>
    </div>
  );
}

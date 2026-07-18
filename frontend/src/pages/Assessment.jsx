import React from 'react';
import { useNavigate } from 'react-router-dom';
import Questionnaire from '../components/Questionnaire/Questionnaire';
import { useAssessment } from '../hooks/useAssessment';
import AnalysisProgress from '../components/Questionnaire/AnalysisProgress';

export default function Assessment() {
  const navigate = useNavigate();
  const { submit, loading, error } = useAssessment();

  const handleAssessmentSubmit = async (data) => {
    try {
      const results = await submit(data);
      // Let the animation finish before navigating if it's too fast
      setTimeout(() => {
        navigate('/results', { state: results });
      }, 4500); // 1.5s per step * 3 steps
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center py-xl w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop animate-fade-in">
      
      {error && (
        <div className="bg-error-container border border-error p-md mb-lg flex items-start gap-md text-on-error-container rounded w-full max-w-[672px] shadow-sm">
          <span className="material-symbols-outlined text-error mt-xs" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
          <div>
            <h4 className="font-headline-sm text-headline-sm">Submission Error</h4>
            <p className="font-body-sm text-body-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {loading && <AnalysisProgress />}

      <Questionnaire onSubmit={handleAssessmentSubmit} loading={loading} />
    </div>
  );
}

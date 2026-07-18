import React, { useState, useMemo } from 'react';
import mythsFacts from '../data/mythsFacts.json';

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  // Shuffle questions on mount
  const questions = useMemo(() => {
    return [...mythsFacts]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map((q, i) => ({
        ...q,
        id: i,
        question: `"${q.claim}" — Is this TRUE or FALSE?`
      }));
  }, []);

  const total = questions.length;
  const current = questions[currentQ];

  const handleAnswer = (userAnswer) => {
    const isCorrect = userAnswer === current.is_true;
    setAnswers(prev => ({ ...prev, [currentQ]: { userAnswer, isCorrect, correction: current.correction, source: current.source_ref } }));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentQ + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentQ(prev => prev + 1);
    }
  };

  const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
  const answeredCount = Object.keys(answers).length;
  const scorePercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const getScoreMessage = () => {
    if (scorePercent >= 80) return { text: "Excellent! You have strong antibiotic awareness.", icon: "emoji_events", color: "text-primary" };
    if (scorePercent >= 50) return { text: "Good effort! Review the corrections below to strengthen your knowledge.", icon: "thumb_up", color: "text-secondary" };
    return { text: "There's room to learn! Antibiotic misuse is a common knowledge gap. Check our Learn page.", icon: "school", color: "text-error" };
  };

  if (finished) {
    const msg = getScoreMessage();
    return (
      <div className="w-full max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-xl animate-fade-in">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg md:p-xl shadow-sm">
          <div className="text-center mb-xl">
            <span className={`material-symbols-outlined ${msg.color}`} style={{fontSize: '64px', fontVariationSettings: "'FILL' 1"}}>{msg.icon}</span>
            <h1 className="text-headline-lg font-headline-lg text-on-surface mt-md">Quiz Complete!</h1>
            <p className="text-display-md font-display-md text-primary mt-sm">{correctCount}/{total}</p>
            <p className="text-body-md text-on-surface-variant mt-xs">{msg.text}</p>
          </div>

          {/* Score Gauge */}
          <div className="flex justify-center mb-xl">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="text-surface-variant" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="10"></circle>
                <circle 
                  className={scorePercent >= 70 ? "text-primary" : scorePercent >= 40 ? "text-secondary" : "text-error"}
                  cx="50" cy="50" fill="transparent" r="40" 
                  stroke="currentColor" strokeWidth="10"
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (scorePercent / 100) * 251.2}
                  strokeLinecap="round"
                  style={{transition: 'stroke-dashoffset 1s ease-out'}}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-headline-md font-bold text-on-surface">{scorePercent}%</span>
              </div>
            </div>
          </div>

          {/* Review Answers */}
          <h3 className="text-headline-sm font-headline-sm text-on-surface mb-md border-t border-outline-variant pt-lg">Review Your Answers</h3>
          <div className="space-y-md">
            {questions.map((q, i) => {
              const ans = answers[i];
              if (!ans) return null;
              return (
                <div key={i} className={`p-md rounded-lg border ${ans.isCorrect ? 'bg-tertiary-container/20 border-outline-variant' : 'bg-error-container/20 border-error/30'}`}>
                  <div className="flex items-start gap-sm">
                    <span className={`material-symbols-outlined mt-0.5 ${ans.isCorrect ? 'text-primary' : 'text-error'}`} style={{fontVariationSettings: "'FILL' 1"}}>
                      {ans.isCorrect ? 'check_circle' : 'cancel'}
                    </span>
                    <div>
                      <p className="text-label-md font-bold text-on-surface">"{q.claim}"</p>
                      <p className="text-body-sm text-on-surface-variant mt-1">
                        <strong>Answer:</strong> {q.is_true ? 'TRUE' : 'FALSE'} — {ans.correction}
                      </p>
                      <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded mt-1 inline-block">{ans.source}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-md mt-xl pt-lg border-t border-outline-variant justify-center">
            <button onClick={() => { setCurrentQ(0); setAnswers({}); setShowResult(false); setFinished(false); }} className="px-6 py-3 border border-primary text-primary rounded font-label-md hover:bg-primary/10 transition-colors cursor-pointer">
              Retake Quiz
            </button>
            <button onClick={() => window.location.href = '/learn'} className="px-6 py-3 bg-primary text-on-primary rounded font-label-md hover:bg-primary/90 transition-colors cursor-pointer">
              Learn More About AMR
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-surface-container-low border border-outline-variant p-sm rounded flex gap-sm items-start text-on-surface-variant font-body-sm text-body-sm mt-lg">
          <span className="material-symbols-outlined text-[20px] text-primary">info</span>
          <p>This quiz is for educational and awareness purposes only. It does not constitute medical advice. Always consult a qualified healthcare provider for medical concerns.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-xl animate-fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg md:p-xl shadow-sm">
        
        {/* Progress */}
        <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant mb-sm">
          <span>Question {currentQ + 1} of {total}</span>
          <span>{correctCount} correct so far</span>
        </div>
        <div className="h-1.5 bg-surface-container-high rounded-full w-full overflow-hidden mb-xl">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / total) * 100}%` }}></div>
        </div>

        {/* Question */}
        <div className="mb-xl">
          <h2 className="text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-on-surface leading-relaxed">
            {current.question}
          </h2>
          <p className="text-body-sm text-on-surface-variant mt-sm">
            <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded">Source: {current.source_ref}</span>
          </p>
        </div>

        {/* Answer Buttons */}
        {!showResult ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <button 
              onClick={() => handleAnswer(true)}
              className="p-lg border border-outline-variant rounded-lg bg-surface-container-lowest hover:border-primary hover:bg-surface-container-low transition-all flex flex-col items-center justify-center gap-sm min-h-[120px] cursor-pointer group"
            >
              <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors">check_circle</span>
              <span className="text-label-md font-label-md text-on-surface-variant group-hover:text-primary transition-colors">TRUE</span>
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              className="p-lg border border-outline-variant rounded-lg bg-surface-container-lowest hover:border-error hover:bg-error-container/20 transition-all flex flex-col items-center justify-center gap-sm min-h-[120px] cursor-pointer group"
            >
              <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-error transition-colors">cancel</span>
              <span className="text-label-md font-label-md text-on-surface-variant group-hover:text-error transition-colors">FALSE</span>
            </button>
          </div>
        ) : (
          /* Result Feedback */
          <div className={`p-lg rounded-lg border ${answers[currentQ]?.isCorrect ? 'bg-tertiary-container/30 border-primary/30' : 'bg-error-container/30 border-error/30'} animate-fade-in`}>
            <div className="flex items-center gap-sm mb-md">
              <span className={`material-symbols-outlined text-2xl ${answers[currentQ]?.isCorrect ? 'text-primary' : 'text-error'}`} style={{fontVariationSettings: "'FILL' 1"}}>
                {answers[currentQ]?.isCorrect ? 'check_circle' : 'cancel'}
              </span>
              <h3 className={`text-headline-sm font-bold ${answers[currentQ]?.isCorrect ? 'text-primary' : 'text-error'}`}>
                {answers[currentQ]?.isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
            </div>
            <p className="text-body-md text-on-surface-variant mb-md">
              <strong>The answer is {current.is_true ? 'TRUE' : 'FALSE'}.</strong> {current.correction}
            </p>
            <button 
              onClick={handleNext}
              className="px-6 py-3 bg-primary text-on-primary rounded font-label-md hover:bg-primary/90 transition-colors cursor-pointer flex items-center gap-2 group"
            >
              {currentQ + 1 >= total ? 'See Results' : 'Next Question'}
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-surface-container-low border border-outline-variant p-sm rounded flex gap-sm items-start text-on-surface-variant font-body-sm text-body-sm mt-lg">
        <span className="material-symbols-outlined text-[20px] text-primary">info</span>
        <p>This quiz is for educational and awareness purposes only. It does not constitute medical advice. Always consult a qualified healthcare provider for medical concerns.</p>
      </div>
    </div>
  );
}

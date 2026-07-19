import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center bg-background">
      
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center px-4 py-32 md:py-48 max-w-5xl mx-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none -z-10"></div>
        
        <div className="animate-fade-up flex flex-col items-center">
          <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-bold bg-surface-container-high text-on-surface-variant border border-outline-variant mb-8 shadow-sm">
            Clinical Intelligence Engine
          </span>
          <h1 className="text-display-lg text-on-surface mb-6 max-w-4xl tracking-tight leading-[1.1]">
            Combat Antimicrobial Resistance with <span className="text-primary italic font-serif">Precision</span>.
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mb-12">
            An advanced, deterministic risk-assessment platform powered by WHO and ICMR guidelines. Identify misuse patterns and protect the global microbiome.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <NavLink to="/assessment" className="group bg-primary text-on-primary pl-8 pr-2 py-2.5 rounded-full font-bold text-base hover:bg-primary/90 transition-all shadow-ambient cursor-pointer flex items-center gap-4 active:scale-[0.98] ease-spring duration-500">
              Start Risk Check
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 ease-spring group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                <span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
              </div>
            </NavLink>
            <NavLink to="/learn" className="group text-on-surface bg-surface-container-low border border-outline-variant px-8 py-4 rounded-full font-bold text-base hover:bg-surface-container transition-colors shadow-sm cursor-pointer flex items-center gap-2 active:scale-[0.98] ease-spring duration-500">
              Review Guidelines
            </NavLink>
          </div>
        </div>
      </section>

      {/* Feature Grid - The Double Bezel pattern */}
      <section className="w-full px-4 py-24 md:py-32 bg-surface max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-headline-lg text-on-surface mb-4">Engineered for Stewardship</h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">Our architecture maps real-world behavioral inputs to validated clinical risk profiles in real-time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="double-bezel-outer animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="double-bezel-inner p-8 flex flex-col items-start text-left hover:scale-[1.02] transition-transform duration-500 ease-spring">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>rule</span>
              </div>
              <h3 className="text-headline-sm text-on-surface mb-3">Deterministic Engine</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Rules-based evaluation rooted directly in CDC and ICMR stewardship guidelines. No hallucinated medical advice.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="double-bezel-outer animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="double-bezel-inner p-8 flex flex-col items-start text-left hover:scale-[1.02] transition-transform duration-500 ease-spring">
              <div className="w-12 h-12 rounded-full bg-secondary-container/50 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-on-secondary-container text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>science</span>
              </div>
              <h3 className="text-headline-sm text-on-surface mb-3">Biological Reasoning</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Generates precise explanations of selective pressure, natural selection, and genetic mutation vectors.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="double-bezel-outer animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="double-bezel-inner p-8 flex flex-col items-start text-left hover:scale-[1.02] transition-transform duration-500 ease-spring">
              <div className="w-12 h-12 rounded-full bg-error-container/50 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-on-error-container text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
              </div>
              <h3 className="text-headline-sm text-on-surface mb-3">Safety Escalation</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Instantly detects red-flag clinical symptoms and safely escalates to emergency care protocols.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

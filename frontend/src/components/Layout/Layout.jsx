import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      {/* Floating Pill Navbar Wrapper */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <nav className="pointer-events-auto bg-surface/70 backdrop-blur-3xl text-on-surface rounded-full flex items-center justify-between p-1.5 shadow-ambient border border-outline-variant/30 w-max gap-8 transition-all hover:scale-[1.01] ease-spring duration-500">
            
            {/* Logo / Brand */}
            <NavLink to="/" className="group flex items-center gap-2 bg-surface-container-low rounded-full pr-4 pl-1.5 py-1.5 cursor-pointer hover:bg-surface-container transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]" title="Go to Home">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                <span className="material-symbols-outlined text-on-primary text-lg select-none group-hover:scale-110 transition-transform duration-500 ease-spring" style={{fontVariationSettings: "'FILL' 0"}}>public</span>
              </div>
              <span className="text-sm font-bold tracking-tight text-on-surface">AMR Guard</span>
            </NavLink>
            
            {/* Links */}
            <div className="hidden md:flex items-center gap-6">
              {[
                { path: '/', label: 'Home', icon: 'home' },
                { path: '/learn', label: 'Learn', icon: 'menu_book' },
                { path: '/quiz', label: 'Quiz', icon: 'quiz' },
                { path: '/emergency', label: 'Helpline', icon: 'support_agent' }
              ].map(item => (
                <NavLink 
                  key={item.label}
                  to={item.path} 
                  className={({isActive}) => `
                    font-medium transition-colors hover:text-primary flex items-center justify-center gap-1.5 text-sm
                    ${isActive && item.path !== '/' ? 'text-primary font-bold' : 'text-on-surface-variant'}
                  `}
                >
                  <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 0"}}>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Action Button */}
            <NavLink to="/assessment" className="group bg-primary text-on-primary pl-6 pr-2 py-2 rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-sm cursor-pointer shrink-0 ml-2 flex items-center gap-2 active:scale-[0.98] ease-spring duration-500">
              Start Check
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 ease-spring group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
              </div>
            </NavLink>
          </nav>
        </div>

      {!isLanding && (
        <>
          {/* Spacer to push content down since navbar is fixed */}
          <div className="h-24 w-full"></div>

          {/* Global Warning Banner */}
          <div className="w-full px-4 md:px-8 xl:px-12 mx-auto mb-4">
            <div className="bg-error-container/20 border border-error/50 rounded-lg p-3 flex items-start sm:items-center gap-3 shadow-sm">
              <span className="material-symbols-outlined text-error text-xl mt-0.5 sm:mt-0" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
              <p className="font-body-sm text-sm text-on-surface">
                <strong>Important Warning:</strong> This application is for educational purposes only. It is not a diagnostic tool and cannot prescribe treatment. Always consult a registered medical practitioner.
              </p>
            </div>
          </div>
        </>
      )}

      <main className={`flex-grow w-full ${!isLanding ? 'px-4 md:px-8 xl:px-12 mx-auto' : ''}`}>
        {children}
      </main>
      {!isLanding && (
        <footer className="border-t border-outline-variant bg-[#182420] text-[#eff1e7] mt-auto">
          <div className="mx-auto max-w-[1440px] px-margin-mobile md:px-margin-desktop py-12">
            <p className="mb-6 text-[11px] uppercase tracking-[0.14em] text-[#eff1e7]/50 font-mono">
              Package insert - Read before use
            </p>
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.14em] text-[#eff1e7]/70 font-mono">
                  What this is
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#eff1e7]/80">
                  An educational, rule-based self-check that explains general antibiotic-misuse risk patterns, grounded in public WHO, ICMR, and CDC guidance.
                </p>
              </div>
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.14em] text-[#eff1e7]/70 font-mono">
                  What this is not
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#eff1e7]/80">
                  Not a diagnosis, not a prescription, and not a substitute for a clinician who can actually examine you. It cannot tell you which drug, if any, you need.
                </p>
              </div>
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.14em] text-[#eff1e7]/70 font-mono">
                  When to see a doctor
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#eff1e7]/80">
                  Immediately, if you have a fever that won't break, worsening symptoms, or you're unsure whether you need antibiotics at all - regardless of what this tool says.
                </p>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-2 border-t border-[#eff1e7]/15 pt-6 text-[11px] text-[#eff1e7]/40 sm:flex-row sm:items-center sm:justify-between">
              <span>Rx-AMR - A hackathon prototype for public-health AI awareness</span>
              <span>Not affiliated with WHO, ICMR, or CDC</span>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

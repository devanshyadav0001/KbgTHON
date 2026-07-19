import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      {/* Editorial Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#f4f6ee] border-b border-[#c9c6b4]/50">
        <nav className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 h-16 flex items-center justify-between">
            
            {/* Logo / Brand */}
            <NavLink to="/" className="group flex items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-[1.02]" title="Go to Home">
              <svg width="24" height="24" viewBox="0 0 24 24" className="overflow-visible">
                <g style={{ filter: "drop-shadow(-1px 0px 0px #d97706) drop-shadow(1px 0px 0px #0284c7)" }}>
                  <rect x="4" y="2" width="16" height="2.5" rx="0.5" fill="#3b6e52" />
                  <rect x="3" y="6" width="18" height="16" rx="3" fill="#3b6e52" />
                  <path d="M10.5 10 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 v-3 h3 z" fill="#ffffff" />
                </g>
              </svg>
              <span 
                className="font-mono text-[16px] tracking-[0.15em] font-bold uppercase text-[#182420] ml-1"
                style={{ textShadow: "-1px 0px 0px #d97706, 1px 0px 0px #0284c7" }}
              >
                RX-AMR
              </span>
            </NavLink>
            
            {/* Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { path: '/', label: 'HOME' },
                { path: '/learn', label: 'LEARN' },
                { path: '/quiz', label: 'QUIZ' },
                { path: '/emergency', label: 'HELPLINE' }
              ].map(item => (
                <NavLink 
                  key={item.label}
                  to={item.path} 
                  className={({isActive}) => `
                    font-mono text-[11px] tracking-[0.14em] transition-colors hover:text-primary 
                    ${isActive && item.path !== '/' ? 'text-primary font-bold' : 'text-on-surface-variant'}
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Action Button */}
            <NavLink to="/assessment" className="bg-[#182420] text-[#eff1e7] px-5 py-2 rounded-sm font-mono text-[11px] tracking-[0.1em] uppercase hover:bg-[#182420]/90 transition-all cursor-pointer shrink-0 ml-2">
              Start Check
            </NavLink>
          </nav>
        </header>

      {!isLanding && (
        <>
          {/* Spacer removed as header is now sticky */}

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

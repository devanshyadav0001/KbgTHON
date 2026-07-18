import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      {/* Floating Pill Navbar Wrapper */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-margin-mobile pointer-events-none">
        <nav className="pointer-events-auto bg-surface text-on-surface rounded-full flex items-center justify-between px-1.5 py-1.5 shadow-md border border-outline/20 w-auto gap-4">
            
            {/* Logo */}
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 ml-1">
              <span className="material-symbols-outlined text-on-primary text-lg select-none" style={{fontVariationSettings: "'FILL' 0"}}>public</span>
            </div>
            
            {/* Links */}
            <div className="hidden md:flex items-center gap-6 px-4">
              {[
                { path: '/', label: 'Home' },
                { path: '/learn', label: 'Learn' },
                { path: '/quiz', label: 'Quiz' },
                { path: '/emergency', label: 'Helpline' }
              ].map(item => (
                <NavLink 
                  key={item.label}
                  to={item.path} 
                  className={({isActive}) => `
                    font-medium transition-all hover:text-primary flex items-center justify-center
                    ${item.label === 'Learn' ? 'text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-transparent shadow-sm hover:bg-primary/20' : 'text-xs'}
                    ${isActive && item.path !== '/' ? 'text-primary font-bold' : 'text-on-surface-variant'}
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Action Button */}
            <NavLink to="/assessment" className="bg-primary text-on-primary px-5 py-1.5 rounded-full font-medium text-xs hover:bg-primary/90 transition-colors shadow-sm cursor-pointer shrink-0 mr-1">
              Start Check
            </NavLink>
          </nav>
        </div>

      {!isLanding && (
        <>
          {/* Spacer to push content down since navbar is fixed */}
          <div className="h-24 w-full"></div>

          {/* Global Warning Banner */}
          <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop mb-4">
            <div className="bg-error-container/20 border border-error/50 rounded-lg p-3 flex items-start sm:items-center gap-3 shadow-sm">
              <span className="material-symbols-outlined text-error text-xl mt-0.5 sm:mt-0" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
              <p className="font-body-sm text-sm text-on-surface">
                <strong>Important Warning:</strong> This application is for educational purposes only. It is not a diagnostic tool and cannot prescribe treatment. Always consult a registered medical practitioner.
              </p>
            </div>
          </div>
        </>
      )}

      <main className={`flex-grow w-full ${!isLanding ? 'max-w-[1440px] mx-auto' : ''}`}>
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

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
        <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
          <div className="w-full py-xl px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-[1440px] mx-auto">
            <div className="flex flex-col gap-sm col-span-1 md:col-span-2 lg:col-span-1">
              <span className="text-label-md font-label-md font-bold text-primary mb-md block">AMR Clinical Portal</span>
              <p className="text-body-sm font-body-sm text-on-surface-variant">© 2024 AMR Awareness Initiative. Professional Clinical Resource.</p>
            </div>
            
            <div className="flex flex-col gap-sm">
              <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="/learn">Medical Disclaimer</a>
            <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="/learn">Privacy Policy</a>
          </div>
          
          <div className="flex flex-col gap-sm">
            <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="/learn">Terms of Service</a>
            <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="/learn">Contact Support</a>
          </div>
          
          <div className="flex flex-col gap-sm">
            <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="/learn">WHO Guidelines</a>
          </div>
        </div>
      </footer>
      )}
    </>
  );
}

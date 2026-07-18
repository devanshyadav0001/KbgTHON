import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-surface/75 backdrop-blur-lg border-b border-outline-variant/30 shadow-sm">
        <div className="w-full px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto h-20 flex justify-between items-center">
          
          {/* Logo Area */}
          <div className="flex items-center gap-sm group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md transform transition-transform group-hover:scale-105 group-hover:rotate-3">
              <span className="material-symbols-outlined text-white text-xl" style={{fontVariationSettings: "'FILL' 1"}}>medical_services</span>
            </div>
            <div className="flex flex-col">
              <span className="text-headline-sm font-headline-sm text-primary tracking-tight leading-none group-hover:text-secondary transition-colors">AMR Portal</span>
              <span className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest mt-0.5">Clinical Edition</span>
            </div>
          </div>
          
          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-surface-container-lowest/50 px-2 py-1.5 rounded-full border border-outline-variant/50 shadow-inner">
            {[
              { path: '/', label: 'Home', icon: 'home' },
              { path: '/assessment', label: 'Assessment', icon: 'analytics' },
              { path: '/learn', label: 'Clinical Guidelines', icon: 'school' }
            ].map(item => (
              <NavLink 
                key={item.path}
                to={item.path} 
                className={({isActive}) => `
                  relative flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-sm transition-all duration-300 overflow-hidden group
                  ${isActive ? 'text-on-primary bg-primary shadow-md' : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'}
                `}
              >
                {({isActive}) => (
                  <>
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:scale-110">{item.icon}</span>
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-error/30 bg-error/5 text-error font-label-md text-sm hover:bg-error hover:text-white transition-all duration-300 shadow-sm hover:shadow-error/30 cursor-pointer group">
              <span className="material-symbols-outlined text-[18px] group-hover:animate-pulse" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
              Protocol
            </button>
            <div className="h-6 w-px bg-outline-variant/50 hidden md:block mx-1"></div>
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-label-md text-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer group transform hover:-translate-y-0.5">
              <span>Sign In</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
          
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 w-full"></div>

      <main className="flex-grow w-full max-w-[1440px] mx-auto">
        {children}
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
        <div className="w-full py-xl px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-sm col-span-1 md:col-span-2 lg:col-span-1">
            <span className="text-label-md font-label-md font-bold text-primary mb-md block">AMR Clinical Portal</span>
            <p className="text-body-sm font-body-sm text-on-surface-variant">© 2024 AMR Awareness Initiative. Professional Clinical Resource.</p>
          </div>
          
          <div className="flex flex-col gap-sm">
            <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="#">Medical Disclaimer</a>
            <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="#">Privacy Policy</a>
          </div>
          
          <div className="flex flex-col gap-sm">
            <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="#">Terms of Service</a>
            <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="#">Contact Support</a>
          </div>
          
          <div className="flex flex-col gap-sm">
            <a className="text-body-sm font-body-sm text-on-surface-variant hover:text-secondary transition-opacity duration-200" href="#">WHO Guidelines</a>
          </div>
        </div>
      </footer>
    </>
  );
}

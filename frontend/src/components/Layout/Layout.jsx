import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <>
      {/* Floating Pill Navbar Wrapper */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-margin-mobile pointer-events-none">
        <nav className="pointer-events-auto bg-[#1a1a1a] text-white rounded-full flex items-center justify-between p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 w-full max-w-[800px]">
          
          {/* Logo */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 cursor-pointer group">
            <span className="material-symbols-outlined text-[#1a1a1a] text-xl group-hover:rotate-12 transition-transform" style={{fontVariationSettings: "'FILL' 0"}}>public</span>
          </div>
          
          {/* Links */}
          <div className="hidden sm:flex items-center gap-6 px-6">
            {[
              { path: '/', label: 'Home' },
              { path: '/assessment', label: 'Assessment' },
              { path: '/learn', label: 'Learn' }
            ].map(item => (
              <NavLink 
                key={item.path}
                to={item.path} 
                className={({isActive}) => `
                  font-medium text-sm transition-colors hover:text-white/80
                  ${isActive ? 'text-white font-semibold' : 'text-white/60'}
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Action Button */}
          <button className="bg-white text-[#1a1a1a] px-5 py-2.5 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors shadow-sm cursor-pointer shrink-0">
            Sign In
          </button>
        </nav>
      </div>

      {/* Spacer to push content down since navbar is fixed */}
      <div className="h-24 w-full"></div>

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

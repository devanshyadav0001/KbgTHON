import React, { useEffect, useState, useRef } from 'react';

export default function Landing() {
  const [height, setHeight] = useState('100vh');
  const iframeRef = useRef(null);

  useEffect(() => {
    // Basic dynamic height adjustment
    const handleResize = () => {
      setHeight(window.innerHeight + 'px');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync theme
  useEffect(() => {
    const syncTheme = () => {
      try {
        if (iframeRef.current && iframeRef.current.contentDocument) {
          const iframeDoc = iframeRef.current.contentDocument;
          const isDark = document.documentElement.classList.contains('dark');
          if (isDark) {
            iframeDoc.documentElement.classList.add('dark');
          } else {
            iframeDoc.documentElement.classList.remove('dark');
          }
        }
      } catch (e) {
        console.error("Could not sync theme to iframe", e);
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', syncTheme);
    }
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          syncTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      if (iframe) iframe.removeEventListener('load', syncTheme);
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe 
        ref={iframeRef}
        src="/amr-landing.html" 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Landing Page"
      />
    </div>
  );
}

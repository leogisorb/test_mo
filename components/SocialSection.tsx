'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from './LanguageProvider';
import { getContent, getText } from '@/lib/content';

export function SocialSection() {
  const { language } = useLanguage();
  const content = getContent();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Tagembed script with error handling
    const script = document.createElement('script');
    script.src = 'https://widget.tagembed.com/embed.min.js';
    script.type = 'text/javascript';
    script.async = true;

    // Add error handler to suppress 404 errors
    script.onerror = () => {
      console.warn('Tagembed widget could not be loaded. This is usually harmless.');
      // Optionally hide the widget container if script fails
      if (widgetRef.current) {
        widgetRef.current.style.display = 'none';
      }
    };

    // Check if script is already loaded
    if (!document.querySelector('script[src="https://widget.tagembed.com/embed.min.js"]')) {
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup: remove script if component unmounts
      const existingScript = document.querySelector('script[src="https://widget.tagembed.com/embed.min.js"]');
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className="section bg-gray-50">
      <div className="w-[85%] mx-auto">
          <h2 className="section-title flex items-center gap-3">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{getText(content.social.title, language)}</span>
          </h2>
          <div 
            ref={widgetRef}
            className="tagembed-widget" 
            style={{ width: '100%', height: '100%', overflow: 'auto' }}
            data-widget-id="311635"
            data-website="1"
          />
      </div>
    </section>
  );
}

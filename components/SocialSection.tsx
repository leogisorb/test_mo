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
      <div className="container">
        <div className="w-[85%] mx-auto">
          <h2 className="section-title">
            {getText(content.social.title, language)}
          </h2>
          <div 
            ref={widgetRef}
            className="tagembed-widget" 
            style={{ width: '100%', height: '100%', overflow: 'auto' }}
            data-widget-id="311635"
            data-website="1"
          />
        </div>
      </div>
    </section>
  );
}

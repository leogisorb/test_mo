'use client';

import { useLanguage } from './LanguageProvider';
import { getContent, getText } from '@/lib/content';

export function IntroSection() {
  const { language } = useLanguage();
  const content = getContent();

  return (
    <section id="about" className="section bg-white">
      <div className="w-[85%] mx-auto">
          <h2 className="section-title">
            {getText(content.intro.title, language)}
          </h2>
          {content.intro.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base md:text-lg lg:text-xl text-text mb-6 leading-relaxed"
            >
              {getText(paragraph, language)}
            </p>
          ))}
      </div>
    </section>
  );
}


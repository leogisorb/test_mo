'use client';

import { useLanguage } from './LanguageProvider';
import { getContent, getText, getAssetPath } from '@/lib/content';

export function IntroSection() {
  const { language } = useLanguage();
  const content = getContent();

  return (
    <section id="about" className="section bg-white">
      <div className="w-[85%] mx-auto">
          <h2 className="section-title flex items-center gap-3">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{getText(content.intro.title, language)}</span>
          </h2>
          
          {content.intro.aboutMe && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-8">
              {/* Image - Left on desktop, top on mobile */}
              <div className="order-2 md:order-1">
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={getAssetPath('/assets/images/mohamed-salah.jpg')}
                    alt={language === 'de' ? 'Mohamed Salah - Tauchlehrer' : language === 'ru' ? 'Мохамед Салах - инструктор по дайвингу' : language === 'ar' ? 'محمد صلاح - مدرب غوص' : language === 'en' ? 'Mohamed Salah - Diving Instructor' : 'Mohamed Salah - Instructeur de plongée'}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Text - Right on desktop, bottom on mobile */}
              <div className="order-1 md:order-2">
                <div className="text-base md:text-lg lg:text-xl text-text leading-relaxed whitespace-pre-line">
                  {getText(content.intro.aboutMe, language)}
                </div>
              </div>
            </div>
          )}
          
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


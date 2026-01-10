'use client';

import { useLanguage } from './LanguageProvider';
import { getContent, getText, getNavPath } from '@/lib/content';

export function CoursesSection() {
  const { language } = useLanguage();
  const content = getContent();

  const goToCoursesPage = () => {
    window.location.href = getNavPath('/courses');
  };

  return (
    <section id="courses" className="section bg-maritime-light-medium">
        <div className="w-[85%] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-6 md:mb-12 gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-left flex-1">
              {getText(content.courses.title, language)}
            </h2>
            <button
              onClick={goToCoursesPage}
              className="bg-primary-button text-white px-6 py-3 font-semibold text-base hover:bg-primary-hover transition-colors rounded-lg flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
            >
              <span>{language === 'de' ? 'Zur detaillierten Kursübersicht' : language === 'ru' ? 'К детальному обзору курсов' : language === 'en' ? 'To Detailed Course Overview' : 'Vers l\'aperçu détaillé des cours'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="text-base md:text-lg lg:text-xl text-text mb-6">
            {getText(content.courses.description, language)}
          </p>
      </div>
    </section>
  );
}


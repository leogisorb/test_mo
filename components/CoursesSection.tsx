'use client';

import { useLanguage } from './LanguageProvider';
import { getContent, getText } from '@/lib/content';

export function CoursesSection() {
  const { language } = useLanguage();
  const content = getContent();

  const goToCoursesPage = () => {
    window.location.href = '/courses';
  };

  return (
    <section id="courses" className="section bg-gray-50">
      <div className="w-[85%] mx-auto">
          <h2 className="section-title flex items-center gap-3">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{getText(content.courses.title, language)}</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-text mb-6">
            {getText(content.courses.description, language)}
          </p>
          <button
            onClick={goToCoursesPage}
            className="bg-primary-button text-white px-8 py-4 font-semibold text-lg hover:bg-primary-hover transition-colors rounded-lg flex items-center gap-2"
          >
            <span>{language === 'de' ? 'Zur detaillierten Kursübersicht' : language === 'ru' ? 'К детальному обзору курсов' : language === 'ar' ? 'إلى نظرة عامة مفصلة على الدورات' : language === 'en' ? 'To Detailed Course Overview' : 'Vers l\'aperçu détaillé des cours'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
      </div>
    </section>
  );
}


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
      <div className="container">
        <div className="w-[85%] mx-auto">
          <h2 className="section-title">
            {getText(content.courses.title, language)}
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
      </div>
    </section>
  );
}


'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageProvider';
import { getContent, getText } from '@/lib/content';
import { 
  languageToCurrency, 
  getExchangeRates, 
  convertPrice, 
  formatPrice,
  type Currency 
} from '@/lib/currency';

import type { Course, TranslatedText } from '@/types/content';

export function CoursesPage() {
  const { language } = useLanguage();
  const content = getContent();
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['daily', 'padi', 'specialty']));
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['daily']));
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>({
    EUR: 1,
    USD: 1.08,
    RUB: 100,
    EGP: 50,
  });
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});

  const currency = languageToCurrency[language] || 'EUR';

  const sections = content.courses.sections ? [
    {
      id: 'daily',
      title: content.courses.sections.daily.title,
      courses: content.courses.sections.daily.courses,
      additionalInfo: content.courses.sections.daily.additionalInfo,
    },
    {
      id: 'padi',
      title: content.courses.sections.padi.title,
      courses: content.courses.sections.padi.courses,
      additionalInfo: content.courses.sections.padi.additionalInfo,
    },
    {
      id: 'specialty',
      title: content.courses.sections.specialty.title,
      courses: content.courses.sections.specialty.courses,
      additionalInfo: content.courses.sections.specialty.additionalInfo,
    },
  ] : [];

  useEffect(() => {
    getExchangeRates().then(setExchangeRates);
  }, []);

  useEffect(() => {
    const containers = Object.values(scrollContainerRefs.current).filter(Boolean) as HTMLDivElement[];
    
    const handleScroll = (container: HTMLDivElement, sectionId: string) => {
      setScrollPositions((prev) => ({
        ...prev,
        [sectionId]: container.scrollLeft,
      }));
    };

    const listeners: Array<() => void> = [];
    
    containers.forEach((container) => {
      const sectionId = Object.keys(scrollContainerRefs.current).find(
        key => scrollContainerRefs.current[key] === container
      );
      if (!sectionId) return;
      
      const listener = () => handleScroll(container, sectionId);
      container.addEventListener('scroll', listener);
      listeners.push(() => container.removeEventListener('scroll', listener));
    });

    return () => {
      listeners.forEach(cleanup => cleanup());
    };
  }, [expandedSections]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(sectionRefs.current).forEach((sectionId) => {
      const ref = sectionRefs.current[sectionId];
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => {
                const newSet = new Set(prev);
                newSet.add(sectionId);
                return newSet;
              });
            }
          });
        },
        {
          threshold: [0, 0.1, 0.3, 0.5],
          rootMargin: '-50px 0px -200px 0px',
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const calculatePrice = (basePriceInEUR: number) => {
    const originalPriceInEUR = basePriceInEUR * 1.05; // +5% Aufschlag
    const originalPrice = convertPrice(originalPriceInEUR, currency, exchangeRates);
    const discountedPrice = convertPrice(basePriceInEUR, currency, exchangeRates);
    return {
      original: Math.round(originalPrice),
      discounted: Math.round(discountedPrice),
    };
  };

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  const renderCourseCard = (course: Course, sectionId: string, maxTitleHeight: number, maxDescHeight: number) => {
    const isExpanded = expandedCourses.has(course.id);
    const isVisible = visibleSections.has(sectionId);
    const maxDays = Math.max(...content.courses.sections!.daily.courses.map(c => c.days), ...content.courses.sections!.padi.courses.map(c => c.days), ...content.courses.sections!.specialty.courses.map(c => c.days));
    const maxDives = Math.max(...content.courses.sections!.daily.courses.map(c => c.dives), ...content.courses.sections!.padi.courses.map(c => c.dives), ...content.courses.sections!.specialty.courses.map(c => c.dives));

    const daysPercentage = (course.days / maxDays) * 100;
    const divesPercentage = (course.dives / maxDives) * 100;

    return (
      <div
        key={course.id}
        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 h-full flex flex-col ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 
                className="text-xl md:text-2xl font-bold text-primary mb-2 flex items-start"
                style={{ minHeight: `${maxTitleHeight}rem` }}
              >
                {getText(course.name, language)}
              </h3>
              <p 
                className="text-gray-600 text-sm md:text-base mb-3"
                style={{ minHeight: `${maxDescHeight}rem` }}
              >
                {getText(course.shortDescription, language)}
              </p>
            </div>
            <button
              onClick={() => toggleCourse(course.id)}
              className="ml-4 p-2 text-primary hover:bg-primary/10 rounded-full transition-colors flex-shrink-0"
              aria-label={isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
            >
              <svg
                className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Price with Original Price Strikethrough - Fixed Position */}
          <div className="mb-4 min-h-[3.5rem] flex items-center">
            <div className="flex items-center gap-3">
              <span className="text-base text-gray-500 line-through">
                {formatPrice(calculatePrice(course.price).original, currency)}
              </span>
              <span className="text-2xl md:text-3xl font-bold text-primary">
                {formatPrice(calculatePrice(course.price).discounted, currency)}
              </span>
            </div>
          </div>

          {/* Indicators with animated bars - Fixed Position */}
          <div className="space-y-3 mb-4 min-h-[5rem]">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-gray-700">
                  {language === 'de' ? 'Tage' : language === 'ru' ? 'Дни' : language === 'ar' ? 'أيام' : language === 'en' ? 'Days' : 'Jours'}
                </span>
                <span className="text-xs font-bold text-primary">{course.days}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-1000"
                  style={{ width: `${daysPercentage}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-gray-700">
                  {language === 'de' ? 'Tauchgänge' : language === 'ru' ? 'Погружения' : language === 'ar' ? 'غطسات' : language === 'en' ? 'Dives' : 'Plongées'}
                </span>
                <span className="text-xs font-bold text-primary">{course.dives}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-1000"
                  style={{ width: `${divesPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Expandable content */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-700 mb-4 leading-relaxed">
                {getText(course.fullDescription, language)}
              </p>
              <div>
                <h4 className="text-sm font-bold text-primary mb-2">
                  {language === 'de' ? 'Enthalten:' : language === 'ru' ? 'Включено:' : language === 'ar' ? 'مشمول:' : language === 'en' ? 'Includes:' : 'Inclus:'}
                </h4>
                <ul className="space-y-1">
                  {(course.includes[language as keyof typeof course.includes] || []).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={scrollToContact}
                className="mt-6 w-full bg-primary-button text-white px-6 py-3 font-semibold text-base hover:bg-primary-hover transition-colors rounded-lg"
              >
                {language === 'de' ? 'Anfragen' : language === 'ru' ? 'Запросить' : language === 'ar' ? 'استفسر' : language === 'en' ? 'Inquire' : 'Demander'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!content.courses.sections) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-[85%] mx-auto py-[6.6rem] md:py-[9.9rem]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 text-left flex items-center gap-3">
          <svg className="w-10 h-10 md:w-12 md:h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>{getText(content.courses.title, language)}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 text-left">
          {getText(content.courses.description, language)}
        </p>

        {sections.map((section, sectionIndex) => {
          const isVisible = visibleSections.has(section.id);
          const prevSectionVisible = sectionIndex === 0 || visibleSections.has(sections[sectionIndex - 1].id);
          const isSectionExpanded = expandedSections.has(section.id);
          
          // Calculate max heights for this section
          const maxTitleHeight = Math.max(...section.courses.map(c => {
            const titleText = getText(c.name, language);
            // Estimate: ~40 chars per line for title, ~1.8rem per line
            const estimatedLines = Math.ceil(titleText.length / 40);
            return Math.max(estimatedLines * 1.8, 3);
          }));
          
          const maxDescHeight = Math.max(...section.courses.map(c => {
            const descText = getText(c.shortDescription, language);
            // Estimate: ~50 chars per line for description, ~1.5rem per line
            const estimatedLines = Math.ceil(descText.length / 50);
            return Math.max(estimatedLines * 1.5, 3);
          }));

          return (
            <div
              key={section.id}
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
              className={`transition-all duration-1000 ${
                isSectionExpanded ? 'mb-20 md:mb-32' : 'mb-5 md:mb-8'
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : prevSectionVisible
                  ? 'opacity-50 translate-y-5'
                  : 'opacity-20 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-primary text-left flex items-center gap-3">
                  {section.id === 'daily' && (
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  )}
                  {section.id === 'padi' && (
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {section.id === 'specialty' && (
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                  <span>{getText(section.title, language)}</span>
                </h2>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                  aria-label={isSectionExpanded ? 'Einklappen' : 'Ausklappen'}
                >
                  <svg
                    className={`w-6 h-6 transition-transform ${isSectionExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isSectionExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="relative">
                  <div
                    ref={(el) => {
                      scrollContainerRefs.current[section.id] = el;
                    }}
                    className="flex gap-6 md:gap-8 overflow-x-auto overflow-y-hidden pb-4 hide-scrollbar"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch',
                      touchAction: 'pan-x',
                      overscrollBehaviorX: 'contain',
                      cursor: 'grab',
                    }}
                    onMouseDown={(e) => {
                      const container = scrollContainerRefs.current[section.id];
                      if (!container) return;
                      const startX = e.pageX - container.offsetLeft;
                      const scrollLeft = container.scrollLeft;
                      const isDown = true;

                      const handleMouseMove = (e: MouseEvent) => {
                        if (!isDown) return;
                        e.preventDefault();
                        const x = e.pageX - container.offsetLeft;
                        const walk = (x - startX) * 2;
                        container.scrollLeft = scrollLeft - walk;
                      };

                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };

                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  >
                    {section.courses.map((course: Course) => (
                      <div key={course.id} className="flex-shrink-0 w-[90%] md:w-[45%] lg:w-[30%] flex">
                        {renderCourseCard(course, section.id, maxTitleHeight, maxDescHeight)}
                      </div>
                    ))}
                  </div>
                  {/* Scroll Indicators */}
                  <div className="flex justify-center gap-2 mt-4">
                    {section.courses.map((_, index) => {
                      const container = scrollContainerRefs.current[section.id];
                      const cardWidth = container ? container.scrollWidth / section.courses.length : 0;
                      const scrollPosition = scrollPositions[section.id] || 0;
                      const currentIndex = container && cardWidth > 0 ? Math.round(scrollPosition / cardWidth) : 0;
                      const isActive = index === currentIndex;
                      
                      return (
                        <div
                          key={index}
                          className={`h-2 rounded-full transition-all ${
                            isActive ? 'bg-primary w-6' : 'bg-primary/30 w-2'
                          }`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Additional Information for Daily Courses */}
                  {section.additionalInfo && section.id === 'daily' && (
                    <div className="mt-6 pt-6 border-t border-gray-300">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-bold text-primary mb-3">
                          {language === 'de' ? 'Zusätzliche Informationen' : language === 'ru' ? 'Дополнительная информация' : language === 'ar' ? 'معلومات إضافية' : language === 'en' ? 'Additional Information' : 'Informations supplémentaires'}
                        </h3>
                        <ul className="space-y-2">
                          {section.additionalInfo[language as keyof typeof section.additionalInfo]?.map((info: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{info}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Transfer Information for PADI and Specialty Courses */}
                  {content.courses.transferInfo && (section.id === 'padi' || section.id === 'specialty') && (
                    <div className="mt-6 pt-6 border-t border-gray-300">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-bold text-primary mb-3">
                          {language === 'de' ? 'Transfer-Informationen' : language === 'ru' ? 'Информация о трансфере' : language === 'ar' ? 'معلومات النقل' : language === 'en' ? 'Transfer Information' : 'Informations de transfert'}
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {getText(content.courses.transferInfo, language)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}


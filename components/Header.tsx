'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import { getContent, getText, getNavPath } from '@/lib/content';
import type { Language } from '@/types/content';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const content = getContent();
  const isCoursesPage = pathname === '/courses';
  const isMainPage = pathname === '/';

  const scrollToSection = (id: string) => {
    if (id === 'courses') {
      window.location.href = getNavPath('/courses');
      setMobileMenuOpen(false);
      return;
    }
    // If we're on courses page, navigate to main page first
    if (pathname !== '/') {
      window.location.href = getNavPath(`/#${id}`);
      setMobileMenuOpen(false);
      return;
    }
    // On main page, scroll to section
    if (id === 'contact') {
        const element = document.getElementById('contact');
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLanguage = content.languages.find((lang) => lang.code === language);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.99) 8%, rgba(255, 255, 255, 0.97) 15%, rgba(255, 255, 255, 0.94) 22%, rgba(255, 255, 255, 0.91) 28%, rgba(255, 255, 255, 0.87) 34%, rgba(255, 255, 255, 0.82) 40%, rgba(255, 255, 255, 0.76) 46%, rgba(255, 255, 255, 0.69) 52%, rgba(255, 255, 255, 0.61) 58%, rgba(255, 255, 255, 0.52) 64%, rgba(255, 255, 255, 0.43) 70%, rgba(255, 255, 255, 0.34) 76%, rgba(255, 255, 255, 0.26) 82%, rgba(255, 255, 255, 0.19) 88%, rgba(255, 255, 255, 0.13) 94%, rgba(255, 255, 255, 0.08) 97%, rgba(255, 255, 255, 0.05) 99%, rgba(255, 255, 255, 0.03) 99.5%, rgba(255, 255, 255, 0.01) 99.8%, rgba(255, 255, 255, 0) 100%)' }}>
      <nav className="w-full px-4 md:px-8 lg:px-12">
        <div className="w-[90%] mx-auto flex items-center justify-between gap-4 py-5 md:py-6">
          <ul
            className={`fixed md:static top-16 left-0 w-full md:w-auto h-[calc(100vh-4rem)] md:h-auto bg-white md:bg-transparent flex-col md:flex-row items-center justify-start md:justify-center gap-8 md:gap-6 pt-12 md:pt-0 transition-transform duration-300 ${
              mobileMenuOpen ? 'flex' : 'hidden md:flex'
            }`}
          >
            {!isMainPage && (
              <li>
                <button
                  onClick={() => {
                    window.location.href = getNavPath('/');
                    setMobileMenuOpen(false);
                  }}
                  className="text-text hover:text-primary transition-colors font-medium md:font-bold text-[17px] md:text-sm xl:text-base flex items-center gap-2"
                >
                  <svg className="w-[17px] h-[17px] md:w-4 md:h-4 xl:w-[18px] xl:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>{language === 'de' ? 'Home' : language === 'ru' ? 'Главная' : language === 'ar' ? 'الرئيسية' : language === 'en' ? 'Home' : 'Accueil'}</span>
                </button>
              </li>
            )}
            {content.navigation.items
              .filter((item) => item.id !== 'about') // "Über mich" entfernen
              .map((item) => {
                // Icons für verschiedene Navigation Items
                const getIcon = () => {
                  switch (item.id) {
                    case 'courses':
                      return (
                        <svg className="w-[17px] h-[17px] md:w-4 md:h-4 xl:w-[18px] xl:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      );
                    case 'prices':
                      return (
                        <svg className="w-[17px] h-[17px] md:w-4 md:h-4 xl:w-[18px] xl:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      );
                    case 'contact':
                      return (
                        <svg className="w-[17px] h-[17px] md:w-4 md:h-4 xl:w-[18px] xl:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      );
                    default:
                      return null;
                  }
                };

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-text hover:text-primary transition-colors font-medium md:font-bold text-[17px] md:text-sm xl:text-base flex items-center gap-2"
                    >
                      {getIcon()}
                      <span>{getText(item.label, language)}</span>
                    </button>
                  </li>
                );
              })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded border border-primary bg-transparent hover:bg-primary/5 text-primary text-[15px] md:text-sm xl:text-base transition-colors"
                aria-label="Sprache ändern"
              >
                {currentLanguage && (
                  <span className="font-semibold">{currentLanguage.code.toUpperCase()}</span>
                )}
                <svg
                  className={`w-[17px] h-[17px] md:w-4 md:h-4 xl:w-[18px] xl:h-[18px] transition-transform text-primary ${
                    languageDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {languageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {content.languages
                    .filter((lang) => lang.code !== language)
                    .map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as Language);
                          setLanguageDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-[15px] md:text-sm xl:text-base hover:bg-gray-100 transition-colors text-left"
                      >
                        <span className="font-semibold">{lang.code.toUpperCase()}</span>
                        <span className="text-gray-500 ml-auto">{lang.name}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1 p-2"
              aria-label="Menü öffnen"
            >
              <span
                className={`w-6 h-0.5 bg-text transition-all ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-text transition-all ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-text transition-all ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}


'use client';

import { useLanguage } from './LanguageProvider';
import { getContent, getText, getAssetPath, getNavPath } from '@/lib/content';

export function Hero() {
  const { language } = useLanguage();
  const content = getContent();

  const scrollToSection = (id: string) => {
    if (id === 'courses') {
      window.location.href = getNavPath('/courses');
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={getAssetPath(content.hero.video.src)} type="video/mp4" />
          <source src={getAssetPath(content.hero.video.fallback)} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 text-left w-[85%] mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-8">
          {getText(content.hero.title, language)}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-white text-primary px-8 py-4 font-semibold text-lg hover:bg-gray-100 transition-colors rounded-[20px]"
            style={{ borderRadius: '20px' }}
          >
            {getText(content.hero.cta.contact, language)}
          </button>
          <button
            onClick={() => scrollToSection('courses')}
            className="bg-transparent border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-primary transition-colors rounded-[20px]"
            style={{ borderRadius: '20px' }}
          >
            {getText(content.hero.cta.courses, language)}
          </button>
        </div>
      </div>
    </section>
  );
}


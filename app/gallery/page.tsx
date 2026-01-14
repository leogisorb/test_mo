'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { getAssetPath } from '@/lib/content';

export default function GalleryPage() {
  const { language } = useLanguage();

  const translations = {
    title: {
      de: 'Galerie',
      ru: 'Галерея',
      en: 'Gallery',
      fr: 'Galerie',
    },
    comingSoon: {
      de: 'Diese Seite wird gerade gebaut',
      ru: 'Эта страница находится в разработке',
      en: 'This page is currently being built',
      fr: 'Cette page est en cours de construction',
    },
    backToHome: {
      de: 'Zurück zur Startseite',
      ru: 'Вернуться на главную',
      en: 'Back to Home',
      fr: 'Retour à l\'accueil',
    },
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <img
            src={getAssetPath('/logo_v2.svg')}
            alt="Tauchwelt Hurghada Logo"
            className="h-24 md:h-32 lg:h-40 w-auto mx-auto mb-8"
            width={320}
            height={320}
            loading="eager"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            {translations.title[language]}
          </h1>
          <p className="text-lg md:text-xl text-text/80 mb-8">
            {translations.comingSoon[language]}
          </p>
          <Link
            href="/"
            className="inline-block bg-maritime-medium text-white px-8 py-4 font-semibold text-lg hover:bg-maritime-medium-dark transition-colors rounded-lg"
          >
            {translations.backToHome[language]}
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

'use client';

import { useLanguage } from './LanguageProvider';
import Head from 'next/head';

export function DynamicMetaTags() {
  const { language } = useLanguage();

  const metaTags = {
    de: {
      title: 'Tauchschule Hurghada | Deutscher Tauchlehrer | Tauchen Ägypten | PADI Kurse',
      description: 'Professionelle Tauchschule in Hurghada, Ägypten. Deutscher Tauchlehrer, PADI-zertifizierte Tauchkurse für Anfänger und Fortgeschrittene. Tauchen im Roten Meer für Deutsche. Tauchausbildung, Tauchabenteuer, Tauchreisen. Jetzt buchen!',
      keywords: 'Tauchschule Hurghada, Tauchlehrer Hurghada, Tauchen Ägypten, Deutscher Tauchlehrer, PADI Kurse, Tauchausbildung, Tauchreisen, Rotes Meer, Tauchurlaub, Tauchabenteuer, Tauchschule für Deutsche, Tauchlehrer Deutsch, Tauchen für Deutsche, PADI Zertifizierung, Tauchkurse Hurghada, Tauchschule Rotes Meer',
    },
    en: {
      title: 'Diving School Hurghada | German Diving Instructor | Diving Egypt | PADI Courses',
      description: 'Professional diving school in Hurghada, Egypt. German diving instructor, PADI-certified diving courses for beginners and advanced. Diving in the Red Sea. Diving training, diving adventures, diving trips. Book now!',
      keywords: 'diving school Hurghada, diving instructor Hurghada, diving Egypt, German diving instructor, PADI courses, diving training, diving trips, Red Sea, diving holiday, diving adventures, diving school for Germans, German speaking instructor, diving for Germans, PADI certification, diving courses Hurghada, diving school Red Sea, scuba diving Egypt, learn to dive Egypt',
    },
    ru: {
      title: 'Дайвинг школа Хургада | Немецкий инструктор | Дайвинг Египет | Курсы PADI',
      description: 'Профессиональная дайвинг школа в Хургаде, Египет. Немецкий инструктор по дайвингу, сертифицированные курсы PADI для начинающих и продвинутых. Дайвинг в Красном море. Обучение дайвингу, приключения, дайвинг туры. Забронируйте сейчас!',
      keywords: 'дайвинг школа Хургада, инструктор по дайвингу Хургада, дайвинг Египет, немецкий инструктор, курсы PADI, обучение дайвингу, дайвинг туры, Красное море, дайвинг отпуск, приключения дайвинг, дайвинг школа для немцев, немецкоязычный инструктор, дайвинг для немцев, сертификация PADI, курсы дайвинга Хургада, дайвинг школа Красное море, подводное плавание Египет',
    },
    fr: {
      title: 'École de plongée Hurghada | Moniteur de plongée allemand | Plongée Égypte | Cours PADI',
      description: 'École de plongée professionnelle à Hurghada, Égypte. Moniteur de plongée allemand, cours de plongée certifiés PADI pour débutants et avancés. Plongée en mer Rouge. Formation plongée, aventures de plongée, voyages de plongée. Réservez maintenant!',
      keywords: 'école de plongée Hurghada, moniteur de plongée Hurghada, plongée Égypte, moniteur de plongée allemand, cours PADI, formation plongée, voyages de plongée, mer Rouge, vacances plongée, aventures de plongée, école de plongée pour Allemands, moniteur germanophone, plongée pour Allemands, certification PADI, cours de plongée Hurghada, école de plongée mer Rouge, plongée sous-marine Égypte',
    },
  };

  const currentMeta = metaTags[language];

  return (
    <>
      <title>{currentMeta.title}</title>
      <meta name="description" content={currentMeta.description} />
      <meta name="keywords" content={currentMeta.keywords} />
      <meta property="og:title" content={currentMeta.title} />
      <meta property="og:description" content={currentMeta.description} />
      <meta property="og:locale" content={language === 'de' ? 'de_DE' : language === 'en' ? 'en_US' : language === 'ru' ? 'ru_RU' : 'fr_FR'} />
    </>
  );
}

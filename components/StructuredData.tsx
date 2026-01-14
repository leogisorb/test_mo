'use client';

import { useLanguage } from './LanguageProvider';
import { useEffect, useState } from 'react';

export function StructuredData() {
  const [language, setLanguage] = useState<'de' | 'en' | 'ru' | 'fr'>('de');
  
  // Try to get language from context, with fallback
  let contextLanguage: 'de' | 'en' | 'ru' | 'fr' | null = null;
  try {
    const context = useLanguage();
    contextLanguage = context?.language || null;
  } catch {
    // Not in LanguageProvider context, will use fallback
  }

  useEffect(() => {
    if (contextLanguage) {
      setLanguage(contextLanguage);
    } else if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferred-language') as 'de' | 'en' | 'ru' | 'fr';
      if (savedLang && ['de', 'en', 'ru', 'fr'].includes(savedLang)) {
        setLanguage(savedLang);
      }
    }
  }, [contextLanguage]);

  const schoolData = {
    de: {
      name: 'Tauchwelt Hurghada - Tauchschule für Deutsche in Ägypten',
      description: 'Professionelle Tauchschule in Hurghada, Ägypten. Deutscher Tauchlehrer, PADI-zertifizierte Tauchkurse für Anfänger und Fortgeschrittene. Tauchen im Roten Meer. Tauchausbildung, Tauchabenteuer, Tauchreisen für Deutsche.',
    },
    en: {
      name: 'Diving World Hurghada - Diving School for Germans in Egypt',
      description: 'Professional diving school in Hurghada, Egypt. German diving instructor, PADI-certified diving courses for beginners and advanced. Diving in the Red Sea. Diving training, diving adventures, diving trips for Germans.',
    },
    ru: {
      name: 'Мир дайвинга Хургады - Дайвинг школа для немцев в Египте',
      description: 'Профессиональная дайвинг школа в Хургаде, Египет. Немецкий инструктор по дайвингу, сертифицированные курсы PADI для начинающих и продвинутых. Дайвинг в Красном море. Обучение дайвингу, приключения, дайвинг туры для немцев.',
    },
    fr: {
      name: 'Monde de la plongée Hurghada - École de plongée pour Allemands en Égypte',
      description: 'École de plongée professionnelle à Hurghada, Égypte. Moniteur de plongée allemand, cours de plongée certifiés PADI pour débutants et avancés. Plongée en mer Rouge. Formation plongée, aventures de plongée, voyages de plongée pour Allemands.',
    },
  };

  const currentSchool = schoolData[language];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DivingSchool',
    name: currentSchool.name,
    description: currentSchool.description,
    url: 'https://tauchwelthurghada.com',
    logo: 'https://tauchwelthurghada.com/logo_v2.png',
    image: 'https://tauchwelthurghada.com/logo_v2.png',
    telephone: '+201007077738',
    email: 'info@tauchwelthurghada.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Old Port',
      addressLocality: 'Hurghada',
      addressRegion: 'Red Sea',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.23463',
      longitude: '33.84846',
    },
    priceRange: '$$',
    currenciesAccepted: 'EUR, USD, EGP',
    paymentAccepted: 'Cash, Credit Card',
    openingHours: 'Mo-Su 08:00-18:00',
    areaServed: {
      '@type': 'City',
      name: 'Hurghada',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tauchkurse',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'PADI Open Water Diver',
            description: 'PADI Open Water Diver Kurs für Anfänger',
            provider: {
              '@type': 'Organization',
              name: 'Tauchwelt Hurghada',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'PADI Advanced Open Water Diver',
            description: 'PADI Advanced Open Water Diver Kurs',
            provider: {
              '@type': 'Organization',
              name: 'Tauchwelt Hurghada',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'PADI Rescue Diver',
            description: 'PADI Rescue Diver Kurs',
            provider: {
              '@type': 'Organization',
              name: 'Tauchwelt Hurghada',
            },
          },
        },
      ],
    },
    sameAs: [
      // Social Media Links können hier hinzugefügt werden
      // 'https://www.facebook.com/tauchwelthurghada',
      // 'https://www.instagram.com/tauchwelthurghada',
    ],
  };

  const instructorDescriptions = {
    de: 'Deutscher Tauchlehrer in Hurghada, Ägypten. PADI und SSI zertifiziert. Über 20 Jahre Erfahrung im Roten Meer.',
    en: 'German diving instructor in Hurghada, Egypt. PADI and SSI certified. Over 20 years of experience in the Red Sea.',
    ru: 'Немецкий инструктор по дайвингу в Хургаде, Египет. Сертифицирован PADI и SSI. Более 20 лет опыта в Красном море.',
    fr: 'Moniteur de plongée allemand à Hurghada, Égypte. Certifié PADI et SSI. Plus de 20 ans d\'expérience en mer Rouge.',
  };

  const instructorJobTitles = {
    de: 'Tauchlehrer / Diving Instructor',
    en: 'Diving Instructor / Tauchlehrer',
    ru: 'Инструктор по дайвингу',
    fr: 'Moniteur de plongée',
  };

  const knowsAbout = {
    de: ['Tauchen', 'Tauchausbildung', 'PADI Kurse', 'Tauchlehrer', 'Rotes Meer', 'Hurghada', 'Ägypten', 'Scuba Diving', 'Diving School', 'Diving Instructor'],
    en: ['Diving', 'Diving Training', 'PADI Courses', 'Diving Instructor', 'Red Sea', 'Hurghada', 'Egypt', 'Scuba Diving', 'Diving School', 'Learn to Dive'],
    ru: ['Дайвинг', 'Обучение дайвингу', 'Курсы PADI', 'Инструктор по дайвингу', 'Красное море', 'Хургада', 'Египет', 'Подводное плавание', 'Дайвинг школа'],
    fr: ['Plongée', 'Formation plongée', 'Cours PADI', 'Moniteur de plongée', 'Mer Rouge', 'Hurghada', 'Égypte', 'Plongée sous-marine', 'École de plongée'],
  };

  const instructorData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohamed Salah',
    jobTitle: instructorJobTitles[language],
    description: instructorDescriptions[language],
    knowsAbout: knowsAbout[language],
    alumniOf: {
      '@type': 'Organization',
      name: 'PADI',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Tauchwelt Hurghada',
    },
  };

  const faqData = {
    de: [
      {
        question: 'Wie finde ich eine gute Tauchschule in Hurghada?',
        answer: 'Tauchwelt Hurghada ist eine professionelle Tauchschule mit deutschsprachigem Tauchlehrer. Wir sind seit 2004 in Hurghada tätig und bieten PADI-zertifizierte Tauchkurse für Anfänger und Fortgeschrittene. Unsere Tauchlehrer sind erfahren und sprechen Deutsch.',
      },
      {
        question: 'Welche Tauchkurse werden in Hurghada angeboten?',
        answer: 'Wir bieten PADI Open Water Diver, Advanced Open Water Diver, Rescue Diver und viele weitere Spezialkurse an. Alle Kurse werden von zertifizierten Tauchlehrern auf Deutsch unterrichtet.',
      },
      {
        question: 'Brauche ich Erfahrung zum Tauchen in Hurghada?',
        answer: 'Nein, wir bieten Tauchkurse für Anfänger an. Unser PADI Open Water Diver Kurs ist perfekt für Einsteiger. Unsere deutschsprachigen Tauchlehrer begleiten Sie bei Ihren ersten Tauchgängen im Roten Meer.',
      },
      {
        question: 'Ist Tauchen im Roten Meer sicher?',
        answer: 'Ja, das Rote Meer ist ein sehr sicheres Tauchgebiet. Unsere Tauchlehrer haben über 20 Jahre Erfahrung und sind als Emergency First Responder und Oxygen Provider zertifiziert. Sicherheit hat für uns oberste Priorität.',
      },
      {
        question: 'Sprechen die Tauchlehrer in Hurghada Deutsch?',
        answer: 'Ja, bei Tauchwelt Hurghada arbeiten deutschsprachige Tauchlehrer. Alle Tauchkurse können auf Deutsch absolviert werden.',
      },
    ],
    en: [
      {
        question: 'How do I find a good diving school in Hurghada?',
        answer: 'Diving World Hurghada is a professional diving school with a German-speaking diving instructor. We have been operating in Hurghada since 2004 and offer PADI-certified diving courses for beginners and advanced divers. Our diving instructors are experienced and speak German.',
      },
      {
        question: 'What diving courses are offered in Hurghada?',
        answer: 'We offer PADI Open Water Diver, Advanced Open Water Diver, Rescue Diver and many other specialty courses. All courses are taught by certified diving instructors in German.',
      },
      {
        question: 'Do I need experience to dive in Hurghada?',
        answer: 'No, we offer diving courses for beginners. Our PADI Open Water Diver course is perfect for beginners. Our German-speaking diving instructors will accompany you on your first dives in the Red Sea.',
      },
      {
        question: 'Is diving in the Red Sea safe?',
        answer: 'Yes, the Red Sea is a very safe diving area. Our diving instructors have over 20 years of experience and are certified as Emergency First Responders and Oxygen Providers. Safety is our top priority.',
      },
      {
        question: 'Do the diving instructors in Hurghada speak German?',
        answer: 'Yes, German-speaking diving instructors work at Diving World Hurghada. All diving courses can be completed in German.',
      },
    ],
    ru: [
      {
        question: 'Как найти хорошую дайвинг школу в Хургаде?',
        answer: 'Мир дайвинга Хургады - это профессиональная дайвинг школа с немецкоязычным инструктором. Мы работаем в Хургаде с 2004 года и предлагаем сертифицированные курсы PADI для начинающих и продвинутых дайверов. Наши инструкторы опытны и говорят по-немецки.',
      },
      {
        question: 'Какие курсы дайвинга предлагаются в Хургаде?',
        answer: 'Мы предлагаем PADI Open Water Diver, Advanced Open Water Diver, Rescue Diver и многие другие специализированные курсы. Все курсы преподаются сертифицированными инструкторами на немецком языке.',
      },
      {
        question: 'Нужен ли опыт для дайвинга в Хургаде?',
        answer: 'Нет, мы предлагаем курсы дайвинга для начинающих. Наш курс PADI Open Water Diver идеально подходит для новичков. Наши немецкоязычные инструкторы сопроводят вас на ваших первых погружениях в Красном море.',
      },
      {
        question: 'Безопасен ли дайвинг в Красном море?',
        answer: 'Да, Красное море - очень безопасный район для дайвинга. Наши инструкторы имеют более 20 лет опыта и сертифицированы как Emergency First Responder и Oxygen Provider. Безопасность - наш главный приоритет.',
      },
      {
        question: 'Говорят ли инструкторы по дайвингу в Хургаде по-немецки?',
        answer: 'Да, в Мире дайвинга Хургады работают немецкоязычные инструкторы. Все курсы дайвинга могут быть пройдены на немецком языке.',
      },
    ],
    fr: [
      {
        question: 'Comment trouver une bonne école de plongée à Hurghada?',
        answer: 'Monde de la plongée Hurghada est une école de plongée professionnelle avec un moniteur de plongée germanophone. Nous opérons à Hurghada depuis 2004 et proposons des cours de plongée certifiés PADI pour débutants et plongeurs avancés. Nos moniteurs de plongée sont expérimentés et parlent allemand.',
      },
      {
        question: 'Quels cours de plongée sont proposés à Hurghada?',
        answer: 'Nous proposons PADI Open Water Diver, Advanced Open Water Diver, Rescue Diver et de nombreux autres cours spécialisés. Tous les cours sont enseignés par des moniteurs de plongée certifiés en allemand.',
      },
      {
        question: 'Ai-je besoin d\'expérience pour plonger à Hurghada?',
        answer: 'Non, nous proposons des cours de plongée pour débutants. Notre cours PADI Open Water Diver est parfait pour les débutants. Nos moniteurs de plongée germanophones vous accompagneront lors de vos premières plongées en mer Rouge.',
      },
      {
        question: 'La plongée en mer Rouge est-elle sûre?',
        answer: 'Oui, la mer Rouge est une zone de plongée très sûre. Nos moniteurs de plongée ont plus de 20 ans d\'expérience et sont certifiés Emergency First Responder et Oxygen Provider. La sécurité est notre priorité absolue.',
      },
      {
        question: 'Les moniteurs de plongée à Hurghada parlent-ils allemand?',
        answer: 'Oui, des moniteurs de plongée germanophones travaillent au Monde de la plongée Hurghada. Tous les cours de plongée peuvent être suivis en allemand.',
      },
    ],
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData[language].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(instructorData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
}

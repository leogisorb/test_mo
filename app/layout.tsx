import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import { BookingProvider } from '@/components/BookingProvider';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://tauchwelthurghada.com'),
  title: 'Tauchschule Hurghada | Tauchlehrer | Tauchen Ägypten | PADI Kurse | Deutsch',
  description: 'Professionelle Tauchschule in Hurghada, Ägypten. Deutscher Tauchlehrer, PADI-zertifizierte Tauchkurse für Anfänger und Fortgeschrittene. Tauchen im Roten Meer für Deutsche. Tauchausbildung, Tauchabenteuer, Tauchreisen. Jetzt buchen!',
  keywords: [
    'Tauchschule Hurghada', 'Tauchlehrer Hurghada', 'Tauchen Hurghada', 'Tauchen Ägypten', 'Tauchen Rotes Meer',
    'PADI Kurse Ägypten', 'PADI Zertifizierung', 'Tauchausbildung Ägypten', 'Tauchkurse Hurghada',
    'Deutscher Tauchlehrer', 'Tauchlehrer Deutsch', 'Tauchschule Deutsch', 'Tauchen für Deutsche',
    'Tauchschule Deutschland', 'Tauchreisen Ägypten', 'Tauchurlaub Hurghada', 'Tauchabenteuer Ägypten',
    'PADI Open Water', 'PADI Advanced', 'PADI Rescue Diver', 'Tauchkurs Anfänger', 'Tauchkurs Fortgeschrittene',
    'Rotes Meer Tauchen', 'Hurghada Tauchen', 'Ägypten Tauchen', 'Tauchschule Rotes Meer',
    'Tauchlehrer Ägypten', 'Tauchausbildung Hurghada', 'Tauchschule PADI', 'SSI Tauchschule',
    'Tauchschule für Deutsche', 'Deutschsprachiger Tauchlehrer', 'Tauchschule deutsch', 'Tauchen deutschland',
    'Tauchreise Ägypten', 'Tauchurlaub Ägypten', 'Tauchschule online buchen', 'Tauchkurs buchen'
  ],
  authors: [{ name: 'Tauchwelt Hurghada' }],
  creator: 'Tauchwelt Hurghada',
  publisher: 'Tauchwelt Hurghada',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Tauchschule Hurghada | Deutscher Tauchlehrer | Tauchen Ägypten | PADI Kurse',
    description: 'Professionelle Tauchschule in Hurghada, Ägypten. Deutscher Tauchlehrer, PADI-zertifizierte Tauchkurse für Anfänger und Fortgeschrittene. Tauchen im Roten Meer für Deutsche. Tauchausbildung, Tauchabenteuer, Tauchreisen.',
    url: 'https://tauchwelthurghada.com',
    siteName: 'Tauchwelt Hurghada',
    images: [
      {
        url: '/logo_v2.png',
        width: 856,
        height: 852,
        alt: 'Tauchwelt Hurghada Logo - Tauchschule für Deutsche in Ägypten',
      },
    ],
    locale: 'de_DE',
    type: 'website',
    alternateLocale: ['en_US', 'ru_RU', 'fr_FR'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tauchschule Hurghada | Deutscher Tauchlehrer | Tauchen Ägypten | PADI Kurse',
    description: 'Professionelle Tauchschule in Hurghada, Ägypten. Deutscher Tauchlehrer, PADI-zertifizierte Tauchkurse. Tauchen im Roten Meer für Deutsche.',
    images: ['/logo_v2.png'],
  },
  alternates: {
    canonical: 'https://tauchwelthurghada.com',
    languages: {
      'de': 'https://tauchwelthurghada.com/?lang=de',
      'en': 'https://tauchwelthurghada.com/?lang=en',
      'ru': 'https://tauchwelthurghada.com/?lang=ru',
      'fr': 'https://tauchwelthurghada.com/?lang=fr',
    },
  },
  verification: {
    // Google Search Console Verification Code - wird später hinzugefügt
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/zcs0fuj.css" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress Tagembed widget 404 errors
              (function() {
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                  const url = args[0];
                  if (typeof url === 'string' && url.includes('tagembed.com')) {
                    return originalFetch.apply(this, args).catch(function(error) {
                      // Silently ignore tagembed fetch errors
                      console.warn('Tagembed API request failed (this is usually harmless)');
                      return Promise.reject(error);
                    });
                  }
                  return originalFetch.apply(this, args);
                };
              })();
            `,
          }}
        />
        <StructuredData />
        <LanguageProvider>
          <BookingProvider>
            {children}
            <WhatsAppButton />
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


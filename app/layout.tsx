import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import { BookingProvider } from '@/components/BookingProvider';

export const metadata: Metadata = {
  title: 'Tauchwelt Hurghada - Professionelle Tauchschule',
  description: 'Professionelle Tauchschule in Hurghada, Ägypten. Tauchkurse, PADI-Zertifizierung und unvergessliche Tauchabenteuer im Roten Meer.',
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
        <link rel="icon" href="/favicon.ico" />
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
        <LanguageProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


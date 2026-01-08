import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <img
            src="/logo-white.svg"
            alt="Tauchwelt Hurghada Logo"
            className="h-24 md:h-32 lg:h-40 w-auto mx-auto mb-8"
          />
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-lg text-text/80 mb-8">
            Die von Ihnen gesuchte Seite existiert leider nicht.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary-button text-white px-8 py-4 font-semibold text-lg hover:bg-primary-hover transition-colors rounded-lg"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

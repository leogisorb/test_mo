'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { IntroSection } from '@/components/IntroSection';
import { SocialSection } from '@/components/SocialSection';
import { PricesSection } from '@/components/PricesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <IntroSection />
      <PricesSection />
      <SocialSection />
      <ContactSection />
      <Footer />
    </main>
  );
}


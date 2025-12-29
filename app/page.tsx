'use client';

import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { IntroSection } from '@/components/IntroSection';
import { SocialSection } from '@/components/SocialSection';
import { PricesSection } from '@/components/PricesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Handle hash navigation when page loads
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1); // Remove #
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure page is rendered
    }
  }, []);

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


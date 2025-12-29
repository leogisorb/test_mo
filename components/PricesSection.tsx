'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageProvider';
import { useBooking } from './BookingProvider';
import { getContent, getText } from '@/lib/content';
import { 
  languageToCurrency, 
  getExchangeRates, 
  convertPrice, 
  formatPrice,
  type Currency 
} from '@/lib/currency';
import { getAssetPath, getNavPath } from '@/lib/content';

export function PricesSection() {
  const { language } = useLanguage();
  const { setBookingData } = useBooking();
  const content = getContent();
  const [selectedDays, setSelectedDays] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState('owd');
  const [selectedSpecialty, setSelectedSpecialty] = useState('nitrox');
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>({
    EUR: 1,
    USD: 1.08,
    RUB: 100,
    EGP: 50,
  });

  const currency = languageToCurrency[language] || 'EUR';

  useEffect(() => {
    getExchangeRates().then(setExchangeRates);
  }, []);

  const calculatePrice = useMemo(() => {
    return (basePriceInEUR: number) => {
      const originalPriceInEUR = basePriceInEUR * 1.05; // +5% Aufschlag
      const originalPrice = convertPrice(originalPriceInEUR, currency, exchangeRates);
      const discountedPrice = convertPrice(basePriceInEUR, currency, exchangeRates);
      return {
        original: Math.round(originalPrice),
        discounted: Math.round(discountedPrice),
      };
    };
  }, [currency, exchangeRates]);

  const dailyPrice = useMemo(() => {
    const option = content.prices.dailyDiving.options.find(opt => opt.value === selectedDays);
    return option ? calculatePrice(option.price) : { original: 0, discounted: 0 };
  }, [selectedDays, content.prices.dailyDiving, calculatePrice]);

  const coursePrice = useMemo(() => {
    const option = content.prices.courses.options.find(opt => opt.value === selectedCourse);
    return option ? calculatePrice(option.price) : { original: 0, discounted: 0 };
  }, [selectedCourse, content.prices.courses, calculatePrice]);

  const specialtyPrice = useMemo(() => {
    const option = content.prices.specialty.options.find(opt => opt.value === selectedSpecialty);
    return option ? calculatePrice(option.price) : { original: 0, discounted: 0 };
  }, [selectedSpecialty, content.prices.specialty, calculatePrice]);

  const getReachValue = (cardId: string) => {
    if (cardId === 'daily') return selectedDays;
    if (cardId === 'courses') {
      const courseMap: Record<string, number> = { owd: 4, aowd: 3, rescue: 3, divemaster: 5 };
      return courseMap[selectedCourse] || 3;
    }
    return 2;
  };

  const getMaxReach = (cardId: string) => {
    if (cardId === 'daily') return 10;
    if (cardId === 'courses') return 5;
    return 3;
  };

  const cards = [
    {
      id: 'daily',
      title: content.prices.dailyDiving.title,
      image: getAssetPath('/assets/images/dive-price-1.jpg'),
      price: dailyPrice,
      selectLabel: content.prices.dailyDiving.selectLabel,
      options: content.prices.dailyDiving.options,
      selectedValue: selectedDays,
      onChange: (value: number) => setSelectedDays(value),
      features: content.prices.dailyDiving.features,
      contentDetails: content.prices.dailyDiving.contentDetails,
      reachLabel: content.prices.dailyDiving.reachLabel,
      services: content.prices.dailyDiving.services,
    },
    {
      id: 'courses',
      title: content.prices.courses.title,
      image: getAssetPath('/assets/images/dive-price-2.jpg'),
      price: coursePrice,
      selectLabel: content.prices.courses.selectLabel,
      options: content.prices.courses.options,
      selectedValue: selectedCourse,
      onChange: (value: string) => setSelectedCourse(value),
      features: content.prices.courses.features,
      contentDetails: content.prices.courses.contentDetails,
      reachLabel: content.prices.courses.reachLabel,
      services: content.prices.courses.services,
    },
    {
      id: 'specialty',
      title: content.prices.specialty.title,
      image: getAssetPath('/assets/images/dive-price-3.jpg'),
      price: specialtyPrice,
      selectLabel: content.prices.specialty.selectLabel,
      options: content.prices.specialty.options,
      selectedValue: selectedSpecialty,
      onChange: (value: string) => setSelectedSpecialty(value),
      features: content.prices.specialty.features,
      contentDetails: content.prices.specialty.contentDetails,
      reachLabel: content.prices.specialty.reachLabel,
      services: content.prices.specialty.services,
    },
  ];

  return (
    <section id="prices" className="section bg-primary py-16 md:py-24">
      <div className="container">
        <div className="w-[85%] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16 gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-left">
              {getText(content.prices.title, language)}
            </h2>
            <button
              onClick={() => window.location.href = getNavPath('/courses')}
              className="bg-white text-primary px-6 py-3 font-semibold text-base hover:bg-gray-100 transition-colors rounded-lg flex items-center gap-2 whitespace-nowrap"
            >
              <span>{language === 'de' ? 'Zur detaillierten Kursübersicht' : language === 'ru' ? 'К детальному обзору курсов' : language === 'ar' ? 'إلى نظرة عامة مفصلة على الدورات' : language === 'en' ? 'To Detailed Course Overview' : 'Vers l\'aperçu détaillé des cours'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {cards.map((card) => {
            const reachValue = getReachValue(card.id);
            const maxReach = getMaxReach(card.id);
            const reachPercentage = (reachValue / maxReach) * 100;

            return (
              <div
                key={card.id}
                className="bg-white rounded-xl overflow-hidden shadow-xl flex flex-col h-full"
                style={{ minHeight: '75%' }}
              >
                {/* Image - Full Width */}
                <div className="w-full h-28 md:h-36 relative">
                  <img
                    src={card.image}
                    alt={getText(card.title, language)}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.background = 'linear-gradient(135deg, #0077B6, #00B4D8)';
                    }}
                  />
                </div>

                <div className="p-4 md:p-6 flex flex-col flex-grow pt-2 md:pt-3">

                {/* Title - Fixed height to prevent shifting */}
                <h3 className="text-lg md:text-xl font-bold text-primary text-center mb-4 uppercase min-h-[3rem] flex items-center justify-center -mt-2 md:-mt-3">
                  {getText(card.title, language)}
                </h3>

                {/* Select Dropdown */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    {getText(card.selectLabel, language)}
                  </label>
                  <div className="relative">
                    <select
                      value={card.selectedValue}
                      onChange={(e) => {
                        if (card.id === 'daily') {
                          (card.onChange as (value: number) => void)(Number(e.target.value));
                        } else {
                          (card.onChange as (value: string) => void)(e.target.value);
                        }
                      }}
                      className="w-full border border-primary rounded-lg p-3 pr-10 text-base bg-white text-gray-800 cursor-pointer hover:border-primary focus:outline-none focus:border-primary appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231d334a' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        paddingRight: '2.5rem'
                      }}
                    >
                      {card.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {getText(option.label, language)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price with Original Price Strikethrough */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-base text-gray-500 line-through">
                      {formatPrice(card.price.original, currency)}
                    </span>
                    <span className="text-3xl md:text-4xl font-bold text-black">
                      {formatPrice(card.price.discounted, currency)}
                    </span>
                  </div>
                </div>

                {/* Features Pills */}
                <div className="mb-4">
                  <div className="bg-primary text-white px-3 py-1.5 rounded-full text-xs font-medium text-center">
                    {getText(card.features, language)}
                  </div>
                </div>

                {/* Content Details */}
                <div className="mb-4 space-y-1">
                  {card.contentDetails[language as keyof typeof card.contentDetails].map((detail: string, idx: number) => (
                    <div key={idx} className="text-xs text-gray-700">
                      {detail}
                    </div>
                  ))}
                </div>

                {/* Reach Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-800">
                      {card.id === 'daily' ? `${reachValue} Tage` : getText(card.reachLabel, language)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${reachPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4 space-y-2 flex-grow">
                  {card.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      {service.icon === 'check' && (
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {service.icon === 'info' && (
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="text-gray-700">{getText(service.label, language)}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => {
                    // Save booking data
                    if (card.id === 'daily') {
                      setBookingData({ dailyDays: selectedDays });
                    } else if (card.id === 'courses') {
                      setBookingData({ course: selectedCourse });
                    } else if (card.id === 'specialty') {
                      setBookingData({ specialty: selectedSpecialty });
                    }
                    // Scroll to contact section
                    const contactElement = document.getElementById('contact');
                    if (contactElement) {
                      const headerOffset = 80;
                      const elementPosition = contactElement.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="mt-auto border-2 border-black rounded-lg py-2 px-4 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors"
                >
                  {getText({ de: 'Jetzt buchen', ru: 'Забронировать сейчас', ar: 'احجز الآن', en: 'Book Now', fr: 'Réserver maintenant' }, language)}
                </button>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect, useMemo } from 'react';
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

export function ContactSection() {
  const { language } = useLanguage();
  const { bookingData, setBookingData } = useBooking();
  const content = getContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Booking state
  const [persons, setPersons] = useState(1);
  const [dailyDays, setDailyDays] = useState(bookingData?.dailyDays || 1);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(bookingData?.course ? [bookingData.course] : []);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(bookingData?.specialty ? [bookingData.specialty] : []);
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

  // Initialize from booking data
  useEffect(() => {
    if (bookingData) {
      if (bookingData.dailyDays) setDailyDays(bookingData.dailyDays);
      if (bookingData.course) setSelectedCourses([bookingData.course]);
      if (bookingData.specialty) setSelectedSpecialties([bookingData.specialty]);
      if (bookingData.selectedSpecialties) setSelectedSpecialties(bookingData.selectedSpecialties);
    }
  }, [bookingData]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    let total = 0;
    
    // Daily diving price
    if (dailyDays > 0) {
      const dailyOption = content.prices.dailyDiving.options.find(opt => opt.value === dailyDays);
      if (dailyOption) {
        total += dailyOption.price * persons;
      }
    }
    
    // Course prices
    selectedCourses.forEach(courseId => {
      const courseOption = content.prices.courses.options.find(opt => opt.value === courseId);
      if (courseOption) {
        total += courseOption.price * persons;
      }
    });
    
    // Specialty prices
    selectedSpecialties.forEach(specialtyId => {
      const specialtyOption = content.prices.specialty.options.find(opt => opt.value === specialtyId);
      if (specialtyOption) {
        total += specialtyOption.price * persons;
      }
    });
    
    return total;
  }, [dailyDays, selectedCourses, selectedSpecialties, persons, content.prices]);

  // Generate message text
  const generateMessageText = () => {
    const parts: string[] = [];
    
    if (dailyDays > 0) {
      const dailyLabel = content.prices.dailyDiving.options.find(opt => opt.value === dailyDays)?.label;
      if (dailyLabel) {
        parts.push(`${getText(dailyLabel, language)} (${persons} ${language === 'de' ? 'Person(en)' : language === 'ru' ? 'человек(а)' : language === 'ar' ? 'شخص(أشخاص)' : language === 'en' ? 'person(s)' : 'personne(s)'})`);
      }
    }
    
    if (selectedCourses.length > 0) {
      const courseLabels = selectedCourses.map(courseId => {
        const course = content.prices.courses.options.find(opt => opt.value === courseId);
        return course ? getText(course.label, language) : courseId;
      });
      parts.push(`${language === 'de' ? 'Tauchkurse' : language === 'ru' ? 'Курсы дайвинга' : language === 'ar' ? 'دورات الغوص' : language === 'en' ? 'Diving Courses' : 'Cours de plongée'}: ${courseLabels.join(', ')}`);
    }
    
    if (selectedSpecialties.length > 0) {
      const specialtyLabels = selectedSpecialties.map(specialtyId => {
        const specialty = content.prices.specialty.options.find(opt => opt.value === specialtyId);
        return specialty ? getText(specialty.label, language) : specialtyId;
      });
      parts.push(`${language === 'de' ? 'Spezialkurse' : language === 'ru' ? 'Специализированные курсы' : language === 'ar' ? 'دورات متخصصة' : language === 'en' ? 'Specialty Courses' : 'Cours spécialisés'}: ${specialtyLabels.join(', ')}`);
    }
    
    return parts.join('\n\n');
  };

  // Update message when selections change
  useEffect(() => {
    const messageText = generateMessageText();
    if (messageText) {
      setFormData(prev => ({ ...prev, message: messageText }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyDays, selectedCourses, selectedSpecialties, persons, language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = language === 'de' ? 'Name ist erforderlich' : 
                       language === 'ru' ? 'Имя обязательно' :
                       language === 'ar' ? 'الاسم مطلوب' :
                       language === 'en' ? 'Name is required' : 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'de' ? 'E-Mail ist erforderlich' : 
                        language === 'ru' ? 'Email обязателен' :
                        language === 'ar' ? 'البريد الإلكتروني مطلوب' :
                        language === 'en' ? 'Email is required' : 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'de' ? 'Ungültige E-Mail-Adresse' : 
                        language === 'ru' ? 'Неверный адрес электронной почты' :
                        language === 'ar' ? 'عنوان بريد إلكتروني غير صالح' :
                        language === 'en' ? 'Invalid email address' : 'Adresse email invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setBookingData(null);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const toggleSpecialty = (specialtyId: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialtyId) 
        ? prev.filter(id => id !== specialtyId)
        : [...prev, specialtyId]
    );
  };

  const calculatePrice = (basePriceInEUR: number) => {
    const originalPriceInEUR = basePriceInEUR * 1.05;
    const originalPrice = convertPrice(originalPriceInEUR, currency, exchangeRates);
    const discountedPrice = convertPrice(basePriceInEUR, currency, exchangeRates);
    return {
      original: Math.round(originalPrice),
      discounted: Math.round(discountedPrice),
    };
  };

  const finalPrice = calculatePrice(totalPrice);

  return (
    <section id="contact" className="section bg-gray-50 py-16 md:py-24">
      <div className="container">
        <div className="w-[85%] lg:w-[90%] xl:w-[95%] 2xl:max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-12 text-left">
            {getText(content.footer.contact.title, language)}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Large Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                  {language === 'de' ? 'Kontaktieren Sie uns' : 
                   language === 'ru' ? 'Свяжитесь с нами' :
                   language === 'ar' ? 'اتصل بنا' :
                   language === 'en' ? 'Contact Us' : 'Contactez-nous'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'de' ? 'Name' : language === 'ru' ? 'Имя' : language === 'ar' ? 'الاسم' : language === 'en' ? 'Name' : 'Nom'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'de' ? 'E-Mail' : language === 'ru' ? 'Email' : language === 'ar' ? 'البريد الإلكتروني' : language === 'en' ? 'Email' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'de' ? 'Betreff' : language === 'ru' ? 'Тема' : language === 'ar' ? 'الموضوع' : language === 'en' ? 'Subject' : 'Sujet'}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'de' ? 'Nachricht' : language === 'ru' ? 'Сообщение' : language === 'ar' ? 'الرسالة' : language === 'en' ? 'Message' : 'Message'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-button text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting 
                      ? (language === 'de' ? 'Wird gesendet...' : language === 'ru' ? 'Отправка...' : language === 'ar' ? 'جاري الإرسال...' : language === 'en' ? 'Sending...' : 'Envoi...')
                      : (language === 'de' ? 'Absenden' : language === 'ru' ? 'Отправить' : language === 'ar' ? 'إرسال' : language === 'en' ? 'Submit' : 'Envoyer')
                    }
                  </button>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                      {language === 'de' ? 'Nachricht erfolgreich gesendet!' : language === 'ru' ? 'Сообщение успешно отправлено!' : language === 'ar' ? 'تم إرسال الرسالة بنجاح!' : language === 'en' ? 'Message sent successfully!' : 'Message envoyé avec succès!'}
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {language === 'de' ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.' : language === 'ru' ? 'Ошибка при отправке. Пожалуйста, попробуйте снова.' : language === 'ar' ? 'خطأ في الإرسال. يرجى المحاولة مرة أخرى.' : language === 'en' ? 'Error sending message. Please try again.' : 'Erreur lors de l\'envoi. Veuillez réessayer.'}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right: 3 Cards */}
            <div className="space-y-6">
              {/* Card 1: Persons & Daily Courses */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-primary mb-4">
                  {language === 'de' ? 'Personen & Tageskurse' : language === 'ru' ? 'Люди и дневные курсы' : language === 'ar' ? 'الأشخاص والدورات اليومية' : language === 'en' ? 'Persons & Daily Courses' : 'Personnes et cours quotidiens'}
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'de' ? 'Anzahl Personen' : language === 'ru' ? 'Количество человек' : language === 'ar' ? 'عدد الأشخاص' : language === 'en' ? 'Number of Persons' : 'Nombre de personnes'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={persons}
                      onChange={(e) => setPersons(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {getText(content.prices.dailyDiving.selectLabel, language)}
                    </label>
                    <select
                      value={dailyDays}
                      onChange={(e) => setDailyDays(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {content.prices.dailyDiving.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {getText(option.label, language)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Card 2: Courses & Specialties */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-primary mb-4">
                  {language === 'de' ? 'Kurse & Spezialkurse' : language === 'ru' ? 'Курсы и специализации' : language === 'ar' ? 'الدورات والدورات المتخصصة' : language === 'en' ? 'Courses & Specialties' : 'Cours et spécialités'}
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {getText(content.prices.courses.title, language)}
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {content.prices.courses.options.map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCourses.includes(option.value as string)}
                            onChange={() => toggleCourse(option.value as string)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm">{getText(option.label, language)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {getText(content.prices.specialty.title, language)}
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {content.prices.specialty.options.map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSpecialties.includes(option.value as string)}
                            onChange={() => toggleSpecialty(option.value as string)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm">{getText(option.label, language)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Price */}
              <div className="bg-primary text-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold mb-4">
                  {language === 'de' ? 'Gesamtpreis' : language === 'ru' ? 'Общая цена' : language === 'ar' ? 'السعر الإجمالي' : language === 'en' ? 'Total Price' : 'Prix total'}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 line-through">
                      {formatPrice(finalPrice.original, currency)}
                    </span>
                    <span className="text-3xl font-bold">
                      {formatPrice(finalPrice.discounted, currency)}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 mt-4">
                    {language === 'de' ? `für ${persons} ${persons === 1 ? 'Person' : 'Personen'}` : 
                     language === 'ru' ? `для ${persons} ${persons === 1 ? 'человека' : 'человек'}` :
                     language === 'ar' ? `لـ ${persons} ${persons === 1 ? 'شخص' : 'أشخاص'}` :
                     language === 'en' ? `for ${persons} ${persons === 1 ? 'person' : 'persons'}` :
                     `pour ${persons} ${persons === 1 ? 'personne' : 'personnes'}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

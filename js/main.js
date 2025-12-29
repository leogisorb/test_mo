// ============================================
// Price Configuration
// ============================================

const priceConfig = {
    diving: {
        basePrices: {
            1: 50,
            2: 95,
            3: 140,
            5: 225,
            10: 400
        },
        discount: 0.10 // 10% discount
    },
    padi: {
        basePrices: {
            'open-water': 450,
            'advanced': 350,
            'rescue': 400,
            'divemaster': 800
        },
        discount: 0.10 // 10% discount
    }
};

// ============================================
// Language Configuration
// ============================================

const translations = {
    de: {
        'hero.title': 'Willkommen in der Tauchwelt Hurghada',
        'intro.title': 'Willkommen in unserer Tauchwelt',
        'intro.text': 'Tauchen Sie ein in die faszinierende Unterwasserwelt des Roten Meeres. In Hurghada bieten wir Ihnen professionelle Tauchkurse und unvergessliche Tauchabenteuer. Unsere Leidenschaft fürs Tauchen und unsere jahrelange Erfahrung garantieren Ihnen ein sicheres und aufregendes Erlebnis unter Wasser.',
        'intro.text2': 'Wir sind stolz darauf, eine der führenden Tauchschulen in Hurghada zu sein und freuen uns darauf, Ihnen die Schönheit der Unterwasserwelt zu zeigen. Ob Sie Anfänger oder erfahrener Taucher sind – bei uns finden Sie das perfekte Angebot für Ihr nächstes Tauchabenteuer.',
        'social.title': 'Unsere Tauchabenteuer',
        'prices.title': 'Preise & Angebote',
        'prices.diving.title': 'Diving Prices',
        'prices.diving.select': 'Anzahl Tauchtage:',
        'prices.diving.days.1': '1 Tag',
        'prices.diving.days.2': '2 Tage',
        'prices.diving.days.3': '3 Tage',
        'prices.diving.days.5': '5 Tage',
        'prices.diving.days.10': '10 Tage',
        'prices.padi.title': 'PADI Diving Kurse',
        'prices.padi.select': 'Kurs auswählen:',
        'prices.padi.courses.openwater': 'Open Water Diver',
        'prices.padi.courses.advanced': 'Advanced Open Water',
        'prices.padi.courses.rescue': 'Rescue Diver',
        'prices.padi.courses.divemaster': 'Divemaster',
        'courses.title': 'Unsere Tauchkurse',
        'courses.text': 'Entdecken Sie unsere vielfältigen Tauchkurse, die für jedes Niveau geeignet sind.',
        'footer.contact': 'Kontakt',
        'footer.email': 'E-Mail: info@tauchwelt-hurghada.com',
        'footer.phone': 'Telefon: +20 123 456 7890',
        'footer.location': 'Standort',
        'footer.social': 'Folgen Sie uns',
        'footer.copyright': '© 2024 Tauchwelt Hurghada. Alle Rechte vorbehalten.'
    },
    en: {
        'hero.title': 'Welcome to Diving World Hurghada',
        'intro.title': 'Welcome to Our Diving World',
        'intro.text': 'Dive into the fascinating underwater world of the Red Sea. In Hurghada, we offer you professional diving courses and unforgettable diving adventures. Our passion for diving and years of experience guarantee you a safe and exciting experience underwater.',
        'intro.text2': 'We are proud to be one of the leading dive schools in Hurghada and look forward to showing you the beauty of the underwater world. Whether you are a beginner or an experienced diver – you will find the perfect offer for your next diving adventure with us.',
        'social.title': 'Our Diving Adventures',
        'prices.title': 'Prices & Offers',
        'prices.diving.title': 'Diving Prices',
        'prices.diving.select': 'Number of diving days:',
        'prices.diving.days.1': '1 Day',
        'prices.diving.days.2': '2 Days',
        'prices.diving.days.3': '3 Days',
        'prices.diving.days.5': '5 Days',
        'prices.diving.days.10': '10 Days',
        'prices.padi.title': 'PADI Diving Courses',
        'prices.padi.select': 'Select course:',
        'prices.padi.courses.openwater': 'Open Water Diver',
        'prices.padi.courses.advanced': 'Advanced Open Water',
        'prices.padi.courses.rescue': 'Rescue Diver',
        'prices.padi.courses.divemaster': 'Divemaster',
        'courses.title': 'Our Diving Courses',
        'courses.text': 'Discover our diverse diving courses, suitable for every level.',
        'footer.contact': 'Contact',
        'footer.email': 'Email: info@tauchwelt-hurghada.com',
        'footer.phone': 'Phone: +20 123 456 7890',
        'footer.location': 'Location',
        'footer.social': 'Follow Us',
        'footer.copyright': '© 2024 Diving World Hurghada. All rights reserved.'
    },
    ar: {
        'hero.title': 'مرحباً بكم في عالم الغوص في الغردقة',
        'intro.title': 'مرحباً بكم في عالم الغوص',
        'intro.text': 'انغمس في عالم تحت الماء الرائع للبحر الأحمر. في الغردقة، نقدم لك دورات غوص احترافية ومغامرات غوص لا تُنسى. شغفنا بالغوص وسنوات خبرتنا تضمن لك تجربة آمنة ومثيرة تحت الماء.',
        'intro.text2': 'نفتخر بأننا من بين مدارس الغوص الرائدة في الغردقة ونتطلع إلى إظهار جمال العالم تحت الماء. سواء كنت مبتدئاً أو غواصاً محترفاً – ستجد العرض المثالي لمغامرة الغوص التالية معنا.',
        'social.title': 'مغامراتنا في الغوص',
        'prices.title': 'الأسعار والعروض',
        'prices.diving.title': 'أسعار الغوص',
        'prices.diving.select': 'عدد أيام الغوص:',
        'prices.diving.days.1': 'يوم واحد',
        'prices.diving.days.2': 'يومان',
        'prices.diving.days.3': '3 أيام',
        'prices.diving.days.5': '5 أيام',
        'prices.diving.days.10': '10 أيام',
        'prices.padi.title': 'دورات PADI للغوص',
        'prices.padi.select': 'اختر الدورة:',
        'prices.padi.courses.openwater': 'Open Water Diver',
        'prices.padi.courses.advanced': 'Advanced Open Water',
        'prices.padi.courses.rescue': 'Rescue Diver',
        'prices.padi.courses.divemaster': 'Divemaster',
        'courses.title': 'دوراتنا في الغوص',
        'courses.text': 'اكتشف دورات الغوص المتنوعة لدينا، المناسبة لكل مستوى.',
        'footer.contact': 'اتصل بنا',
        'footer.email': 'البريد الإلكتروني: info@tauchwelt-hurghada.com',
        'footer.phone': 'الهاتف: +20 123 456 7890',
        'footer.location': 'الموقع',
        'footer.social': 'تابعنا',
        'footer.copyright': '© 2024 عالم الغوص في الغردقة. جميع الحقوق محفوظة.'
    }
};

// ============================================
// Price Calculation Functions
// ============================================

function calculateDivingPrice(days) {
    const basePrice = priceConfig.diving.basePrices[days] || 0;
    const discount = priceConfig.diving.discount;
    const discountedPrice = basePrice * (1 - discount);
    
    return {
        original: basePrice,
        discounted: discountedPrice
    };
}

function calculatePADIPrice(course) {
    const basePrice = priceConfig.padi.basePrices[course] || 0;
    const discount = priceConfig.padi.discount;
    const discountedPrice = basePrice * (1 - discount);
    
    return {
        original: basePrice,
        discounted: discountedPrice
    };
}

function updateDivingPrice() {
    const daysSelect = document.getElementById('diving-days');
    const oldPriceEl = document.getElementById('diving-old-price');
    const newPriceEl = document.getElementById('diving-new-price');
    
    if (!daysSelect || !oldPriceEl || !newPriceEl) return;
    
    const days = parseInt(daysSelect.value);
    const prices = calculateDivingPrice(days);
    
    oldPriceEl.textContent = `€${prices.original.toFixed(2)}`;
    newPriceEl.textContent = `€${prices.discounted.toFixed(2)}`;
}

function updatePADIPrice() {
    const courseSelect = document.getElementById('padi-course');
    const oldPriceEl = document.getElementById('padi-old-price');
    const newPriceEl = document.getElementById('padi-new-price');
    
    if (!courseSelect || !oldPriceEl || !newPriceEl) return;
    
    const course = courseSelect.value;
    const prices = calculatePADIPrice(course);
    
    oldPriceEl.textContent = `€${prices.original.toFixed(2)}`;
    newPriceEl.textContent = `€${prices.discounted.toFixed(2)}`;
}

// ============================================
// Language Functions
// ============================================

function setLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update option texts
    updateSelectOptions(lang);
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Store language preference
    localStorage.setItem('preferred-language', lang);
}

function updateSelectOptions(lang) {
    // Update diving days select
    const divingSelect = document.getElementById('diving-days');
    if (divingSelect && translations[lang]) {
        Array.from(divingSelect.options).forEach(option => {
            const key = option.getAttribute('data-i18n');
            if (key && translations[lang][key]) {
                option.textContent = translations[lang][key];
            }
        });
    }
    
    // Update PADI course select
    const padiSelect = document.getElementById('padi-course');
    if (padiSelect && translations[lang]) {
        Array.from(padiSelect.options).forEach(option => {
            const key = option.getAttribute('data-i18n');
            if (key && translations[lang][key]) {
                option.textContent = translations[lang][key];
            }
        });
    }
}

// ============================================
// Mobile Menu Toggle
// ============================================

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// ============================================
// Smooth Scroll for Navigation Links
// ============================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Image Fallback for Social Grid
// ============================================

function initImageFallbacks() {
    const images = document.querySelectorAll('.social-image');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder gradient background
            this.style.background = 'linear-gradient(135deg, #0066cc, #00a8cc)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Tauchbild';
        });
    });
}

// ============================================
// Initialize Everything
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize price calculations
    updateDivingPrice();
    updatePADIPrice();
    
    // Add event listeners for price updates
    const divingSelect = document.getElementById('diving-days');
    const padiSelect = document.getElementById('padi-course');
    
    if (divingSelect) {
        divingSelect.addEventListener('change', updateDivingPrice);
    }
    
    if (padiSelect) {
        padiSelect.addEventListener('change', updatePADIPrice);
    }
    
    // Initialize language selector
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'de';
    setLanguage(savedLang);
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize image fallbacks
    initImageFallbacks();
    
    // Update prices when language changes (in case currency changes in future)
    const originalSetLanguage = setLanguage;
    setLanguage = function(lang) {
        originalSetLanguage(lang);
        updateDivingPrice();
        updatePADIPrice();
    };
});

// ============================================
// Handle Window Resize
// ============================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate anything that depends on viewport size if needed
    }, 250);
});


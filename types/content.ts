export type Language = 'de' | 'ru' | 'en' | 'fr';

export interface TranslatedText {
  de: string;
  ru: string;
  en: string;
  fr: string;
}

export interface NavigationItem {
  id: string;
  label: TranslatedText;
}

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export interface HeroContent {
  title: TranslatedText;
  cta: {
    contact: TranslatedText;
    courses: TranslatedText;
  };
  video: {
    src: string;
    fallback: string;
  };
}

export interface IntroContent {
  title: TranslatedText;
  aboutMe?: TranslatedText;
  paragraphs: TranslatedText[];
}

export interface SocialImage {
  src: string;
  alt: TranslatedText;
}

export interface SocialContent {
  title: TranslatedText;
  images: SocialImage[];
}

export interface PriceOption {
  value: string | number;
  label: TranslatedText;
  price: number;
}

export interface PriceConfig {
  title: TranslatedText;
  selectLabel: TranslatedText;
  options: PriceOption[];
  basePrices?: Record<string, number>;
  discount?: number;
  features?: TranslatedText;
}

export interface PlanService {
  label: TranslatedText;
  icon: 'check' | 'info';
}

export interface DailyDivingConfig {
  title: TranslatedText;
  selectLabel: TranslatedText;
  options: PriceOption[];
  features: TranslatedText;
  contentDetails: Record<string, string[]>;
  reachLabel: TranslatedText;
  services: PlanService[];
  additionalInfo?: Record<string, string[]>;
}

export interface CoursesConfig {
  title: TranslatedText;
  selectLabel: TranslatedText;
  options: PriceOption[];
  features: TranslatedText;
  contentDetails: Record<string, string[]>;
  reachLabel: TranslatedText;
  services: PlanService[];
}

export interface SpecialtyConfig {
  title: TranslatedText;
  selectLabel: TranslatedText;
  options: PriceOption[];
  features: TranslatedText;
  contentDetails: Record<string, string[]>;
  reachLabel: TranslatedText;
  services: PlanService[];
}

export interface PlanFeature {
  label: TranslatedText;
  icon: 'person' | 'content';
  count: number;
}

export interface PricePlan {
  id: string;
  name: TranslatedText;
  price: number;
  features: PlanFeature[];
  contentDetails: TranslatedText[];
  reach: number;
  reachLabel: TranslatedText;
  services: PlanService[];
  duration: TranslatedText;
  cta: TranslatedText;
}

export interface PricesContent {
  title: TranslatedText;
  dailyDiving: DailyDivingConfig;
  courses: CoursesConfig;
  specialty: SpecialtyConfig;
  plans?: PricePlan[];
}

export interface Course {
  id: string;
  name: TranslatedText;
  price: number;
  days: number;
  dives: number;
  shortDescription: TranslatedText;
  fullDescription: TranslatedText;
  includes: Record<string, string[]>;
}

export interface CourseSection {
  title: TranslatedText;
  courses: Course[];
  additionalInfo?: Record<string, string[]>;
}

export interface CoursesSections {
  daily: CourseSection;
  padi: CourseSection;
  specialty: CourseSection;
}

export interface CoursesContent {
  title: TranslatedText;
  description: TranslatedText;
  sections?: CoursesSections;
  transferInfo?: TranslatedText;
}

export interface ContactInfo {
  title: TranslatedText;
  email: string;
  phone: string;
}

export interface LocationInfo {
  title: TranslatedText;
  address?: string;
  city: string;
  region: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SocialInfo {
  title: TranslatedText;
  links: SocialLink[];
}

export interface FooterContent {
  contact: ContactInfo;
  location: LocationInfo;
  social: SocialInfo;
  copyright: TranslatedText;
}

export interface SiteContent {
  site: {
    name: string;
    description: string;
    location: string;
    region: string;
  };
  navigation: {
    items: NavigationItem[];
  };
  hero: HeroContent;
  intro: IntroContent;
  social: SocialContent;
  prices: PricesContent;
  courses: CoursesContent;
  footer: FooterContent;
  languages: LanguageOption[];
}


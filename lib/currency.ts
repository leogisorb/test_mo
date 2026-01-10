export type Currency = 'EUR' | 'USD' | 'RUB' | 'EGP';

export const languageToCurrency: Record<string, Currency> = {
  de: 'EUR',
  en: 'USD',
  ru: 'RUB',
  fr: 'EUR',
};

export const currencySymbols: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  RUB: '₽',
  EGP: 'E£',
};

interface ExchangeRates {
  rates: Record<Currency, number>;
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const BASE_CURRENCY = 'EUR';

// Fallback exchange rates (approximate)
const fallbackRates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  RUB: 100,
  EGP: 50,
};

async function fetchExchangeRates(): Promise<Record<Currency, number>> {
  try {
    // Using a free exchange rate API
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    if (!response.ok) throw new Error('Failed to fetch rates');
    
    const data = await response.json();
    return {
      EUR: 1,
      USD: data.rates.USD || fallbackRates.USD,
      RUB: data.rates.RUB || fallbackRates.RUB,
      EGP: data.rates.EGP || fallbackRates.EGP,
    };
  } catch (error) {
    console.warn('Failed to fetch exchange rates, using fallback:', error);
    return fallbackRates;
  }
}

export async function getExchangeRates(): Promise<Record<Currency, number>> {
  if (typeof window === 'undefined') {
    return fallbackRates;
  }

  const cached = localStorage.getItem('exchangeRates');
  if (cached) {
    const data: ExchangeRates = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid (less than 24 hours old)
    if (now - data.timestamp < CACHE_DURATION) {
      return data.rates;
    }
  }

  // Fetch new rates
  const rates = await fetchExchangeRates();
  const cacheData: ExchangeRates = {
    rates,
    timestamp: Date.now(),
  };
  
  localStorage.setItem('exchangeRates', JSON.stringify(cacheData));
  return rates;
}

export function convertPrice(
  priceInEUR: number,
  targetCurrency: Currency,
  rates: Record<Currency, number>
): number {
  if (targetCurrency === 'EUR') return priceInEUR;
  return priceInEUR * rates[targetCurrency];
}

export function formatPrice(price: number, currency: Currency): string {
  const symbol = currencySymbols[currency];
  
  // Format based on currency
  if (currency === 'RUB') {
    return `${Math.round(price).toLocaleString('ru-RU')} ${symbol}`;
  }
  if (currency === 'EGP') {
    return `${Math.round(price).toLocaleString('ar-EG')} ${symbol}`;
  }
  if (currency === 'USD') {
    return `${symbol}${price.toFixed(0)}`;
  }
  // EUR
  return `${symbol}${price.toFixed(0)}`;
}


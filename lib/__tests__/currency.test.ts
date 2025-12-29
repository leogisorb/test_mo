import {
  languageToCurrency,
  currencySymbols,
  convertPrice,
  formatPrice,
  getExchangeRates,
  type Currency,
} from '../currency';

describe('currency utilities', () => {
  describe('languageToCurrency', () => {
    it('should map German to EUR', () => {
      expect(languageToCurrency.de).toBe('EUR');
    });

    it('should map English to USD', () => {
      expect(languageToCurrency.en).toBe('USD');
    });

    it('should map Russian to RUB', () => {
      expect(languageToCurrency.ru).toBe('RUB');
    });

    it('should map Arabic to EGP', () => {
      expect(languageToCurrency.ar).toBe('EGP');
    });

    it('should map French to EUR', () => {
      expect(languageToCurrency.fr).toBe('EUR');
    });
  });

  describe('currencySymbols', () => {
    it('should return correct symbol for EUR', () => {
      expect(currencySymbols.EUR).toBe('€');
    });

    it('should return correct symbol for USD', () => {
      expect(currencySymbols.USD).toBe('$');
    });

    it('should return correct symbol for RUB', () => {
      expect(currencySymbols.RUB).toBe('₽');
    });

    it('should return correct symbol for EGP', () => {
      expect(currencySymbols.EGP).toBe('E£');
    });

    it('should have symbols for all currencies', () => {
      const currencies: Currency[] = ['EUR', 'USD', 'RUB', 'EGP'];
      currencies.forEach((currency) => {
        expect(currencySymbols[currency]).toBeDefined();
        expect(currencySymbols[currency].length).toBeGreaterThan(0);
      });
    });
  });

  describe('convertPrice', () => {
    const mockRates: Record<Currency, number> = {
      EUR: 1,
      USD: 1.08,
      RUB: 100,
      EGP: 50,
    };

    it('should return same price for EUR', () => {
      const price = 100;
      const result = convertPrice(price, 'EUR', mockRates);
      expect(result).toBe(price);
    });

    it('should convert EUR to USD correctly', () => {
      const price = 100;
      const result = convertPrice(price, 'USD', mockRates);
      expect(result).toBe(108);
    });

    it('should convert EUR to RUB correctly', () => {
      const price = 1;
      const result = convertPrice(price, 'RUB', mockRates);
      expect(result).toBe(100);
    });

    it('should convert EUR to EGP correctly', () => {
      const price = 2;
      const result = convertPrice(price, 'EGP', mockRates);
      expect(result).toBe(100);
    });

    it('should handle zero price', () => {
      const result = convertPrice(0, 'USD', mockRates);
      expect(result).toBe(0);
    });

    it('should handle negative price', () => {
      const price = -50;
      const result = convertPrice(price, 'USD', mockRates);
      expect(result).toBe(-54);
    });

    it('should handle decimal prices', () => {
      const price = 10.5;
      const result = convertPrice(price, 'USD', mockRates);
      expect(result).toBeCloseTo(11.34, 2);
    });
  });

  describe('formatPrice', () => {
    it('should format EUR price correctly', () => {
      const result = formatPrice(100, 'EUR');
      expect(result).toBe('€100');
    });

    it('should format USD price correctly', () => {
      const result = formatPrice(100, 'USD');
      expect(result).toBe('$100');
    });

    it('should format RUB price with locale formatting', () => {
      const result = formatPrice(1000, 'RUB');
      expect(result).toContain('₽');
      expect(result).toContain('1');
    });

    it('should format EGP price with locale formatting', () => {
      const result = formatPrice(1000, 'EGP');
      expect(result).toContain('E£');
      expect(result).toContain('1');
    });

    it('should round prices correctly', () => {
      const result = formatPrice(99.99, 'EUR');
      expect(result).toBe('€100');
    });

    it('should handle zero price', () => {
      const result = formatPrice(0, 'EUR');
      expect(result).toBe('€0');
    });

    it('should handle large prices', () => {
      const result = formatPrice(1000000, 'USD');
      expect(result).toBe('$1000000');
    });

    it('should handle decimal prices correctly', () => {
      const result = formatPrice(123.456, 'EUR');
      expect(result).toBe('€123');
    });
  });

  describe('getExchangeRates', () => {
    beforeEach(() => {
      localStorage.clear();
      jest.clearAllMocks();
    });

    it('should return fallback rates when window is undefined', async () => {
      const originalWindow = global.window;
      // @ts-expect-error - intentionally setting to undefined for test
      global.window = undefined;

      const rates = await getExchangeRates();

      expect(rates.EUR).toBe(1);
      expect(rates.USD).toBe(1.08);
      expect(rates.RUB).toBe(100);
      expect(rates.EGP).toBe(50);

      global.window = originalWindow;
    });

    it('should return cached rates when available and valid', async () => {
      const cachedRates = {
        rates: {
          EUR: 1,
          USD: 1.1,
          RUB: 110,
          EGP: 55,
        },
        timestamp: Date.now() - 1000, // 1 second ago
      };

      localStorage.setItem('exchangeRates', JSON.stringify(cachedRates));

      const rates = await getExchangeRates();

      expect(rates.USD).toBe(1.1);
      expect(rates.RUB).toBe(110);
    });

    it('should fetch new rates when cache is expired', async () => {
      const expiredCache = {
        rates: {
          EUR: 1,
          USD: 1.0,
          RUB: 100,
          EGP: 50,
        },
        timestamp: Date.now() - 25 * 60 * 60 * 1000, // 25 hours ago
      };

      localStorage.setItem('exchangeRates', JSON.stringify(expiredCache));

      // Mock fetch to return test data
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          rates: {
            USD: 1.09,
            RUB: 101,
            EGP: 51,
          },
        }),
      });

      const rates = await getExchangeRates();

      expect(global.fetch).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should use fallback rates when fetch fails', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      const rates = await getExchangeRates();

      expect(rates.EUR).toBe(1);
      expect(rates.USD).toBe(1.08);
      expect(rates.RUB).toBe(100);
      expect(rates.EGP).toBe(50);
    });
  });
});



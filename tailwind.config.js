/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000b10',
          dark: '#000810',
          button: '#001a2e',
          hover: '#002d4a',
        },
        sand: '#F4ECDC',
        secondary: '#001a2e',
        accent: '#002d4a',
        text: {
          DEFAULT: '#2c3e50',
          light: '#7f8c8d',
        },
        maritime: {
          light: '#E6F3FF',      // Sehr helles Blau (flaches Wasser)
          'light-medium': '#B8E0F0', // Helles Blau
          medium: '#7EC8E3',     // Mittleres Blau
          'medium-dark': '#4A9BC4',  // Dunkleres Blau
          dark: '#1E6B8A',       // Dunkles Blau (tiefes Meer)
          darker: '#0F4C75',    // Sehr dunkles Blau (Ozean)
        },
      },
      fontFamily: {
        sans: ['area-normal', 'area-extended', 'sans-serif'],
        'area-normal': ['area-normal', 'sans-serif'],
        'area-normal-light': ['area-normal-light', 'sans-serif'],
        'area-extended': ['area-extended', 'sans-serif'],
        'area-extended-light': ['area-extended-light', 'sans-serif'],
      },
      spacing: {
        'section': '6rem',
      },
    },
  },
  plugins: [],
}


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


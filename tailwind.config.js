/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ccad6b',
        secondary: {
          100: '#f5f0e5',
          200: '#e6d5b8',
          300: '#d4b98c',
          400: '#b69a5b',
          500: '#8c7339',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
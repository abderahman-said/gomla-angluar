/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Inter', 'sans-serif'],
        heading: ['Outfit', 'Cairo', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0f172a',
          hover: '#1e293b',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f8fafc',
          foreground: '#0f172a',
        },
        success: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#c5a059',
          light: '#fdfaf3',
          dark: '#b08d45',
        },
        brand: {
          light: '#4f72ff',
          DEFAULT: '#2650fc',
          dark: '#1a3ecb',
        },
        muted: '#64748b',
        border: '#e2e8f0',
      }
    },
  },
  plugins: [],
}

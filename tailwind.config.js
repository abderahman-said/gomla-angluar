/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['DM Mono', 'Courier', 'monospace'],
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        // Luxury hotel theme colors with purple primary
        ink: '#0f0e0c',
        parchment: '#f5f0e8',
        cream: '#faf7f2',
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8d08a',
          dark: '#8b6914',
          50: '#fdf8e9',
          100: '#faf1d9',
          200: '#f6e3b3',
          300: '#f2d58d',
          400: '#eec767',
          500: '#c9a84c',
          600: '#a38a3d',
          700: '#7d6c2e',
          800: '#574e1f',
          900: '#313010',
        },
        stone: {
          DEFAULT: '#9b9189',
          light: '#d6cfc4',
          50: '#f7f5f2',
          100: '#efebe6',
          200: '#e6dfd7',
          300: '#dcd3c8',
          400: '#d2c7b9',
          500: '#9b9189',
          600: '#7c736d',
          700: '#5d5651',
          800: '#3e3935',
          900: '#1f1c1a',
        },
        charcoal: '#2a2722',
        // Custom purple primary color
        primary: {
          DEFAULT: '#530084',
          50: '#f3e8fb',
          100: '#e8d1f7',
          200: '#d4a3ef',
          300: '#bf75e7',
          400: '#ab47df',
          500: '#530084',
          600: '#44006d',
          700: '#350056',
          800: '#26003f',
          900: '#170028',
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
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        danger: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#14b8a6',
          light: '#5eead4',
          dark: '#0d9488',
        },
        muted: {
          DEFAULT: '#64748b',
          foreground: '#f1f5f9',
        },
        border: '#e2e8f0',
        'border-dark': '#334155',
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(15, 23, 42, 0.12)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        slowZoom: {
          'from': { transform: 'scale(1.05)' },
          'to': { transform: 'scale(1.12)' },
        },
        fadeUp: {
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.glass': {
          '@apply bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl dark:bg-slate-900/70 dark:border-slate-700/30': {},
        },
        '.glass-dark': {
          '@apply bg-slate-900/80 backdrop-blur-xl border border-slate-700/30 shadow-2xl': {},
        },
      })
    },
  ],
}

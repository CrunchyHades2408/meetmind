/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        void: '#030507',
        deep: '#080b10',
        surface: '#0d1117',
        elevated: '#131920',
        silver: {
          100: '#f0f2f5',
          200: '#dde1e8',
          300: '#c8cdd6',
          400: '#9ba3b0',
          500: '#6b7380',
          600: '#3d4450',
          700: '#252b35',
          800: '#161b22',
          900: '#0d1117',
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
        'fade-in': 'fade-in 0.4s ease forwards',
        'slide-up': 'slide-up 0.4s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(220,80,80,0.4)' },
          '70%': { boxShadow: '0 0 0 18px rgba(220,80,80,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(220,80,80,0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
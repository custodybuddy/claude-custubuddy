import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020716',
          900: '#0A192F',
          850: '#0F182A',
        },
        gold: {
          500: '#F6BA21',
          700: '#957320',
        },
        'soft-white': '#cbd5e1',
        slate: {
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(246, 186, 33, 0.2)' },
          '50%': { boxShadow: '0 0 0 10px rgba(246, 186, 33, 0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-subtle': 'pulse-subtle 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

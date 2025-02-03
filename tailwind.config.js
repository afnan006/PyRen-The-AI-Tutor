/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0F1C', // Dark black blue
          dark: '#070B14',
          light: '#1A1F2C'
        },
        secondary: {
          DEFAULT: '#1E0B2C', // Dark black purple
          dark: '#150720',
          light: '#2E1A3C'
        },
        accent: {
          DEFAULT: '#8B9FF7', // Soft blue accent
          hover: '#A5B4FF',
          muted: '#6B7BC7'
        }
      },
      animation: {
        'shine': 'shine 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-glow': 'borderGlow 3s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        borderGlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#8B9FF7',
            a: {
              color: '#A5B4FF',
              '&:hover': {
                color: '#6B7BC7',
              },
            },
            strong: {
              color: '#8B9FF7',
            },
            code: {
              color: '#A5B4FF',
            },
            pre: {
              backgroundColor: '#070B14',
              color: '#8B9FF7',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      boxShadow: {
        card: '0 18px 45px -24px rgba(0, 0, 0, 0.25)',
        floating: '0 18px 50px -20px rgba(0, 0, 0, 0.28)',
      },
      colors: {
        brand: '#0F3D3E',
        field: '#4F5D2F',
        accent: '#C26A2E',
        surface: '#F7F7F5',
        ink: '#0B0F14',
        muted: '#5E646A',
        line: '#DADDD8',
      },
      keyframes: {
        chatIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSwap: {
          '0%': { opacity: '0', transform: 'scale(0.99)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        chatIn: 'chatIn 180ms ease-out',
        fadeSwap: 'fadeSwap 340ms ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

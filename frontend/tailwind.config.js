/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#09090B',
        surface: '#18181B',
        primary: '#6366F1',
        secondary: '#06B6D4',
        success: '#22C55E',
        danger: '#EF4444',
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: { glow: '0 0 40px -10px rgba(99,102,241,0.45)' },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};

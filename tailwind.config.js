/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        80: "0.80",
      },
      animation: {
        'light-slide': 'light-slide 2s linear infinite',
        'scroll': 'scroll 8s linear infinite', // Added scroll animation
      },
      keyframes: {
        'light-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'scroll': { // Added scroll keyframes
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },

      colors: {
        primaryDarkShade1: 'var(--primaryDarkShade1)',
        primary: 'var(--primary)',
        primaryShade1: 'var(--primaryShade1)',
        primaryShade2: 'var(--primaryShade2)',
        primaryShade3: 'var(--primaryShade3)',
      },

      textRendering: {
        smooth: 'optimizeLegibility',
      },
      willChange: {
        transform: 'will-change: transform',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};

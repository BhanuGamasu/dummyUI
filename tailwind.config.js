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
      },
      keyframes: {
        'light-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};

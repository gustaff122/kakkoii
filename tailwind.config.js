/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ], theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '2140px',
    },
    extend: {
      aspectRatio: {
        'poster': '9 / 16',
        'card': '141 / 100',
      },
    },
  },
  plugins: [],
};


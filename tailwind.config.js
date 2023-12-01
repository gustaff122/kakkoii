/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ], theme: {
    colors: {
      'royal-blue': '#3b5eda',
      'sky-blue': '#5472df',
      'light-blue': '#5ca7ff',
      'smoky-black': '#0f0f0f',
      'deep-black': '#080808',
      'smooth-black': '#1e1e1e',
      'chilly-black': '#303030',
      'almost-white': '#fefefe',
      'shade-of-grey': '#cccccc',
      'shade-of-grey-secondary': '#dedede',
    },
    fontFamily: {
      'josefin': [ 'Josefin Sans', 'sans-serif' ],
      'lato': [ 'Lato', 'sans-serif' ],
      'saira': [ 'Saira Extra Condensed', 'sans-serif' ],
      'noto-jp': [ 'Noto Sans JP', 'sans-serif' ],
      'roboto': [ 'Roboto', 'sans-serif' ],
    },
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


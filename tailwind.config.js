/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],  theme: {
    extend: {
      aspectRatio: {
        'poster': '9 / 16',
        'card': '141 / 100'
      },
    },
  },
  plugins: [],
}


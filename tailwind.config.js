/** @type {import('tailwindcss').Config} */
const colors= require('tailwindcss/colors')
module.exports = {
  content: ["index.html"],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans serif'],
      heading: ['Poppins', 'sans serif'],
      display: ['Zen Dots', 'cursive'],
    },
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
        tmdbDarkBlue: 'rgb(13, 37, 63)',
        tmdbLightGreen: 'rgb(30,213,169)',
        tmdbLightBlue: 'rgb(1,180,228)'
      },
    },
  },
  plugins: [],
}

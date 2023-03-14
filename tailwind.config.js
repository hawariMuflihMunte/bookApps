/* eslint-disable no-unused-vars */
const autoprefixer = require('autoprefixer')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px'
    }
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {}
    }
  ]
}

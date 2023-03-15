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
  ]
}

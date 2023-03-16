/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif']
      }
    },
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px'
    },
    minWidth: {
      200: '200px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
  ]
}

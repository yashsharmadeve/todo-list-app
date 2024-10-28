const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins','sans-serif'],
      ...defaultTheme.fontFamily,
    },
    extend: {
      colors: {
        main: '#646681',
        white: '#ffffff',
        // ...defaultTheme.colors
      },
    },
  },
  plugins: [],
}
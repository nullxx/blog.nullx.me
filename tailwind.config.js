/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-color': '#121212',
        'light-color': '#fafafa',
        'dark-text-color': '#fafafa',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        15: "3.75rem"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

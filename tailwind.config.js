/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    //screens: require("./src/components/helper functions/tailwind.screens"),
    extend: {
      /* screens: {
        'xs': '320px',
        ...defaultTheme.screens,
      }, */
    },
  },
  plugins: [
  ],
});

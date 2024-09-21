/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        sm: '676px',
        md: '768px',
        lg: '976px',
        subxl: '1150px',
        xl: '1440px',
      },
      colors: {
        primary: '#F49401',
        secondary:'#2C265F',
        text_color: '#2C265F',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light'],
  },
});

// 
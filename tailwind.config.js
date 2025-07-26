/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      logo: ['"Pacifico"', 'cursive'],
    },
    colors: { 
      primary: "#f79633",
      'primary-dark': '#3d8b7c',
      secondary: "#121521",
      tertiary: "#7d7d7d",
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};

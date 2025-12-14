const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["poppins", ...defaultTheme.fontFamily.sans],
        playfair: ["playfair"],
        croissant: ["croissant"],
      },
      keyframes: {
        navanim: {
          from: { scale: "0" },
          to: { scale: "1" },
        },
      },
      animation: {
        navanim: "navanim 1s ease-in",
      },
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      minMd:{min:"768px"},
      mintablet:{min:"992px"},
      minLg:{min:"1200px"},
      minXl:{min:"1400px"}
    },
  },

  plugins: [],
};

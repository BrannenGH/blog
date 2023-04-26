/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md: "768px",
    },
    extend: {
      fontFamily: {
        heading: "Cormorant Garamond",
        body: "Raleway",
      },
      colors: {
        /* primary */
        "soft-pink": {
          100: "#fceae8",
          200: "#f9d5d1",
          300: "#f6bfba",
          400: "#f3aaa4",
          500: "#e6b0aa",
          600: "#d2999a",
          700: "#bf8389",
          800: "#ac6d78",
          900: "#995767",
        },
        /* secondary */
        "mint-green": {
          100: "#f7fbf9",
          200: "#eef7f2",
          300: "#e4f4ec",
          400: "#dbf0e5",
          500: "#d5f5e3",
          600: "#c1e6ce",
          700: "#add8b8",
          800: "#99c9a2",
          900: "#85bb8c",
        },
        /* accent */
        "light-yellow": {
          100: "#fefbea",
          200: "#fdf7d6",
          300: "#fcf4c1",
          400: "#fbf0ad",
          500: "#f9e79f",
          600: "#e6d78e",
          700: "#d2c87d",
          800: "#beb96c",
          900: "#aaab5b",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

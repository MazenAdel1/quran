/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arabic: "arabic",
      },
      colors: {
        "primary-white": "#e9eaec",
        primary: "#f09e51",
        secondary: "#e1e0d6",
        accent: "#f06542",
      },
      backgroundColor: {
        primary: "#0e1420",
        orange: "#f09e51",
        secondary: "#e1e0d6",
        accent: "#f06542",
      },
    },
  },
  plugins: [],
};

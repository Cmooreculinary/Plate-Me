/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2bee72",
        "background-light": "#f6f8f6",
        "background-dark": "#111813",
        "surface-dark": "#1d2921",
        "surface-light": "#ffffff"
      },
      fontFamily: {
        display: ["Work Sans", "sans-serif"],
        body: ["Noto Sans", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      }
    }
  },
  plugins: []
};

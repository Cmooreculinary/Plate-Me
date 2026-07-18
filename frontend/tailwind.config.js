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
        primary: "#EC5B13",
        "background-light": "#F4F1EC",
        "background-dark": "#0D0D0D",
        "surface-dark": "#141414",
        "surface-light": "#ffffff"
      },
      fontFamily: {
        display: ["Bebas Neue", "Impact", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.5rem",
        full: "9999px"
      }
    }
  },
  plugins: []
};

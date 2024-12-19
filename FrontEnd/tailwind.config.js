/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "fondo-negro": "#212121",
        "gris-acero": "#9E9E9E",
        "rojo-intenso": "#C62828",
        "azul-oscuro": "#283593",
        "blanco": "#FFFFFF",
      },
    },
  },
  plugins: [],
}


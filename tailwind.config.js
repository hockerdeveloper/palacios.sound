/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#F90030',   // Rojo neón del logo
          cyan: '#00D4FF',  // Cian eléctrico del ecualizador
          dark: '#050505',  // Fondo ultra oscuro
          surface: '#111111'// Superficie para tarjetas
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

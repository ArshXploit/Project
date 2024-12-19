/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors:{
        'neon':'#c35817'
      },
      fontFamily: {
        CastoroTitling: ["Castoro Titling", "serif"],
        JacquesFrancois: ["Jacques Francois","serif"],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}


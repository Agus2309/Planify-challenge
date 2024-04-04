/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // para definir distintos colores aparte de los de tailwind
      },
    },
    screens:{
      // para definir los distintos breakpoints aparte de los default
    },
  },
  plugins: [],
}


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
      'ssmall': '340px',
      'xxxs': '360px',
      'mxxs': '396px',
      'xxs': '540px',
      'sm': '640px',   
      'md': '768px',      
      'lg': '1024px',     
      'xl': '1280px',     
      '2xl': '1536px',
    },
  },
  plugins: [],
}


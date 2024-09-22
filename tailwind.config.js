/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Rango para móviles pequeños
        'small-mobile': { 'max': '639px' }, 
        // => @media (max-width: 639px) { ... }

        // Rango para tablets
        'tablet': { 'min': '640px', 'max': '1023px' },
        // => @media (min-width: 640px) and (max-width: 1023px) { ... }

        // Rango para laptops
        'laptop': { 'min': '1024px', 'max': '1279px' },
        // => @media (min-width: 1024px) and (max-width: 1279px) { ... }

        // Rango para desktops
        'desktop': { 'min': '1280px', 'max': '1535px' },
        // => @media (min-width: 1280px) and (max-width: 1535px) { ... }

        // Rango para pantallas grandes (4K, etc.)
        'large-desktop': { 'min': '1536px' },
        // => @media (min-width: 1536px) { ... }
      },

    },
    colors: {
      'primary': '#FA8072',
      'secondary': '#E9967A',
      'third': '#FFA07A',
      'fourth': '#AFEEEE',
      'fith': '#E6E6FA',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontSize: {
      xs: '0.65rem', 
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }
  },
  plugins: [],
}

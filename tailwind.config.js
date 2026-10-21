/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#080808',
          900: '#101010', // Deep charcoal black
          850: '#131313',
          800: '#161616',
          750: '#1c1c1c',
          700: '#222222',
          600: '#2c2c2c',
          500: '#383838',
        },
        gold: {
          100: '#FAF5EA',
          200: '#F2E8D2',
          300: '#E4D3AE',
          400: '#D5BC85',
          500: '#C8A45D', // Primary Muted Champagne Gold
          600: '#A98242', // Secondary Warm Bronze
          700: '#87652E',
          800: '#64481C',
        },
        cream: {
          50: '#FCFBF9',
          100: '#F7F5F0', // Secondary warm off-white
          200: '#EDE9DE',
          300: '#DFD8C5',
        },
        cyanBrand: {
          DEFAULT: '#01B6E5', // Refined cyan from logo
          hover: '#009bc4',
          dark: '#017897',
          light: '#38C8EE',
          muted: 'rgba(1, 182, 229, 0.15)',
        },
        softWhite: '#F4F1EA',
        warmGray: {
          100: '#D6D3CD',
          200: '#BCB8AF',
          DEFAULT: '#A9A49A',
          400: '#8D877B',
          500: '#6E695F',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(200, 164, 93, 0.12)',
        'gold-glow': '0 0 20px rgba(200, 164, 93, 0.35)',
        'subtle': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

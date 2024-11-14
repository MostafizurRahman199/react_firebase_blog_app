/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        liked: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '20%, 80%': { transform: 'rotate(-15deg) scale(1.15)' },
          '40%, 60%': { transform: 'rotate(15deg) scale(1.15)' }
        },
        'scale-bounce': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'liked': 'liked 0.3s ease-in-out',
        'scale-bounce': 'scale-bounce 0.7s ease-in-out'
      }
    }
  },
  plugins: [],
})
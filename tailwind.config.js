/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        down: {
          '0%': { transform: 'translateY(-40px)' },
          '10%': { transform: 'translateY(0px)' },
          '27%': { transform: 'translateY(-18px)' },
          '44%': { transform: 'translateY(0px)' },
          '58%': { transform: 'translateY(-10px)' },
          '70%': { transform: 'translateY(0px)' },
          '80%': { transform: 'translateY(-5px)' },
          '85%': { transform: 'translateY(0px)' },
          '90%': { transform: 'translateY(-3px)' },
          '95%': { transform: 'translateY(0px)' },
          '97%': { transform: 'translateY(-0.5px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s linear infinite',
        down: 'down 1s linear',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

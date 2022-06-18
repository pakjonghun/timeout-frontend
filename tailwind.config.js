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
          '20%': { transform: 'translateY(0px)' },
          '40%': { transform: 'translateY(-12px)' },
          '50%': { transform: 'translateY(0px)' },
          '60%': { transform: 'translateY(-9px)' },
          '70%': { transform: 'translateY(0px)' },
          '80%': { transform: 'translateY(-6px)' },
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

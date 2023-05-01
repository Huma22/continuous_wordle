/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'color-correct': 'var(--color-correct)',
        'color-absent': 'var(--color-abscent)',
        'color-present': 'var(--color-present)',
      },
    },
  },
  variants: {},
  plugins: [],
}
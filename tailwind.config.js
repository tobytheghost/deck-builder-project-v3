/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      aspectRatio: {
        'card': '5 / 7',
      },
      width: {
        '74': '18.5rem',
        '75': '18.75rem',
        '76': '19rem'
      }
    }
  },
  plugins: []
}

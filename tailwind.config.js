/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '20px',
        sm: '20px',
        md: '100px',
        lg: '250px',
        xl: '250px',
        '2xl': '250px',
      },
      center: true
    },
    colors: {
      'white': 'var(--white)',
      'light-gray': 'var(--light-gray)',
      'very-light-gray': 'var(--very-light-gray)',
      'moderate-blue': 'var(--moderate-blue)',
      'grayish-blue': 'var(--grayish-blue)',
      'soft-red': 'var(--soft-red)'
    },
    extend: {},
  },
  plugins: [],
}
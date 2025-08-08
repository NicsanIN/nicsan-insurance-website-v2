/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#004E98',
        'design-black': '#000000',
        'design-white': '#FFFFFF',
        'light-gray': '#D9D9D9',
        'button-text': '#E9E9E9',
        'dark-gray': '#1D1B20',
      },
      fontFamily: {
        'clash-display': ['Clash Display', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        'hero': ['81.6px', { lineHeight: '0.93em', fontWeight: '600' }],
        'section-heading': ['92px', { lineHeight: '0.93em', fontWeight: '600' }],
        'product-title': ['45px', { lineHeight: '1.16em', fontWeight: '400' }],
        'subheading': ['32px', { lineHeight: '1.16em', fontWeight: '400' }],
        'body': ['20px', { lineHeight: '1.16em', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '1em', fontWeight: '700' }],
        'small': ['13.5px', { lineHeight: '1em', fontWeight: '400' }],
        'values': ['27px', { lineHeight: '1.16em', fontWeight: '400' }],
        'founder': ['25px', { lineHeight: '1.16em', fontWeight: '400' }],
      },
      spacing: {
        '66': '66px',
        '156': '156px',
        '200': '200px',
      },
      borderRadius: {
        '44': '44px',
        '34': '34px',
        '38': '38px',
        '16': '16px',
        '12': '12px',
        '8': '8px',
      },
      maxWidth: {
        '1440': '1440px',
      },
    },
  },
  plugins: [],
} 
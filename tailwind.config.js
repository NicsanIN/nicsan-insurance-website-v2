/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
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
        'hero': ['clamp(2.5rem, 8vw, 81.6px)', { lineHeight: '0.93em', fontWeight: '600' }],
        'section-heading': ['clamp(3rem, 10vw, 92px)', { lineHeight: '0.93em', fontWeight: '600' }],
        'product-title': ['clamp(1.5rem, 5vw, 45px)', { lineHeight: '1.16em', fontWeight: '400' }],
        'subheading': ['clamp(1.25rem, 4vw, 32px)', { lineHeight: '1.16em', fontWeight: '400' }],
        'body': ['clamp(0.875rem, 2.5vw, 20px)', { lineHeight: '1.16em', fontWeight: '400' }],
        'button': ['clamp(0.875rem, 2vw, 16px)', { lineHeight: '1em', fontWeight: '700' }],
        'small': ['clamp(0.75rem, 1.5vw, 13.5px)', { lineHeight: '1em', fontWeight: '400' }],
        'values': ['clamp(1.125rem, 3vw, 27px)', { lineHeight: '1.16em', fontWeight: '400' }],
        'founder': ['clamp(1rem, 2.5vw, 25px)', { lineHeight: '1.16em', fontWeight: '400' }],
      },
      spacing: {
        '66': '66px',
        '156': '156px',
        '200': '200px',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
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
        'screen-xs': '475px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.safe-padding-top': {
          'padding-top': 'env(safe-area-inset-top)',
        },
        '.safe-padding-bottom': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
        '.text-wrap-balance': {
          'text-wrap': 'balance',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          black: '#000000',
          darkgray: '#121212', 
          gray: '#181818',
          lightgray: '#282828',
          textgray: '#B3B3B3',
          white: '#FFFFFF'
        }
      },
      backgroundColor: {
        'spotify-black': '#000000',
        'spotify-dark': '#121212',
        'spotify-card': '#181818',
        'spotify-hover': '#282828',
        'spotify-lightgray': '#282828',
      },
      textColor: {
        'spotify-primary': '#FFFFFF',
        'spotify-secondary': '#B3B3B3',
        'spotify-green': '#1DB954',
      },
      aspectRatio: {
        'canvas': '9 / 16',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
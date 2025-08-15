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
      },
      textColor: {
        'spotify-primary': '#FFFFFF',
        'spotify-secondary': '#B3B3B3',
        'spotify-green': '#1DB954',
      },
      aspectRatio: {
        'canvas': '9 / 16',
      }
    },
  },
  plugins: [],
}
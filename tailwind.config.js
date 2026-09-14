/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      colors: {
        moss: {
          DEFAULT: '#3D5A45',
          soft: '#7A9B82',
        },
        paper: {
          DEFAULT: '#F7F5F2',
          ink: '#1A1A1A',
          mute: '#5C5C5C',
          line: '#E4E0DA',
        },
        night: {
          DEFAULT: '#121212',
          ink: '#F2F2F0',
          mute: '#A3A3A3',
          line: '#2A2A2A',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

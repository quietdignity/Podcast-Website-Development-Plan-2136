/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f2f5',
          100: '#e1e6eb',
          200: '#c3cdd7',
          300: '#a5b4c3',
          400: '#879baf',
          500: '#69829b',
          600: '#556b7d',
          700: '#2c3e50',
          800: '#1a2238',
          900: '#0f1419',
        },
        cream: {
          50: '#fefefe',
          100: '#fdfcf9',
          200: '#faf8f1',
          300: '#f8f4ea',
          400: '#f6f2e3',
          500: '#f4f1e8',
          600: '#e8e3d4',
          700: '#d4cbb8',
          800: '#b8aa8f',
          900: '#9c8966',
        },
        bronze: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#ebe3d7',
          300: '#e1d5c3',
          400: '#d7c7af',
          500: '#c19a6b',
          600: '#b8905e',
          700: '#a67d4a',
          800: '#8a6639',
          900: '#6e4f28',
        },
        charcoal: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e3e7e9',
          300: '#d5dbde',
          400: '#c7cfd3',
          500: '#b9c3c8',
          600: '#95a5ac',
          700: '#708390',
          800: '#2c3e50',
          900: '#1a252f',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
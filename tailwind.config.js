/** @type {import('tailwindcss').Config} */
export default {
  content: [
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Premium Palette
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6', // Brand Blue
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554',
          },
          secondary: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899', // Warm Pink/Coral
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
            950: '#500724',
          },
          surface: {
            50: '#f8fafc', // Ultra light cool gray
            100: '#f1f5f9',
            200: '#e2e8f0',
            900: '#0f172a', // Deep dark blue-gray
          }
        },
        fontFamily: {
          sans: ['"Pretendard"', '"Inter"', 'sans-serif'], // Modern clean sans
          serif: ['"Merriweather"', 'serif'], // Elegant serif for headings
        },
        boxShadow: {
          'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
          'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
          'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'fade-in': 'fadeIn 0.5s ease-out forwards',
          'slide-up': 'slideUp 0.5s ease-out forwards',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          }
        }
      },
    },
    plugins: [],
  }

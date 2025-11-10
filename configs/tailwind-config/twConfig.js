/** @type {import('tailwindcss').Config} */
const config = {
  // content: [
  //   'src/**/*.{ts,tsx}',
  //   './src/**/*.{ts,tsx}',
  //   './src/app/**/*.{ts,tsx}',
  //   './app/**/*.{ts,tsx}',
  //   './components/**/*.{ts,tsx}',
  //   '!./node_modules/**', // Exclude everything in node_modules to speed up builds
  // ],
  content: [
    '../../apps/**/*.{js,ts,jsx,tsx,mdx}', // all apps (web, admin, mobile…)
    '../../packages/**/*.{js,ts,jsx,tsx,mdx}', // all packages (ui, features, config…)
    '!../../**/node_modules/**', // ignore node_modules
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      nmd: '800px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      display: {
        unset: 'unset',
      },

      fontFamily: {
        sans: ['Geist', 'Roboto Slab', 'serif'],
      },
      borderColor: {
        DEFAULT: '#CFD8DC',
      },
      keyframes: {
        revealVertical: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        revealVertical: 'revealVertical 400ms forwards cubic-bezier(0, 1, 0.25, 1)',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',

        // Design tokens
        background: {
          light: '#FFFFFF',
          dark: '#0F172A', // slate-900
        },
        foreground: {
          light: '#0F172A', // slate-900
          dark: '#E2E8F0', // slate-200
        },
        primary: {
          light: '#1D4ED8', // blue-700
          dark: '#60A5FA', // blue-400
          darkScale: {
            light: '#000999', // blue-700
            dark: '#000000', // blue-400
          },
        },
        secondary: {
          light: '#9333EA', // purple-600
          dark: '#C084FC', // purple-400
        },
        // success: {
        //   light: '#15803D', // green-700
        //   dark: '#4ADE80', // green-400
        // },
        error: {
          light: '#B91C1C', // red-700
          dark: '#F87171', // red-400
        },
        white: '#FFFFFF',

        gray: {
          100: '#F1F3F5',
          200: '#CFD8DC',
          300: '#AFBAC5',
          400: '#90A4AE',
          500: '#546E7A',
          600: '#091D45',
        },
      },
    },
  },

  plugins: [
    // @ts-ignore
    // require('tailwindcss-radix')(),
    // require('tailwindcss-animate'),
    // require('@tailwindcss/container-queries'),
  ],
};

export default config;

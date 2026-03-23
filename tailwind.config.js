import tailwindScrollbar from 'tailwind-scrollbar';
import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
    },
    screens: {
      '390px':'390px',
      '480px':'480px',
      sm: '640px',
      '700px':'700px',
      md: '768px',
      '850px': '850px',
      '915px': '915px',

      lg: '1024px',
      '1040px': '1040px',
      '1075px': '1075px',
      '1170px': '1170px',
      '1330px': '1330px',
      xl: '1280px',
      '2xl': '1536px',

    },
     keyframes: {
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },

        slideInUptoDown:{
          '0%': {
            opacity: '0',
            transform: 'translateY(-50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
           slideInDowntoUp:{
          '0%': {
            opacity: '0',
            transform: 'translateY(50px)',
          },
          '50%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        buttonToBetSlip: {
          '0%': {
            transform: 'translatex(0)',

            transform: 'translateY(26px)',
            opacity: '0',
          },
          '50%': {
            transform: 'translatex(500px)',
            transform: 'translateY(26px)',

            opacity: '1',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '0',
          },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown .3s ease-in-out forwards',
        fadeInUp: 'fadeInUp .2s ease-in-out forwards',
        slideInLeft: 'slideInLeft .3s ease-in-out forwards',
        slideInRight: 'slideInRight .3s ease-in-out forwards',
        slideInDowntoUp: 'slideInDowntoUp .3s ease-in-out backwards',
        slideInUptoDown:  'slideInUptoDown .3s ease-in-out forwards',
        buttonToBetSlip: 'buttonToBetSlip .3s ease-in-out forwards',
      },
  
  },
  plugins: [
    tailwindScrollbar,  // Use the imported plugin here
  ],
};

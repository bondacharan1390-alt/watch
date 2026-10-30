/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chrono: {
          950: '#060709',
          900: '#0C0D12',
          850: '#12141B',
          800: '#191C26',
          700: '#232736',
          600: '#323749',
          border: 'rgba(255, 255, 255, 0.08)',
          gold: {
            DEFAULT: '#CBB26B',
            light: '#EAD79D',
            dark: '#9A7D35',
            muted: 'rgba(203, 178, 107, 0.15)',
          },
          ivory: {
            DEFAULT: '#F5F2EB',
            muted: '#A9A499',
            dark: '#68645C',
          },
          silver: {
            light: '#E6E8EC',
            DEFAULT: '#C4C8D0',
            dark: '#8C92A0',
          }
        }
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(135deg, #EAD79D 0%, #CBB26B 50%, #9A7D35 100%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        }
      }
    },
  },
  plugins: [],
};

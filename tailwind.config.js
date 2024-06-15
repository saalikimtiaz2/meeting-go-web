module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      Montserrat: ['Montserrat', 'sans-serif'],
      Oswald: ['Oswald', 'sans-serif'],
      Jost: ['Jost', 'sans-serif'],
      Manrope: ['Manrope', 'sans-serif'],
    },
    screens: {
      xxs: '0px',
      xs: '250px',
      s: '350px',
      sm: '768px',
      md: '1024px',
      lg: '1200px',
      xl: '1369px',
    },
    extend: {
      colors: {
        primary: '#5C44F4',
        accent: '#bf60ff',
        secondary: '#e0e0ff',
      },
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      animation: {
        shimmer: 'shimmer 8s infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shimmer-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shimmer-width)) 0',
          },
        },
      },
    },
  },
  plugins: [],
};

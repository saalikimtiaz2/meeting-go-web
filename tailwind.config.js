module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  important: true,
  theme: {
    fontFamily: {
      Montserrat: ['Montserrat', 'sans-serif'],
      Oswald: ['Oswald', 'sans-serif'],
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
        accent: '#8600fc',
        secondary: '#e0e0ff',
      },
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};

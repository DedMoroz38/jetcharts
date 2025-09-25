module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      tablet: {'max': '850px'},
      mobile: {'max': '480px'}
    },
    extend: {
      colors: {
        primary: '#1c1d21',
        secondary: '#23252a',
        border: '#3e4247',
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
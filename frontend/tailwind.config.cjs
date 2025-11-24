module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#7c5cff',
        'axiom-dark': '#0a0b0d',
        'axiom-card': '#13141a',
        'axiom-border': '#1f2128',
        'axiom-text': '#e4e4e7',
        'axiom-muted': '#71717a',
        'green-axiom': '#22c55e',
        'red-axiom': '#ef4444'
      },
      screens: {
        'xs': '320px',
      }
    }
  },
  plugins: []
}

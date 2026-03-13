/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EF',
        ivory: '#F2EDE4',
        blush: '#E8C0B0',
        rose: '#C9897A',
        'dusty-pink': '#D4A59A',
        sage: '#9BAD98',
        'sage-light': '#C8D8C5',
        'dusty-blue': '#A8BDD0',
        'blue-light': '#D0DDE8',
        gold: '#C2965A',
        'gold-light': '#DFC08A',
        'gold-pale': '#EDD9AA',
        dark: '#2A1F1A',
        text: '#3D2E28',
        'text-mid': '#6B5248',
        'text-light': '#9A7E76',
        // Legacy colors mapped for compatibility
        'brand-gold': '#C2965A',
        'brand-navy': '#2A1F1A',
        'brand-pink': '#C9897A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        'serif-sc': ['Cormorant SC', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        // Legacy font mappings
        display: ['Cormorant SC', 'Georgia', 'serif'],
        script: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'widest': '0.3em',
        'wider': '0.22em',
        'wide': '0.15em',
      },
      animation: {
        'ticker': 'tickerMove 30s linear infinite',
        'fade-up': 'fadeUp 1s ease forwards',
        'pulse-orb': 'pulseOrb 4s ease-in-out infinite',
        'scroll-drop': 'scrollDrop 2s ease infinite',
      },
      keyframes: {
        tickerMove: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseOrb: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        scrollDrop: {
          '0%': { opacity: '0', transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
          '100%': { opacity: '0', transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
    },
  },
  plugins: [],
}

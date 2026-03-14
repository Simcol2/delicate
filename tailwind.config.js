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
        // New Bold Desert Accents palette
        'cactus': '#4F7A5A',
        'turquoise': '#2DA9C2',
        'coral': '#FF6F61',
        'tangerine': '#F28C38',
        'midnight': '#1F4D4F',
        
        // Neutral base colors - textured cream/beige
        cream: '#F5F0E8',
        ivory: '#EDE6DB',
        sand: '#E8E0D5',
        stone: '#D8CFC4',
        dark: '#1F4D4F',
        'dark-text': '#2A2A2A',
        'text-mid': '#5A5A5A',
        'text-light': '#8A8A8A',
        
        // Legacy mappings for compatibility (map old names to new colors)
        blush: '#E0D5C8',
        rose: '#FF6F61',
        sage: '#4F7A5A',
        'sage-light': '#6B9A7A',
        gold: '#F28C38',
        'gold-light': '#C4B8A8',
        'gold-pale': '#D8CFC4',
        'dusty-blue': '#8FA8B8',
        'blue-light': '#C5D5E0',
      },
      fontFamily: {
        // New Playfair Display for headers
        display: ['Playfair Display', 'Georgia', 'serif'],
        // Keep Cormorant for body serif text
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        'serif-sc': ['Cormorant SC', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        // Legacy mappings
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

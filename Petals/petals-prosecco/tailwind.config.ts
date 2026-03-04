import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      colors: {
        plum: {
          deep: '#1a0b1f',
          royal: '#2d1b33',
        },
        gold: {
          antique: '#c9a961',
          pale: '#e5d5b0',
        },
        navy: {
          midnight: '#0a0f1c',
        },
        blush: {
          warm: '#f4e9e1',
        },
      },
    },
  },
  plugins: [],
}
export default config

import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Great_Vibes, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Delicate Flowers | Luxury Floral & Tablescape Design',
  description: 'You host. We style. Luxury in-home entertaining experiences in Palm Springs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable} ${playfair.variable}`}>
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          <div className="grain-overlay" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

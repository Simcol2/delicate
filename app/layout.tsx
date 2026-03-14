import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Cormorant_SC, Jost } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll'
import Footer from '@/components/footer/Footer'
import PWARegister from '@/components/PWARegister'
import { Navbar } from '@/components/navigation/Navbar'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-serif-sc',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Delicate Flowers | Palm Springs',
  description: 'Bespoke floral artistry rooted in the light and landscape of Palm Springs. We design with the precision of an architect and the soul of a botanist.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Delicate Flowers',
  },
  icons: {
    icon: [
      { url: '/images/df-logo.png', sizes: '192x192' },
    ],
    apple: [
      { url: '/images/df-logo.png', sizes: '180x180' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#C2965A',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cormorantSC.variable} ${jost.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Delicate Flowers" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Delicate Flowers" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#C2965A" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-152x152.png" />
        <link rel="shortcut icon" href="/images/df-logo.png" />
      </head>
      <body className="bg-cream text-text font-sans font-light antialiased">
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
        <PWARegister />
      </body>
    </html>
  )
}

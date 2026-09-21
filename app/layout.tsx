import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Cormorant_SC, Jost } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll'
import Footer from '@/components/footer/Footer'
import PWARegister from '@/components/PWARegister'
import { Navbar } from '@/components/navigation/Navbar'
import { PAGES, SITE_URL } from '@/lib/seo'
import { generateOrganizationSchema } from '@/lib/structuredData'

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

const homeMeta = PAGES.home

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: homeMeta.title,
  description: homeMeta.description,
  keywords: homeMeta.keywords,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Delicate Flowers',
  },
  icons: {
    icon: [
      { url: '/images/df-logo.png?v=4', sizes: '192x192' },
    ],
    apple: [
      { url: '/images/df-logo.png?v=4', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: homeMeta.ogTitle,
    description: homeMeta.ogDescription,
    type: 'website',
    url: SITE_URL,
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
        <link rel="manifest" href="/manifest.json?v=3" />
        <meta name="application-name" content="Delicate Flowers" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Delicate Flowers" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#C2965A" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png?v=3" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png?v=3" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-152x152.png?v=3" />
        <link rel="shortcut icon" href="/images/df-logo.png?v=4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateOrganizationSchema({
                telephone: '+1-760-555-0000',
                email: 'hello@delicateflowers.co',
              })
            ),
          }}
        />
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

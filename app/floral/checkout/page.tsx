import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import CheckoutContent from './CheckoutContent'
import { PAGES } from '@/lib/seo'

const checkoutMeta = PAGES.floralCheckout

export const metadata: Metadata = {
  title: checkoutMeta.title,
  description: checkoutMeta.description,
  robots: 'noindex',
  alternates: {
    canonical: checkoutMeta.canonical,
  },
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-cream pt-32 pb-20 relative">
      <Navbar />
      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-text-mid">Loading checkout...</p>
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
      <Footer />
    </main>
  )
}

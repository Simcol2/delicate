import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import ConfirmationContent from './ConfirmationContent'

export const metadata: Metadata = {
  title: 'Order Confirmation | Delicate Flowers',
  description: 'Your Delicate Flowers order confirmation.',
  robots: 'noindex',
}

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <Navbar />
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-gray-500">Loading confirmation...</p>
          </div>
        }
      >
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </main>
  )
}

import { Suspense } from 'react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import CheckoutContent from './CheckoutContent'

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

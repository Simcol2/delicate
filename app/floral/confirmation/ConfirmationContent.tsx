'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

const GOOGLE_MERCHANT_ID = 5856492635

export default function ConfirmationContent() {
  const searchParams = useSearchParams()
  const scriptInjected = useRef(false)

  const orderId = searchParams.get('order_id') || ''
  const email = searchParams.get('email') || ''
  const deliveryCountry = searchParams.get('delivery_country') || 'US'
  const estimatedDeliveryDate = searchParams.get('estimated_delivery_date') || ''
  const paymentLink = searchParams.get('payment_link') || ''

  useEffect(() => {
    if (!orderId || !email || scriptInjected.current) return
    scriptInjected.current = true

    ;(window as any).renderOptIn = function () {
      const gapi = (window as any).gapi
      if (!gapi) return
      gapi.load('surveyoptin', function () {
        gapi.surveyoptin.render({
          merchant_id: GOOGLE_MERCHANT_ID,
          order_id: orderId,
          email: email,
          delivery_country: deliveryCountry,
          estimated_delivery_date: estimatedDeliveryDate,
        })
      })
    }

    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [orderId, email, deliveryCountry, estimatedDeliveryDate])

  if (!orderId || !email) {
    return (
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-gray-500">
          We couldn&apos;t find that order. If you just completed checkout, check your email for
          confirmation, or{' '}
          <Link href="/contact" className="text-[#1B5E4F] underline">
            contact us
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 text-center">
      <CheckCircle2 size={64} className="mx-auto text-[#1B5E4F] mb-6" />
      <h1 className="font-serif text-4xl md:text-5xl text-[#1B5E4F] mb-4">
        Thank You For Your Order
      </h1>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Your order has been received and a secure payment link has been sent to{' '}
        <strong>{email}</strong>. Your order confirmation number is{' '}
        <strong>{orderId}</strong>.
      </p>

      {paymentLink && (
        <a
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#1B5E4F] text-white px-8 py-3 rounded hover:bg-[#D4AF37] hover:text-[#1B5E4F] transition-colors font-sans font-semibold tracking-widest uppercase text-sm mb-6"
        >
          Complete Payment
        </a>
      )}

      <p className="text-sm text-gray-500 mb-12">
        Didn&apos;t get the payment link? Check your spam folder or{' '}
        <Link href="/contact" className="text-[#1B5E4F] underline">
          contact us
        </Link>
        .
      </p>

      <div>
        <Link
          href="/floral"
          className="inline-block border-2 border-[#1B5E4F] text-[#1B5E4F] px-8 py-3 rounded hover:bg-[#1B5E4F] hover:text-white transition-colors font-sans font-semibold tracking-widest uppercase text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

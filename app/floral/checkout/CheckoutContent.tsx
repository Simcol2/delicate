'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface CartItem {
  id?: string
  name: string
  quantity: number
  price: number
  image?: string
  squareVariationId?: string | null
}

interface CheckoutData {
  items: CartItem[]
  total: number
}

export default function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const cartParam = searchParams.get('cart')
    if (cartParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(cartParam))
        setCheckoutData(decoded)
      } catch (e) {
        setError('Failed to load cart data')
      }
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkoutData) return

    setIsProcessing(true)
    setError('')

    try {
      const customerResponse = await fetch('/api/square/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: {
            addressLine1: formData.address,
            locality: formData.city,
            administrativeDistrictLevel1: formData.state,
            postalCode: formData.zipCode,
            country: 'US'
          }
        })
      })

      if (!customerResponse.ok) {
        throw new Error('Failed to create customer')
      }

      const customerData = await customerResponse.json()
      const customerId = customerData.customerId

      const orderResponse = await fetch('/api/square/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          lineItems: checkoutData.items.map(item => ({
            name: item.name,
            quantity: item.quantity.toString(),
            squareVariationId: item.squareVariationId || null,
            basePriceMoney: {
              amount: Math.round(item.price * 100),
              currency: 'USD'
            }
          })),
          total: Math.round(checkoutData.total * 100)
        })
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const orderData = await orderResponse.json()

      const invoiceResponse = await fetch('/api/square/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.orderId,
          customerId,
          email: formData.email
        })
      })

      if (!invoiceResponse.ok) {
        throw new Error('Failed to create invoice')
      }

      const invoiceData = await invoiceResponse.json()

      setSuccess(true)

      try {
        localStorage.removeItem('floralCart')
      } catch (e) {
        // ignore storage errors
      }

      const estimatedDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]

      const confirmationParams = new URLSearchParams({
        order_id: orderData.orderId || '',
        email: formData.email,
        delivery_country: 'US',
        estimated_delivery_date: estimatedDeliveryDate,
        payment_link: invoiceData.paymentLink || '',
      })

      setTimeout(() => {
        router.push(`/floral/confirmation?${confirmationParams.toString()}`)
      }, 1200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!checkoutData) {
    return (
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-text-mid">Loading checkout...</p>
      </div>
    )
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6">
      {/* Background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(31, 77, 79, 0.02) 2px, rgba(31, 77, 79, 0.02) 4px)',
          backgroundSize: '4px 100%',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-midnight mb-4">
            Checkout
          </h1>
          <p className="text-text-mid">Complete your order</p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-semibold text-green-900 mb-2">
              Order Created Successfully!
            </h2>
            <p className="text-green-700">
              Redirecting to payment...
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="bg-ivory p-8 border border-midnight/10">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-midnight mb-4">
                      Contact Information
                    </h3>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-midnight/20 rounded mb-3 focus:outline-none focus:border-midnight"
                    />
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-midnight/20 rounded focus:outline-none focus:border-midnight"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-midnight/20 rounded focus:outline-none focus:border-midnight"
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-midnight/20 rounded mt-3 focus:outline-none focus:border-midnight"
                    />
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-midnight mb-4">
                      Delivery Address
                    </h3>
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-midnight/20 rounded mb-3 focus:outline-none focus:border-midnight"
                    />
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-midnight/20 rounded focus:outline-none focus:border-midnight"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-midnight/20 rounded focus:outline-none focus:border-midnight"
                      />
                    </div>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-midnight/20 rounded focus:outline-none focus:border-midnight"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-midnight text-cream py-3 font-sans font-bold tracking-[0.2em] uppercase transition-all hover:bg-rose disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Complete Order - $${checkoutData.total.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-ivory p-6 border border-midnight/10 sticky top-32">
                <h3 className="font-serif text-lg font-semibold text-midnight mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-midnight/10">
                  {checkoutData.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-text-mid">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold text-midnight">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-lg font-semibold text-midnight">
                  <span>Total:</span>
                  <span>${checkoutData.total.toFixed(2)}</span>
                </div>

                <div className="mt-6 p-4 bg-rose/10 border border-rose/20 rounded text-sm text-text-mid">
                  <p className="font-semibold text-midnight mb-2">Secure Payment</p>
                  <p>Powered by Square. Your payment information is encrypted and secure.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

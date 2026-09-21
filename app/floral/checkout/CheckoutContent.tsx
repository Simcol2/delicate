'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
  const searchParams = useSearchParams()
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [cartLoaded, setCartLoaded] = useState(false)

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
    try {
      // Legacy / direct-link support first
      const cartParam = searchParams.get('cart')

      if (cartParam) {
        const decoded = JSON.parse(decodeURIComponent(cartParam))

        if (decoded?.items && Array.isArray(decoded.items)) {
          setCheckoutData(decoded)
          setCartLoaded(true)
          return
        }
      }

      // Normal cart flow: BouquetPurchase writes an ARRAY to localStorage.
      const storedCart = localStorage.getItem('floralCart')

      if (!storedCart) {
        setCheckoutData(null)
        setCartLoaded(true)
        return
      }

      const parsed = JSON.parse(storedCart)

      if (!Array.isArray(parsed) || parsed.length === 0) {
        setCheckoutData(null)
        setCartLoaded(true)
        return
      }

      const items: CartItem[] = parsed.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
        image: item.image,
        squareVariationId: item.squareVariationId || null,
      }))

      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      setCheckoutData({ items, total })
    } catch (e) {
      console.error('Failed to load floral cart:', e)
      setError('We could not load your floral cart. Please return to the floral page and try again.')
      setCheckoutData(null)
    } finally {
      setCartLoaded(true)
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
            country: 'US',
          },
        }),
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
          lineItems: checkoutData.items.map((item) => ({
            name: item.name,
            quantity: item.quantity.toString(),
            squareVariationId: item.squareVariationId || null,
            basePriceMoney: {
              amount: Math.round(item.price * 100),
              currency: 'USD',
            },
          })),
          total: Math.round(checkoutData.total * 100),
        }),
      })

      if (!orderResponse.ok) {
        const result = await orderResponse.json().catch(() => null)
        throw new Error(result?.details || result?.error || 'Failed to create order')
      }

      const orderData = await orderResponse.json()

      const invoiceResponse = await fetch('/api/square/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.orderId,
          customerId,
          email: formData.email,
        }),
      })

      if (!invoiceResponse.ok) {
        const result = await invoiceResponse.json().catch(() => null)
        throw new Error(result?.details || result?.error || 'Failed to create invoice')
      }

      const invoiceData = await invoiceResponse.json()

      setSuccess(true)
      localStorage.removeItem('floralCart')

      if (invoiceData.paymentLink) {
        window.location.href = invoiceData.paymentLink
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsProcessing(false)
    }
  }

  if (!cartLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Loader2 className="animate-spin mx-auto mb-4" size={24} />
        <p className="text-text-mid">Loading checkout...</p>
      </div>
    )
  }

  if (!checkoutData || checkoutData.items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-midnight mb-4">
          Your floral cart is empty
        </h1>

        <p className="text-text-mid mb-8">
          Choose an arrangement from The Floral Edit and it will appear here.
        </p>

        {error && (
          <p className="mb-6 text-red-700">
            {error}
          </p>
        )}

        <Link
          href="/floral"
          className="inline-flex bg-midnight text-cream px-8 py-3 font-sans font-bold tracking-[0.2em] uppercase transition-all hover:bg-rose"
        >
          Return to Floral Edit
        </Link>
      </div>
    )
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6">
      <div className="relative z-10">
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
            <div className="md:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-ivory p-8 border border-midnight/10"
              >
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-6">
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

            <div>
              <div className="bg-ivory p-6 border border-midnight/10 sticky top-32">
                <h3 className="font-serif text-lg font-semibold text-midnight mb-4">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-midnight/10">
                  {checkoutData.items.map((item, idx) => (
                    <div key={`${item.id || item.name}-${idx}`} className="flex gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt=""
                          className="w-14 h-14 object-cover flex-none"
                        />
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-3 text-sm">
                          <span className="text-text-mid">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold text-midnight">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-lg font-semibold text-midnight">
                  <span>Total:</span>
                  <span>${checkoutData.total.toFixed(2)}</span>
                </div>

                <div className="mt-6 p-4 bg-rose/10 border border-rose/20 rounded text-sm text-text-mid">
                  <p className="font-semibold text-midnight mb-2">
                    Secure Payment
                  </p>
                  <p>
                    Powered by Square. Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

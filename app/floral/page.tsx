'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { ShoppingCart, X, Loader2 } from 'lucide-react'

interface Bouquet {
  id: string
  name: string
  category: string
  price: number
  image: string
  available: number
}

const bouquets: Bouquet[] = [
  {
    id: 'blush-romance',
    name: 'Blush Romance',
    category: 'ARRANGEMENT',
    price: 85,
    available: 3,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Blush Peony Rose.jpg'
  },
  {
    id: 'garden-harvest',
    name: 'Garden Harvest',
    category: 'ARRANGEMENT',
    price: 75,
    available: 2,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Sunflower Gerbera.jpg'
  },
  {
    id: 'jeweled-elegance',
    name: 'Jeweled Elegance',
    category: 'ARRANGEMENT',
    price: 95,
    available: 1,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Jeweled Goblet Vases.jpg'
  },
  {
    id: 'citrus-bliss',
    name: 'Citrus Bliss',
    category: 'ARRANGEMENT',
    price: 80,
    available: 4,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Lime Citrus Roses.jpg'
  },
  {
    id: 'rose-cascade',
    name: 'Rose Cascade',
    category: 'ARRANGEMENT',
    price: 90,
    available: 2,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Red Rose Cluster.jpg'
  },
  {
    id: 'silver-hydrangea',
    name: 'Silver Hydrangea',
    category: 'ARRANGEMENT',
    price: 70,
    available: 5,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Silver Vase Hydrangea.jpg'
  }
]

interface CartItem {
  bouquetId: string
  quantity: number
  price: number
}

export default function FloralPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addToCart = (bouquetId: string, price: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.bouquetId === bouquetId)
      if (existing) {
        return prev.map(item =>
          item.bouquetId === bouquetId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { bouquetId, quantity: 1, price }]
    })
  }

  const removeFromCart = (bouquetId: string) => {
    setCartItems(prev => prev.filter(item => item.bouquetId !== bouquetId))
  }

  const updateQuantity = (bouquetId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bouquetId)
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.bouquetId === bouquetId ? { ...item, quantity } : item
        )
      )
    }
  }

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleCheckout = async () => {
    if (cartItems.length === 0) return

    setIsCheckingOut(true)
    try {
      // Create order in Square via API
      const orderData = {
        line_items: cartItems.map(item => {
          const bouquet = bouquets.find(b => b.id === item.bouquetId)
          return {
            name: bouquet?.name || 'Bouquet',
            quantity: item.quantity.toString(),
            base_price_money: {
              amount: Math.round(item.price * 100),
              currency: 'USD'
            }
          }
        }),
        total_money: {
          amount: Math.round(cartTotal * 100),
          currency: 'USD'
        }
      }

      // For now, we'll redirect to a simple checkout page
      // In production, this would integrate with Square's Web Payments SDK
      // Create a cart summary that can be passed through payment processing
      const cartSummary = encodeURIComponent(JSON.stringify({
        items: cartItems.map(item => {
          const bouquet = bouquets.find(b => b.id === item.bouquetId)
          return {
            name: bouquet?.name,
            quantity: item.quantity,
            price: item.price
          }
        }),
        total: cartTotal
      }))

      // Redirect to checkout page (to be created)
      window.location.href = `/floral/checkout?cart=${cartSummary}`
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header Bar */}
      <div className="bg-[#1B5E4F] text-center py-3 mt-20">
        <p className="text-white font-sans text-xs tracking-[0.2em] uppercase">
          Fresh Bouquets For Every Occasion · <span className="text-[#D4AF37] font-semibold cursor-pointer hover:underline">Change</span>
        </p>
      </div>

      {/* Page Title */}
      <div className="bg-white px-6 py-8">
        <h1 className="font-serif-sc text-4xl md:text-5xl text-[#1B5E4F] text-center tracking-[0.08em]">
          Bouquets
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        {/* Bouquets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bouquets.map((bouquet, i) => (
            <div
              key={bouquet.id}
              className={`bg-white border border-gray-200 transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100 + 100}ms` }}
            >
              {/* Image */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <img
                  src={bouquet.image}
                  alt={bouquet.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-[#999] font-sans text-xs tracking-[0.15em] uppercase mb-2">
                  {bouquet.category}
                </p>
                <h3 className="font-serif text-2xl text-[#1B5E4F] mb-2">
                  {bouquet.name}
                </h3>
                <p className="text-[#999] font-sans text-sm mb-4">
                  {bouquet.available} available
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-[#D4AF37] font-sans text-sm font-semibold tracking-[0.1em]">
                      RENT ${bouquet.price} / EVENT
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(bouquet.id, bouquet.price)}
                    className="text-[#1B5E4F] font-sans text-xs font-semibold tracking-[0.1em] uppercase hover:text-[#D4AF37] transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl transition-transform duration-300 z-[200] border-l border-gray-200 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart Header */}
        <div className="sticky top-0 bg-[#1B5E4F] text-white p-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl">Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-12 font-sans text-sm">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map(item => {
                const bouquet = bouquets.find(b => b.id === item.bouquetId)
                return (
                  <div key={item.bouquetId} className="border-b border-gray-200 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif text-lg text-[#1B5E4F]">{bouquet?.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.bouquetId)}
                        className="text-gray-400 hover:text-[#1B5E4F] transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => updateQuantity(item.bouquetId, item.quantity - 1)}
                        className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors text-[#1B5E4F] font-sans text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-[#1B5E4F]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.bouquetId, item.quantity + 1)}
                        className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors text-[#1B5E4F] font-sans text-sm"
                      >
                        +
                      </button>
                      <span className="ml-auto font-semibold text-[#1B5E4F]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between text-lg font-semibold text-[#1B5E4F]">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#1B5E4F] text-white py-3 font-sans font-bold tracking-[0.2em] uppercase transition-all hover:bg-[#0f3d36] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </button>
          </div>
        )}
      </div>

      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed bottom-8 right-8 bg-[#1B5E4F] text-white p-4 rounded-full shadow-lg hover:bg-[#0f3d36] transition-colors z-[150] flex items-center justify-center gap-2"
      >
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#1B5E4F] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <Footer />
    </main>
  )
}

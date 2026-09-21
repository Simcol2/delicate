'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { ShoppingCart, X, Loader2 } from 'lucide-react'

interface Bouquet {
  id: string
  name: string
  description: string
  price: number
  image: string
}

const TEXTURE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch' result='noise'/><feColorMatrix in='noise' type='matrix' values='0 0 0 0 0.76  0 0 0 0 0.60  0 0 0 0 0.32  0 0 0 1 0' result='gold'/><feComponentTransfer in='gold'><feFuncA type='gamma' amplitude='1' exponent='9' offset='0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
const TEXTURE_BACKGROUND = `url("data:image/svg+xml,${encodeURIComponent(TEXTURE_SVG)}")`

const bouquets: Bouquet[] = [
  {
    id: 'blush-romance',
    name: 'Blush Romance',
    description: 'Soft pink peonies and garden roses with delicate greenery',
    price: 85,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Blush Peony Rose.jpg'
  },
  {
    id: 'garden-harvest',
    name: 'Garden Harvest',
    description: 'Vibrant mixed florals with sunflowers, gerberas, and roses',
    price: 75,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Sunflower Gerbera.jpg'
  },
  {
    id: 'jeweled-elegance',
    name: 'Jeweled Elegance',
    description: 'Rich jewel tones in an elegant vase arrangement',
    price: 95,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Jeweled Goblet Vases.jpg'
  },
  {
    id: 'citrus-bliss',
    name: 'Citrus Bliss',
    description: 'Warm citrus and gold tones with premium roses',
    price: 80,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Lime Citrus Roses.jpg'
  },
  {
    id: 'rose-cascade',
    name: 'Rose Cascade',
    description: 'Cascading arrangement of premium red roses',
    price: 90,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Red Rose Cluster.jpg'
  },
  {
    id: 'silver-hydrangea',
    name: 'Silver Hydrangea',
    description: 'Elegant blue hydrangea in a modern silver vase',
    price: 70,
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
    <main className="min-h-screen bg-cream pt-32 lg:pt-40 pb-20 relative">
      <Navbar />

      {/* Layer 0 is the bg-cream above. Layer 1: page-wide texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: TEXTURE_BACKGROUND,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          opacity: 0.85,
        }}
      />
      {/* Soft glossy sheen */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.15) 48%, transparent 60%)',
          backgroundSize: '160% 160%',
          mixBlendMode: 'soft-light',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="section-label justify-center">Shop</p>
          <h1 className="section-title">
            Exquisite <em className="text-rose">Bouquets</em>
          </h1>
          <p className="font-sans text-text-mid text-lg mt-6">
            Hand-arranged fresh flowers delivered to celebrate your special moments.
          </p>
        </div>

        {/* Bouquets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {bouquets.map((bouquet, i) => (
            <div
              key={bouquet.id}
              className={`group transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="relative mx-auto w-full max-w-[280px] aspect-[3/4] overflow-hidden mb-4 bg-ivory rounded-t-full shadow-[0_18px_35px_-12px_rgba(31,77,79,0.35)] transition-shadow duration-500 group-hover:shadow-[0_24px_42px_-10px_rgba(31,77,79,0.45)]">
                <img
                  src={bouquet.image}
                  alt={bouquet.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                  <span className="text-cream font-sans text-xs tracking-[0.2em] uppercase">
                    ${bouquet.price}
                  </span>
                  <button
                    onClick={() => addToCart(bouquet.id, bouquet.price)}
                    className="bg-rose text-cream font-sans text-xs tracking-[0.2em] uppercase px-6 py-2 transition-all hover:bg-coral"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="border-t border-midnight/10 pt-4 text-center">
                <h3 className="font-serif-sc text-2xl md:text-3xl font-semibold tracking-[0.06em] text-midnight">
                  {bouquet.name}
                </h3>
                <p className="font-sans text-sm text-text-mid mt-2">
                  {bouquet.description}
                </p>
                <p className="font-sans text-lg font-semibold text-midnight mt-3">
                  ${bouquet.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shop Now CTA */}
        {cartItems.length === 0 && (
          <div className="text-center">
            <p className="text-text-mid mb-6">Select bouquets above to get started</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-cream shadow-2xl transition-transform duration-300 z-[200] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart Header */}
        <div className="sticky top-0 bg-midnight text-cream p-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl">Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-dark/20 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <p className="text-text-mid text-center py-12">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map(item => {
                const bouquet = bouquets.find(b => b.id === item.bouquetId)
                return (
                  <div key={item.bouquetId} className="border-b border-midnight/10 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif text-lg text-midnight">{bouquet?.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.bouquetId)}
                        className="text-coral hover:text-rose transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => updateQuantity(item.bouquetId, item.quantity - 1)}
                        className="px-3 py-1 border border-midnight/20 hover:bg-midnight/5 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.bouquetId, item.quantity + 1)}
                        className="px-3 py-1 border border-midnight/20 hover:bg-midnight/5 transition-colors"
                      >
                        +
                      </button>
                      <span className="ml-auto font-semibold text-midnight">
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
          <div className="sticky bottom-0 bg-ivory border-t border-midnight/10 p-6 space-y-4">
            <div className="flex justify-between text-lg font-semibold text-midnight">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-midnight text-cream py-3 font-sans font-bold tracking-[0.2em] uppercase transition-all hover:bg-rose disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        className="fixed bottom-8 right-8 bg-rose text-cream p-4 rounded-full shadow-lg hover:bg-coral transition-colors z-[150] flex items-center justify-center gap-2"
      >
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-midnight text-cream text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <Footer />
    </main>
  )
}

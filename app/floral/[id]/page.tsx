'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { ChevronLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { bouquets } from '../page'

export default function BouquetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const bouquet = bouquets.find(b => b.id === params.id as string)

  if (!bouquet) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="font-serif-sc text-4xl text-[#1B5E4F] mb-4">Bouquet Not Found</h1>
          <Link href="/floral" className="text-[#D4AF37] font-sans font-semibold hover:underline">
            ← Back to Bouquets
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const cartItem = {
        id: bouquet.id,
        name: bouquet.name,
        price: bouquet.price,
        quantity
      }

      // Store in session/localStorage for now
      const cart = JSON.parse(localStorage.getItem('floralCart') || '[]')
      const existingItem = cart.find((item: any) => item.id === bouquet.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.push(cartItem)
      }

      localStorage.setItem('floralCart', JSON.stringify(cart))

      // Show success and redirect to checkout
      setTimeout(() => {
        router.push('/floral/checkout')
      }, 500)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
        {/* Back Button */}
        <Link href="/floral" className="flex items-center gap-2 text-[#1B5E4F] hover:text-[#D4AF37] transition-colors mb-8 w-fit">
          <ChevronLeft size={20} />
          <span className="font-sans text-sm font-semibold tracking-[0.1em] uppercase">Back to Bouquets</span>
        </Link>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-white shadow-lg overflow-hidden">
            <img
              src={bouquet.image}
              alt={bouquet.name}
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[#999] font-sans text-xs tracking-[0.15em] uppercase mb-4">
                {bouquet.category}
              </p>
              <h1 className="font-serif-sc text-5xl text-[#1B5E4F] mb-6">
                {bouquet.name}
              </h1>
              <p className="text-[#666] font-sans text-lg leading-relaxed mb-8">
                {bouquet.description}
              </p>

              {/* Product Info */}
              <div className="space-y-4 mb-8 p-6 bg-gray-50 border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-[#999] font-sans text-sm">Availability</span>
                  <span className="text-[#1B5E4F] font-semibold">{bouquet.available} in stock</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#999] font-sans text-sm">Category</span>
                  <span className="text-[#1B5E4F] font-semibold">{bouquet.category}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-[#999] font-sans text-xs tracking-[0.15em] uppercase mb-2">Price</p>
                <p className="font-serif-sc text-5xl text-[#D4AF37]">
                  ${bouquet.price}
                </p>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="space-y-4">
              {/* Quantity */}
              <div>
                <p className="text-[#999] font-sans text-xs tracking-[0.15em] uppercase mb-3">Quantity</p>
                <div className="flex items-center border border-gray-300 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-[#1B5E4F] hover:bg-gray-50 transition-colors font-sans text-lg"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-[#1B5E4F] font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-[#1B5E4F] hover:bg-gray-50 transition-colors font-sans text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || bouquet.available === 0}
                className="w-full bg-[#1B5E4F] text-white py-4 font-sans font-bold tracking-[0.2em] uppercase transition-all hover:bg-[#0f3d36] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>

              {bouquet.available === 0 && (
                <p className="text-red-600 font-sans text-sm text-center">Out of stock</p>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-20 bg-white p-12 border border-gray-200">
          <h2 className="font-serif-sc text-3xl text-[#1B5E4F] mb-6">About This Bouquet</h2>
          <p className="text-[#666] font-sans text-lg leading-relaxed mb-4">
            {bouquet.description}
          </p>
          <ul className="space-y-3 text-[#666] font-sans">
            <li className="flex gap-3">
              <span className="text-[#D4AF37]">✓</span>
              <span>Hand-arranged with premium fresh flowers</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#D4AF37]">✓</span>
              <span>Carefully crafted by our expert florists</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#D4AF37]">✓</span>
              <span>Delivered fresh to your door</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#D4AF37]">✓</span>
              <span>Perfect for any special occasion</span>
            </li>
          </ul>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="font-serif-sc text-3xl text-[#1B5E4F] mb-8">More Bouquets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bouquets
              .filter(b => b.id !== bouquet.id)
              .slice(0, 3)
              .map(relatedBouquet => (
                <Link
                  key={relatedBouquet.id}
                  href={`/floral/${relatedBouquet.id}`}
                  className="group"
                >
                  <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={relatedBouquet.image}
                        alt={relatedBouquet.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-[#1B5E4F] mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {relatedBouquet.name}
                      </h3>
                      <p className="text-[#D4AF37] font-sans font-semibold">${relatedBouquet.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

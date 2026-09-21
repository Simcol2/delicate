'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import type { Bouquet } from '@/lib/floral'

export default function BouquetPurchase({ bouquet }: { bouquet: Bouquet }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    try {
      const cart = JSON.parse(localStorage.getItem('floralCart') || '[]')
      const existing = cart.find((item: any) => item.id === bouquet.id)

      if (existing) {
        existing.quantity += quantity
      } else {
        cart.push({
          id: bouquet.id,
          name: bouquet.name,
          price: bouquet.price,
          quantity,
          image: bouquet.image,
          squareCatalogItemId: bouquet.squareCatalogItemId || null,
          squareVariationId: bouquet.squareVariationId || null,
        })
      }

      localStorage.setItem('floralCart', JSON.stringify(cart))
      router.push('/floral/checkout')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div>
      <p className="font-sans text-[0.62rem] font-semibold tracking-[0.26em] uppercase text-[#1F4D4F] mb-3">Quantity</p>

      <div className="flex items-center w-full max-w-[180px] border border-[#1F4D4F]/25 mb-5">
        <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="w-14 h-12 text-xl text-[#1F4D4F]">−</button>
        <span className="flex-1 text-center font-sans text-[#1F4D4F]">{quantity}</span>
        <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)} className="w-14 h-12 text-xl text-[#1F4D4F]">+</button>
      </div>

      <button
        type="button"
        disabled={isAdding || bouquet.available === 0}
        onClick={handleAddToCart}
        className="btn-primary w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingCart size={18} />
        <span>{bouquet.available === 0 ? 'Currently Unavailable' : isAdding ? 'Adding...' : 'Add to Floral Cart'}</span>
      </button>
    </div>
  )
}

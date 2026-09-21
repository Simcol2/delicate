'use client'

import { useMemo, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import type { FloralCatalogItem } from '@/lib/floralCatalogShared'

export default function ProductPurchase({
  item,
}: {
  item: FloralCatalogItem
}) {
  const purchasable = useMemo(
    () =>
      item.variations.filter(
        (variation) => typeof variation.price === 'number'
      ),
    [item.variations]
  )

  const [variationId, setVariationId] = useState(
    purchasable[0]?.id || item.variations[0]?.id || ''
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const selected =
    item.variations.find((variation) => variation.id === variationId) ||
    item.variations[0]

  const addToCart = () => {
    if (!selected || typeof selected.price !== 'number') return

    const cart = JSON.parse(localStorage.getItem('floralCart') || '[]')
    const cartKey = `${item.id}:${selected.id}`

    const existing = cart.find(
      (cartItem: any) =>
        `${cartItem.id}:${cartItem.squareVariationId}` === cartKey
    )

    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({
        id: item.id,
        name:
          item.variations.length > 1
            ? `${item.name} — ${selected.name}`
            : item.name,
        price: selected.price,
        quantity,
        image: item.image,
        squareCatalogItemId: item.id,
        squareVariationId: selected.id,
      })
    }

    localStorage.setItem('floralCart', JSON.stringify(cart))
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div>
      {item.variations.length > 1 && (
        <div className="mb-5">
          <label
            htmlFor="variation"
            className="block font-sans text-[0.62rem] font-semibold tracking-[0.26em] uppercase text-[#1F4D4F] mb-2"
          >
            Choose an option
          </label>

          <select
            id="variation"
            value={variationId}
            onChange={(event) => setVariationId(event.target.value)}
            className="w-full border border-[#1F4D4F]/25 bg-white px-4 py-3 text-[#1F4D4F]"
          >
            {item.variations.map((variation) => (
              <option key={variation.id} value={variation.id}>
                {variation.name}
                {typeof variation.price === 'number'
                  ? ` — $${variation.price.toFixed(2)}`
                  : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center w-full max-w-[180px] border border-[#1F4D4F]/25 mb-5 bg-white">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() =>
            setQuantity((current) => Math.max(1, current - 1))
          }
          className="w-14 h-12 text-xl text-[#1F4D4F]"
        >
          −
        </button>

        <span className="flex-1 text-center font-sans text-[#1F4D4F]">
          {quantity}
        </span>

        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((current) => current + 1)}
          className="w-14 h-12 text-xl text-[#1F4D4F]"
        >
          +
        </button>
      </div>

      <button
        type="button"
        disabled={!selected || typeof selected.price !== 'number'}
        onClick={addToCart}
        className="w-full sm:w-auto min-w-[260px] bg-[#1F4D4F] text-white px-7 py-4 inline-flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[#FF6F61] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingBag size={18} />
        {added ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  )
}

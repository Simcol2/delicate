'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import type { FloralCatalogItem } from '@/lib/floralCatalogShared'
import { floralProductHref } from '@/lib/floralCatalogShared'

interface Props {
  featuredCategoryName: string
  featuredItems: FloralCatalogItem[]
  catalogCategoryName: string
  catalogItems: FloralCatalogItem[]
}

function displayPrice(item: FloralCatalogItem) {
  const prices = item.variations
    .map((variation) => variation.price)
    .filter((price): price is number => typeof price === 'number')

  if (prices.length === 0) {
    return 'Price on request'
  }

  const lowest = Math.min(...prices)
  const highest = Math.max(...prices)

  if (lowest !== highest) {
    return `From $${lowest.toFixed(0)}`
  }

  return `$${lowest.toFixed(0)}`
}

function defaultVariation(item: FloralCatalogItem) {
  return (
    item.variations.find((variation) => typeof variation.price === 'number') ||
    item.variations[0]
  )
}

function ProductImage({
  item,
  className,
}: {
  item: FloralCatalogItem
  className: string
}) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.imageAlt || item.name}
        className={className}
      />
    )
  }

  return (
    <div
      className={`${className} bg-[#F1F7F3] flex items-center justify-center`}
      aria-label={`${item.name} image coming soon`}
    >
      <div className="text-center px-5">
        <span className="block font-serif italic text-2xl text-[#FF6F61]">
          Delicate
        </span>
        <span className="block font-sans text-[0.58rem] tracking-[0.24em] uppercase text-[#1F4D4F] mt-1">
          Image Coming Soon
        </span>
      </div>
    </div>
  )
}

export default function FloralShop({
  featuredCategoryName,
  featuredItems,
  catalogCategoryName,
  catalogItems,
}: Props) {
  const [justAdded, setJustAdded] = useState<string | null>(null)

  const addToCart = (item: FloralCatalogItem) => {
    const variation = defaultVariation(item)

    if (!variation || typeof variation.price !== 'number') {
      window.location.href = floralProductHref(item)
      return
    }

    const cart = JSON.parse(localStorage.getItem('floralCart') || '[]')
    const cartKey = `${item.id}:${variation.id}`

    const existing = cart.find(
      (cartItem: any) =>
        `${cartItem.id}:${cartItem.squareVariationId}` === cartKey
    )

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: variation.price,
        quantity: 1,
        image: item.image,
        squareCatalogItemId: item.id,
        squareVariationId: variation.id,
      })
    }

    localStorage.setItem('floralCart', JSON.stringify(cart))
    setJustAdded(cartKey)

    window.setTimeout(() => {
      setJustAdded((current) => (current === cartKey ? null : current))
    }, 1400)
  }

  return (
    <>
      {featuredItems.length > 0 && (
        <section className="max-w-[1180px] mx-auto px-6 lg:px-10 pt-10 sm:pt-14">
          <div className="flex items-end justify-between gap-6 border-b border-[#1F4D4F]/18 pb-5">
            <div>
              <p className="font-sans text-[0.62rem] sm:text-xs font-semibold tracking-[0.34em] uppercase text-[#FF6F61]">
                {featuredCategoryName}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1F4D4F] mt-2">
                A few favourites.
              </h2>
            </div>

            <p className="hidden sm:block font-serif italic text-lg text-[#5A625F]">
              Fresh. Refined. Very Palm Springs.
            </p>
          </div>

          <div>
            {featuredItems.map((item) => (
              <article
                key={item.id}
                className="border-b border-[#1F4D4F]/14 py-5 sm:py-6"
              >
                <div className="grid grid-cols-[118px_1fr] sm:grid-cols-[230px_1fr] lg:grid-cols-[300px_1fr] gap-4 sm:gap-8 lg:gap-10 items-center">
                  <Link
                    href={floralProductHref(item)}
                    className="group block overflow-hidden bg-[#F1F7F3] shadow-[0_10px_28px_rgba(31,77,79,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(31,77,79,0.14)]"
                  >
                    <div className="aspect-[1.12/1] overflow-hidden">
                      <ProductImage
                        item={item}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </Link>

                  <div className="min-w-0 py-1">
                    <p className="font-sans text-[0.56rem] sm:text-[0.62rem] tracking-[0.26em] uppercase text-[#0F6A5D] mb-2">
                      {featuredCategoryName}
                    </p>

                    <Link href={floralProductHref(item)} className="group">
                      <h3 className="font-serif text-[1.65rem] sm:text-[2.35rem] lg:text-[2.7rem] leading-none text-[#1F4D4F] group-hover:text-[#FF6F61] transition-colors">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="font-serif text-[0.95rem] sm:text-[1.15rem] lg:text-[1.25rem] leading-[1.25] text-[#505552] mt-2 line-clamp-2 max-w-[650px]">
                          {item.description}
                        </p>
                      )}
                    </Link>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-4">
                      <p className="font-sans text-sm font-semibold tracking-[0.14em] uppercase text-[#C38C2E]">
                        {displayPrice(item)}
                      </p>

                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="inline-flex items-center gap-2 bg-[#1F4D4F] text-white px-4 py-2.5 font-sans text-[0.58rem] sm:text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[#FF6F61] hover:-translate-y-0.5"
                      >
                        <ShoppingBag size={14} />
                        {justAdded ===
                        `${item.id}:${defaultVariation(item)?.id}`
                          ? 'Added'
                          : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-[1180px] mx-auto px-6 lg:px-10 pt-14 sm:pt-20 pb-6">
        <div className="mb-8 sm:mb-10">
          <p className="font-sans text-[0.62rem] sm:text-xs font-semibold tracking-[0.34em] uppercase text-[#FF6F61]">
            Shop {catalogCategoryName}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-2">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1F4D4F]">
              The full floral collection.
            </h2>

            <p className="font-serif italic text-base sm:text-lg text-[#5A625F]">
              {catalogItems.length}{' '}
              {catalogItems.length === 1 ? 'arrangement' : 'arrangements'}
            </p>
          </div>
        </div>

        {catalogItems.length === 0 ? (
          <div className="bg-white/80 border border-[#1F4D4F]/10 p-8 sm:p-12 text-center shadow-[0_18px_50px_rgba(31,77,79,0.08)]">
            <h3 className="font-serif text-3xl text-[#1F4D4F]">
              Fresh florals are being added.
            </h3>
            <p className="font-serif text-lg text-[#5A625F] mt-4">
              Products assigned to the Square category “floral” will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {catalogItems.map((item) => {
              const variation = defaultVariation(item)
              const cartKey = `${item.id}:${variation?.id}`

              return (
                <article
                  key={item.id}
                  className="group bg-white/90 border border-[#1F4D4F]/10 shadow-[0_12px_34px_rgba(31,77,79,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(31,77,79,0.15)]"
                >
                  <Link href={floralProductHref(item)} className="block">
                    <div className="aspect-[4/3] overflow-hidden bg-[#F1F7F3]">
                      <ProductImage
                        item={item}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="px-5 sm:px-6 pt-5">
                      <p className="font-sans text-[0.55rem] tracking-[0.24em] uppercase text-[#0F6A5D]">
                        {catalogCategoryName}
                      </p>

                      <h3 className="font-serif text-2xl sm:text-[1.85rem] leading-tight text-[#1F4D4F] mt-2 group-hover:text-[#FF6F61] transition-colors">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="font-serif text-base leading-[1.35] text-[#5A625F] mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Link>

                  <div className="flex items-center justify-between gap-4 px-5 sm:px-6 pt-4 pb-6">
                    <span className="font-sans text-sm font-semibold tracking-[0.12em] uppercase text-[#C38C2E]">
                      {displayPrice(item)}
                    </span>

                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="inline-flex items-center justify-center gap-2 bg-[#1F4D4F] text-white px-4 sm:px-5 py-3 font-sans text-[0.58rem] sm:text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 hover:bg-[#FF6F61] hover:-translate-y-0.5"
                    >
                      <ShoppingBag size={15} />
                      {justAdded === cartKey ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}

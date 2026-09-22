import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ShoppingCart } from 'lucide-react'
import {
  floralProductHref,
  getFloralCatalog,
  getFloralItemById,
  squareIdFromRouteParam,
} from '@/lib/squareCatalog'
import ProductPurchase from './ProductPurchase'
import { SITE_URL } from '@/lib/seo'

interface Props {
  params: { id: string }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const squareId = squareIdFromRouteParam(params.id)
  const item = await getFloralItemById(squareId)

  if (!item) {
    return {
      title: 'Floral Arrangement Not Found | Delicate Flowers',
    }
  }

  const price = item.variations
    .map((variation) => variation.price)
    .find((value): value is number => typeof value === 'number')

  const description =
    item.description ||
    `${item.name}, available from Delicate Flowers in Palm Springs.`

  return {
    title: `${item.name} | Delicate Flowers Palm Springs`,
    description,
    alternates: {
      canonical: floralProductHref(item),
    },
    openGraph: {
      title: item.name,
      description,
      type: 'website',
      url: floralProductHref(item),
      images: item.image
        ? [
            {
              url: item.image,
              alt: item.imageAlt || item.name,
            },
          ]
        : undefined,
    },
    other: price
      ? {
          'product:price:amount': price.toFixed(2),
          'product:price:currency':
            item.variations[0]?.currency || 'USD',
        }
      : undefined,
  }
}

export default async function FloralProductPage({ params }: Props) {
  const squareId = squareIdFromRouteParam(params.id)
  const item = await getFloralItemById(squareId)

  if (!item) {
    notFound()
  }

  const catalog = await getFloralCatalog()
  const related = catalog.items
    .filter((candidate) => candidate.id !== item.id)
    .slice(0, 4)

  const prices = item.variations
    .map((variation) => variation.price)
    .filter((value): value is number => typeof value === 'number')

  const lowest = prices.length ? Math.min(...prices) : null
  const highest = prices.length ? Math.max(...prices) : null

  const priceLabel =
    lowest === null
      ? 'Price on request'
      : lowest === highest
        ? `$${lowest.toFixed(0)}`
        : `From $${lowest.toFixed(0)}`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.name,
    description: item.description,
    image: item.image ? [item.image] : undefined,
    category: item.category.name,
    url: `${SITE_URL}${floralProductHref(item)}`,
    offers:
      lowest !== null
        ? {
            '@type': 'Offer',
            price: lowest.toFixed(2),
            priceCurrency: item.variations[0]?.currency || 'USD',
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}${floralProductHref(item)}`,
          }
        : undefined,
  }

  return (
    <main
      className="min-h-screen bg-[#FCFBF7] text-[#1F4D4F] pt-28 pb-16"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(31,77,79,0.045) 1px, transparent 0)',
        backgroundSize: '18px 18px',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
        <Link
          href="/floral"
          className="inline-flex items-center gap-2 text-[#1F4D4F] hover:text-[#FF6F61] mb-8 transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="font-sans text-xs font-semibold tracking-[0.15em] uppercase">
            Back to Floral
          </span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div className="bg-white border border-[#1F4D4F]/10 shadow-[0_18px_50px_rgba(31,77,79,0.10)] overflow-hidden">
            <div className="aspect-[4/5]">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.imageAlt || item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#F1F7F3] flex items-center justify-center text-center">
                  <div>
                    <span className="block font-serif italic text-4xl text-[#FF6F61]">
                      Delicate
                    </span>
                    <span className="block font-sans text-xs tracking-[0.24em] uppercase mt-2">
                      Image Coming Soon
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:pt-6">
            <p className="font-sans text-[0.62rem] font-semibold tracking-[0.28em] uppercase text-[#FF6F61]">
              {item.category.name}
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[0.98] mt-3">
              {item.name}
            </h1>

            <p className="font-sans text-lg font-semibold tracking-[0.08em] uppercase text-[#C38C2E] mt-5">
              {priceLabel}
            </p>

            {item.description && (
              <p className="font-serif text-lg sm:text-xl leading-[1.5] text-[#505552] mt-6 mb-8">
                {item.description}
              </p>
            )}

            <ProductPurchase item={item} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <div className="flex items-end justify-between gap-4 mb-7">
              <div>
                <p className="font-sans text-[0.6rem] tracking-[0.28em] uppercase text-[#FF6F61]">
                  More from the floral edit
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl mt-2">
                  You may also like.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((relatedItem) => (
                <Link
                  key={relatedItem.id}
                  href={floralProductHref(relatedItem)}
                  className="group bg-white border border-[#1F4D4F]/10 shadow-[0_10px_28px_rgba(31,77,79,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(31,77,79,0.14)]"
                >
                  <div className="aspect-square overflow-hidden bg-[#F1F7F3]">
                    {relatedItem.image ? (
                      <img
                        src={relatedItem.image}
                        alt={relatedItem.imageAlt || relatedItem.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-center px-3">
                        <span className="font-serif italic text-[#FF6F61]">
                          Delicate
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-serif text-lg sm:text-xl group-hover:text-[#FF6F61] transition-colors">
                      {relatedItem.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Link
        href="/floral/checkout"
        aria-label="View floral cart"
        className="fixed z-40 right-5 bottom-5 sm:right-8 sm:bottom-8 w-[64px] h-[64px] rounded-full bg-[#0F6A5D] text-white flex items-center justify-center shadow-[0_14px_35px_rgba(15,106,93,0.28)] transition-all duration-300 hover:-translate-y-1"
      >
        <ShoppingCart size={27} strokeWidth={1.8} />
      </Link>
    </main>
  )
}

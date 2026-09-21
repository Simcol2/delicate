import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getBouquetById, bouquets } from '@/lib/floral'
import BouquetPurchase from './BouquetPurchase'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/structuredData'
import { SITE_URL } from '@/lib/seo'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bouquet = getBouquetById(params.id)

  if (!bouquet) {
    return {
      title: 'Bouquet Not Found | Delicate Flowers',
    }
  }

  const title = `${bouquet.name} | Premium Floral Arrangement | Delicate Flowers`
  const description = `${bouquet.shortDescription} Hand-designed by Delicate Flowers in Palm Springs. $${bouquet.price}.`

  return {
    title,
    description,
    alternates: {
      canonical: `/floral/${bouquet.id}`,
    },
    openGraph: {
      title: bouquet.name,
      description: bouquet.shortDescription,
      type: 'website',
      url: `/floral/${bouquet.id}`,
      images: [
        {
          url: bouquet.image,
          width: 1200,
          height: 1200,
          alt: bouquet.name,
        },
      ],
    },
  }
}

export function generateStaticParams() {
  return bouquets.map((bouquet) => ({
    id: bouquet.id,
  }))
}

export default function BouquetPage({ params }: Props) {
  const bouquet = getBouquetById(params.id)

  if (!bouquet) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-gray-600">Bouquet not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedBouquets = bouquets
    .filter((b) => b.id !== bouquet.id)
    .slice(0, 3)

  const productSchema = generateProductSchema({
    name: bouquet.name,
    description: bouquet.description,
    price: bouquet.price,
    image: `${SITE_URL}${bouquet.image}`,
    url: `/floral/${bouquet.id}`,
    availability: bouquet.available > 0 ? 'InStock' : 'OutOfStock',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Floral', url: '/floral' },
      { name: bouquet.name, url: `/floral/${bouquet.id}` },
    ],
  })

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/floral"
          className="inline-flex items-center gap-2 text-[#1F4D4F] hover:opacity-70 mb-8"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-medium">Back to Gallery</span>
        </Link>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden h-[500px]">
            <img
              src={bouquet.image}
              alt={bouquet.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="font-sans text-[0.62rem] font-semibold tracking-[0.26em] uppercase text-[#1F4D4F] mb-3">
              {bouquet.category}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl text-[#1F4D4F] mb-4">
              {bouquet.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-serif text-[#D4AF37]">
                ${bouquet.price}
              </span>
              <span className="text-sm text-gray-600">
                {bouquet.available > 0
                  ? `${bouquet.available} available`
                  : 'Currently unavailable'}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">
              {bouquet.description}
            </p>

            {/* Purchase Component */}
            <BouquetPurchase bouquet={bouquet} />
          </div>
        </div>

        {/* Related Bouquets */}
        {relatedBouquets.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl text-[#1F4D4F] mb-8">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBouquets.map((related) => (
                <Link
                  key={related.id}
                  href={`/floral/${related.id}`}
                  className="group"
                >
                  <div className="mb-4 overflow-hidden rounded-lg bg-gray-50 h-64 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-lg text-[#1F4D4F] group-hover:text-[#D4AF37] transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    ${related.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

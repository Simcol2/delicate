import type { Metadata } from 'next'
import Link from 'next/link'
import { bouquets } from '@/lib/floral'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES } from '@/lib/seo'

const floralMeta = PAGES.floral

export const metadata: Metadata = {
  title: floralMeta.title,
  description: floralMeta.description,
  keywords: floralMeta.keywords,
  alternates: {
    canonical: floralMeta.canonical,
  },
  openGraph: {
    title: floralMeta.ogTitle,
    description: floralMeta.ogDescription,
    type: 'website',
    url: floralMeta.canonical,
  },
}

export default function FloralPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20">
        {/* Header Section */}
        <div className="w-full bg-[#1B5E4F] py-8 mb-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">
              Floral Arrangements
            </h1>
            <p className="text-white/90 max-w-2xl">
              Handcrafted arrangements designed for celebrations, intimate dinners, and special occasions. Each bouquet is created with precision and care.
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {bouquets.map((bouquet) => (
              <Link
                key={bouquet.id}
                href={`/floral/${bouquet.id}`}
                className="group"
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 mb-4">
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      src={bouquet.image}
                      alt={bouquet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-sans text-xs font-semibold tracking-widest uppercase text-[#1B5E4F]">
                    {bouquet.category}
                  </p>
                  <h3 className="font-serif text-2xl text-[#1B5E4F] group-hover:text-[#D4AF37] transition-colors">
                    {bouquet.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {bouquet.shortDescription}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-serif text-xl text-[#D4AF37]">
                      ${bouquet.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      {bouquet.available > 0
                        ? `${bouquet.available} available`
                        : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-20 max-w-7xl mx-auto px-6">
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <h2 className="font-serif text-3xl text-[#1B5E4F] mb-4">
              About Our Arrangements
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each of our floral arrangements is thoughtfully designed to reflect the light and landscape of Palm Springs. We source premium flowers and greenery to create stunning pieces that elevate any occasion.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're celebrating a special milestone, hosting an intimate gathering, or simply looking to brighten your space, our curated collection offers arrangements for every style and budget.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

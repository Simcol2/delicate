import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const floralMeta = PAGES.floralArrangementsPortfolio

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
    type: 'article',
    url: floralMeta.canonical,
  },
}

export default function FloralArrangementsPortfolioPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Floral Arrangements',
    description: 'Custom floral arrangement designs for events, gifts, and special occasions throughout Palm Springs.',
    url: '/experiences/floral-arrangements',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Portfolio', url: '/experiences' },
      { name: 'Floral Arrangements', url: '/experiences/floral-arrangements' },
    ],
  })

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-[#1F4D4F] hover:opacity-70 mb-8"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
        </div>

        <div className="w-full bg-[#1B5E4F] py-12 mb-12">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Floral Arrangements
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Custom floral arrangements and bouquets for events, celebrations, and special moments throughout Palm Springs.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  The Art of Floral Design
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A well-designed floral arrangement is more than color and blooms—it's intention. It's the right flowers chosen for the right moment, arranged with precision and care. At Delicate Flowers, we create arrangements that feel fresh, thoughtful, and authentically beautiful.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Whether you're looking for a timeless hand-tied bouquet, a sculptural arrangement for your dining table, or a dramatic installation for an event, we design flowers that suit the occasion and elevate the space they inhabit. Each arrangement is made to order, using premium blooms and seasonal greenery.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Arrangement Types
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Hand-Tied Bouquets</h3>
                    <p className="leading-relaxed">
                      Classic arrangements with natural movement. Perfect for gifting, celebrations, or enjoying at home. Each bouquet is designed to look beautiful in a vase with minimal arranging required.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Sculptural Arrangements</h3>
                    <p className="leading-relaxed">
                      Arrangements designed as statement pieces. Structured, architectural, and meant to be noticed. Perfect for tables, entryways, or focal points in your home.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Event Centerpieces</h3>
                    <p className="leading-relaxed">
                      Designed specifically for your event. Low arrangements for conversation, tall pieces for drama, or custom designs that coordinate with your overall vision.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Seasonal & Themed Designs</h3>
                    <p className="leading-relaxed">
                      Arrangements that celebrate the season or match your theme. From spring garden arrangements to holiday designs, we create flowers for every occasion.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Custom Creations</h3>
                    <p className="leading-relaxed">
                      Can't find exactly what you're looking for? We create custom arrangements based on your color palette, flower preferences, and vision. Let's collaborate.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  What Makes Our Arrangements Different
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We source premium flowers and work with growers who share our commitment to quality. We design with color theory, texture, movement, and lasting beauty in mind. Every stem is fresh, every arrangement is made with care, and every detail reflects our dedication to the craft.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We're not following trends—we're creating timeless designs. Your arrangement is meant to be beautiful not just on day one, but throughout its life. We choose flowers and mechanics that ensure longevity and continued beauty.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  And we listen. If you have color preferences, flower favorites, or a specific vision, we design accordingly. Your arrangement should feel like it was made just for you—because it was.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Ready for Fresh Flowers?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Browse our shop for ready-made arrangements, or schedule a consultation to discuss custom designs for your event or special moment.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/floral"
                    className="inline-block bg-[#1B5E4F] text-white px-8 py-3 rounded hover:bg-[#D4AF37] hover:text-[#1B5E4F] transition-colors font-sans font-semibold tracking-widest uppercase text-sm"
                  >
                    Shop Arrangements
                  </Link>
                  <Link
                    href="/consultation"
                    className="inline-block border-2 border-[#1B5E4F] text-[#1B5E4F] px-8 py-3 rounded hover:bg-[#1B5E4F] hover:text-white transition-colors font-sans font-semibold tracking-widest uppercase text-sm"
                  >
                    Custom Consultation
                  </Link>
                </div>
              </section>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-8 sticky top-40">
                <h3 className="text-xl font-serif text-[#1B5E4F] mb-6">
                  Related Services
                </h3>
                <nav className="space-y-4">
                  <Link
                    href="/floral"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Shop Bouquets
                  </Link>
                  <Link
                    href="/services/floral-design"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Custom Floral Design
                  </Link>
                  <Link
                    href="/services/tablescape-design"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Tablescape Design
                  </Link>
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-serif text-[#1B5E4F] mb-4">
                    Service Area
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Serving Palm Springs, Palm Desert, Rancho Mirage, Cathedral City, Indian Wells, and La Quinta.
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="block text-center bg-[#D4AF37] text-[#1B5E4F] px-6 py-2 rounded font-sans font-semibold text-sm hover:bg-[#1B5E4F] hover:text-[#D4AF37] transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

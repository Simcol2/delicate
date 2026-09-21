import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES, SITE_URL } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const weddingMeta = PAGES.weddingPortfolio

export const metadata: Metadata = {
  title: weddingMeta.title,
  description: weddingMeta.description,
  keywords: weddingMeta.keywords,
  alternates: {
    canonical: weddingMeta.canonical,
  },
  openGraph: {
    title: weddingMeta.ogTitle,
    description: weddingMeta.ogDescription,
    type: 'article',
    url: weddingMeta.canonical,
  },
}

export default function WeddingPortfolioPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Wedding Floral Design & Styling',
    description: 'Custom wedding florals, tablescapes and styling for ceremonies and celebrations throughout Palm Springs.',
    url: '/experiences/weddings',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Portfolio', url: '/experiences' },
      { name: 'Weddings', url: '/experiences/weddings' },
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
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-[#1F4D4F] hover:opacity-70 mb-8"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
        </div>

        {/* Header */}
        <div className="w-full bg-[#1B5E4F] py-12 mb-12">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Wedding Floral Design & Styling
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Bespoke floral arrangements and tablescapes for intimate ceremonies and desert celebrations throughout Palm Springs.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Creating Your Wedding Vision
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your wedding day deserves florals as unique and meaningful as your love story. At Delicate Flowers, we specialize in creating custom floral designs that transform your ceremony and celebration into an unforgettable experience. From intimate Palm Springs ceremonies to grand desert receptions, we bring precision, artistry, and passion to every detail.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We work closely with you to understand your vision, aesthetic, and the story you want to tell. Whether you're drawn to romantic garden roses, architectural succulents, dramatic jewel tones, or soft desert botanicals, we design arrangements that feel authentically you—not trends that fade before your photos do.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  What We Design
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Bridal & Ceremony Florals</h3>
                    <p className="leading-relaxed">
                      Hand-tied bouquets, cascading arrangements, and ceremony installations that photograph beautifully and move with you through your day.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Tablescapes & Centerpieces</h3>
                    <p className="leading-relaxed">
                      Sophisticated table design that brings sophistication to your reception. From low arrangements that encourage conversation to tall dramatic installations, we create experiences at every table.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Ceremony & Reception Styling</h3>
                    <p className="leading-relaxed">
                      Full venue transformation. Archways, installations, aisle design, and environmental styling that makes your space feel intentional and luxurious.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Desert-Inspired Design</h3>
                    <p className="leading-relaxed">
                      We celebrate Palm Springs' unique landscape. Incorporating desert botanicals, architectural elements, and color palettes that feel rooted in place—not imported from somewhere else.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  The Process
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We begin with a consultation where we listen. Your venue, your style, your non-negotiables, and your dreams. We ask questions about the feeling you want to create, the colors that move you, and the moments that matter most.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  From there, we create a custom proposal with design concepts, materials, and a timeline that works for your wedding day. We're detail-oriented and collaborative—your feedback shapes every revision.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  On your wedding day, we handle design installation and coordination. We arrive early, we stay focused, and we ensure every arrangement is exactly as envisioned when you walk down the aisle.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Ready to Begin?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Your wedding florals are one of the few elements that touch every moment of your day—the photos, the ceremony, the celebration, even the details your guests remember forever. We'd be honored to create them for you.
                </p>
                <Link
                  href="/consultation"
                  className="inline-block bg-[#1B5E4F] text-white px-8 py-3 rounded hover:bg-[#D4AF37] hover:text-[#1B5E4F] transition-colors font-sans font-semibold tracking-widest uppercase text-sm"
                >
                  Schedule Your Consultation
                </Link>
              </section>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-lg p-8 sticky top-40">
                <h3 className="text-xl font-serif text-[#1B5E4F] mb-6">
                  Related Services
                </h3>
                <nav className="space-y-4">
                  <Link
                    href="/services/wedding-styling"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Wedding Styling Services
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

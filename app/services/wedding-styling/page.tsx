import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const weddingMeta = PAGES.weddingStyling

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

export default function WeddingStylingPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Wedding Floral Design & Styling',
    description: 'Wedding floral design, tablescapes, and full event styling for intimate ceremonies and celebrations throughout Palm Springs and the desert.',
    url: '/services/wedding-styling',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Wedding Styling', url: '/services/wedding-styling' },
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
            href="/services"
            className="inline-flex items-center gap-2 text-[#1F4D4F] hover:opacity-70 mb-8"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back to Services</span>
          </Link>
        </div>

        <div className="w-full bg-[#1B5E4F] py-12 mb-12">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Wedding Floral Design & Styling
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Bespoke wedding florals and complete event styling for your Palm Springs ceremony and celebration.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Your Wedding Deserves Flowers That Tell Your Story
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your wedding day is one of the few moments in life where every detail matters and will be remembered. The florals you choose, the tablescapes you design, the overall aesthetic you create—these aren't just decoration. They're part of your love story. They're what your guests will see when they arrive. They're what's in your photographs forever.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Delicate Flowers, we specialize in creating wedding florals and styling that feel authentically you. We don't follow trends that fade. We design with timeless beauty, attention to detail, and deep understanding of how flowers make moments feel. Whether you're envisioning romantic garden roses, bold architectural succulents, soft desert botanicals, or something entirely unique, we design flowers that exceed your vision.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Wedding Design Services
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Bridal Florals</h3>
                    <p className="leading-relaxed">
                      Hand-tied bridal bouquets, cascade arrangements, and bridesmaid flowers designed to photograph beautifully and move elegantly with you through your day. Custom designed to match your aesthetic and wedding vision.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Ceremony Installation</h3>
                    <p className="leading-relaxed">
                      Arch design, aisle florals, and ceremony arrangements that create the backdrop for your vows. Installations designed to feel intentional, beautiful, and rooted in your wedding concept.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Reception Tablescapes</h3>
                    <p className="leading-relaxed">
                      Sophisticated table design including centerpieces, ambient florals, and table styling. From intimate conversations to grand celebrations, every table is thoughtfully designed and coordinated.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Full Venue Styling</h3>
                    <p className="leading-relaxed">
                      Entryway arrangements, lounge area florals, bar styling, bathroom details—complete venue transformation that brings your wedding vision to life in every space.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Desert-Inspired Design</h3>
                    <p className="leading-relaxed">
                      We celebrate Palm Springs' unique landscape. Incorporating desert botanicals, architectural elements, and color palettes that feel rooted in the desert light and place—not imported from somewhere else.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Our Wedding Design Process
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  It starts with understanding your love story and your vision for the day. We listen. Your venue, your wedding style, your color palette, your non-negotiables, and your dreams for how the florals should feel. We ask about the moments that matter most and what story the flowers should tell.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  From there, we create a comprehensive design proposal with: specific floral recommendations, color palette, sketches or inspiration images, timeline for the day, and complete pricing. We're collaborative—your feedback shapes every revision until you're confident this is exactly right.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  On your wedding day, we handle design installation and coordination. We arrive early, we stay focused, and we ensure every flower is exactly as envisioned when you walk down the aisle or when your guests arrive at the reception. You focus on the day—we handle the beauty.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Let's Design Your Wedding Florals
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Your wedding flowers are one of the few elements that touch every moment of your day—the ceremony, the photos, the reception, the memories. We'd be honored to design them for you and be part of your celebration.
                </p>
                <Link
                  href="/consultation"
                  className="inline-block bg-[#1B5E4F] text-white px-8 py-3 rounded hover:bg-[#D4AF37] hover:text-[#1B5E4F] transition-colors font-sans font-semibold tracking-widest uppercase text-sm"
                >
                  Schedule Your Consultation
                </Link>
              </section>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-8 sticky top-40">
                <h3 className="text-xl font-serif text-[#1B5E4F] mb-6">
                  Related Services
                </h3>
                <nav className="space-y-4">
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
                  <Link
                    href="/services/private-events"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Private Event Styling
                  </Link>
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-serif text-[#1B5E4F] mb-4">
                    Wedding Portfolio
                  </h3>
                  <nav className="space-y-4">
                    <Link
                      href="/experiences/weddings"
                      className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                    >
                      → Wedding Portfolio
                    </Link>
                  </nav>
                </div>

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

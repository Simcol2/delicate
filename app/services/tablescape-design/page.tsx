import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const tablescapeMeta = PAGES.tablescapeDesign

export const metadata: Metadata = {
  title: tablescapeMeta.title,
  description: tablescapeMeta.description,
  keywords: tablescapeMeta.keywords,
  alternates: {
    canonical: tablescapeMeta.canonical,
  },
  openGraph: {
    title: tablescapeMeta.ogTitle,
    description: tablescapeMeta.ogDescription,
    type: 'article',
    url: tablescapeMeta.canonical,
  },
}

export default function TablescapeDesignPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Tablescape Design & Table Styling',
    description: 'Custom tablescape design and table styling for intimate dinners, celebrations, and private events throughout Palm Springs.',
    url: '/services/tablescape-design',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Tablescape Design', url: '/services/tablescape-design' },
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
              Tablescape Design & Table Styling
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Create unforgettable dining experiences with custom tablescape design and sophisticated table styling for your celebrations.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  The Table is the Heart of Gathering
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A beautifully designed table doesn't just look stunning—it sets the tone for the entire event. From the moment your guests are seated, the tablescape should invite conversation, reflect your aesthetic, and communicate the care you've invested in the gathering. At Delicate Flowers, we design tablescapes that are both visually striking and thoughtfully functional.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Whether you're hosting an intimate dinner for six or a celebration for a hundred, we create table designs that work with your space and enhance your guests' experience. Florals, linens, place settings, lighting—each element is considered and coordinated to create a cohesive, sophisticated aesthetic.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Tablescape Services
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Formal Dinner Design</h3>
                    <p className="leading-relaxed">
                      Sophisticated tablescapes for multi-course dinners, galas, and formal events. We design tables that feel luxurious, elegant, and perfectly executed down to every detail.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Intimate Gatherings</h3>
                    <p className="leading-relaxed">
                      Small dinner parties and intimate celebrations deserve special attention. We create table designs that encourage connection and make your guests feel honored to be there.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Centerpiece Design</h3>
                    <p className="leading-relaxed">
                      Statement centerpieces that anchor your tablescape. Low arrangements for conversation, tall pieces for drama, or mixed-height designs that create visual interest and flow.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Seasonal Styling</h3>
                    <p className="leading-relaxed">
                      Seasonal tablescapes that celebrate the time of year while working with Palm Springs' unique light and landscape. Spring florals, summer botanicals, autumn abundance, winter elegance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Full Coordination</h3>
                    <p className="leading-relaxed">
                      Complete tablescape coordination including floral arrangements, linens selection, place card design, napkin styling, and lighting considerations to create a unified vision.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Our Design Process
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We start with your vision. How many guests? What's the setting—indoor or outdoor? What's the occasion? What colors and aesthetic resonate with you? We ask questions to understand not just what you want the table to look like, but how you want your guests to feel when they sit down.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  From there, we design a complete tablescape proposal: floral arrangements, color palette, styling details, and any special elements that will make your table memorable. We refine based on your feedback, and on the day of your event, we style and install everything to perfection.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Your table should feel intentional, beautiful, and authentically you. That's the Delicate Flowers difference.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Let's Style Your Table
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Your gathering deserves a table that's as thoughtfully designed as it is beautiful. We'd love to discuss your vision and create a tablescape that makes a lasting impression on your guests.
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
                    href="/services/private-events"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Private Event Styling
                  </Link>
                  <Link
                    href="/services/wedding-styling"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Wedding Styling
                  </Link>
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-serif text-[#1B5E4F] mb-4">
                    Related Portfolio
                  </h3>
                  <nav className="space-y-4">
                    <Link
                      href="/experiences/celebrations"
                      className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                    >
                      → Celebrations & Dinners
                    </Link>
                    <Link
                      href="/experiences/weddings"
                      className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                    >
                      → Wedding Designs
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

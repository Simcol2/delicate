import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const soireeMeta = PAGES.outdoorSoireePortfolio

export const metadata: Metadata = {
  title: soireeMeta.title,
  description: soireeMeta.description,
  keywords: soireeMeta.keywords,
  alternates: {
    canonical: soireeMeta.canonical,
  },
  openGraph: {
    title: soireeMeta.ogTitle,
    description: soireeMeta.ogDescription,
    type: 'article',
    url: soireeMeta.canonical,
  },
}

export default function OutdoorSoireePortfolioPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Outdoor Event & Desert Soiree Styling',
    description: 'Outdoor event design and styling for desert entertaining and garden celebrations throughout Palm Springs.',
    url: '/experiences/outdoor-soiree',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Portfolio', url: '/experiences' },
      { name: 'Outdoor Soirees', url: '/experiences/outdoor-soiree' },
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
              Outdoor Events & Desert Soirees
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Custom styling and floral design for outdoor gatherings and desert entertaining throughout Palm Springs and the surrounding communities.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Desert Entertaining Reimagined
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Palm Springs outdoor entertaining is unique. The landscape is dramatic. The light is golden. The scale feels grand. We specialize in creating outdoor events that feel simultaneously sophisticated and rooted in the desert environment—celebrations that work with the landscape instead of against it.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  From intimate garden dinners to expansive poolside soirees, from sunset celebrations to elegant outdoor receptions, we design florals, styling, and ambiance that transform your outdoor space into somewhere unforgettable. We consider sight lines, the movement of sun and shadow, architectural elements, and how guests will experience the space as they move through it.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Outdoor Styling Expertise
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Garden Parties & Entertaining</h3>
                    <p className="leading-relaxed">
                      We create outdoor spaces that feel intentional. From tablescaping to ambient florals, entryway design to lounge areas—every zone is considered and designed for your guests' experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Poolside Events</h3>
                    <p className="leading-relaxed">
                      The pool is the focal point. We design florals and styling that complement the water feature while creating sophisticated gathering spaces around it. Drinks on the terrace, dining by the pool—it all works together.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Sunset Celebrations</h3>
                    <p className="leading-relaxed">
                      Palm Springs sunsets are legendary. We design events that celebrate that light—color palettes that glow with the golden hour, arrangements that photograph beautifully as day becomes evening.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Desert Landscape Integration</h3>
                    <p className="leading-relaxed">
                      The landscape isn't an obstacle—it's an opportunity. We incorporate desert botanicals, work with natural terrain, and create designs that feel like they belong in Palm Springs specifically.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  What We Consider
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Outdoor events require thinking beyond just flowers. We consider the season and heat. We think about water features, landscaping, architectural elements, and how to work with existing design. We plan for light changes throughout the evening. We design arrangements and installations that are both beautiful and appropriately scaled for outdoor spaces.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We're also practical. We know which flowers hold up in desert heat. We understand wind, sun exposure, and how to secure installations. We design with both beauty and function in mind.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Every outdoor event is different. The venue, the guest count, the season, your aesthetic—they all influence what we create. We design specifically for your event and your space, not generic outdoor styling.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Plan Your Outdoor Event
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Your outdoor space has potential. Let's unlock it together with styling and design that feels authentically Palm Springs while reflecting your vision for the event.
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
                    href="/services/private-events"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Private Event Styling
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

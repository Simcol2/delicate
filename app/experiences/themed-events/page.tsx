import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const themedMeta = PAGES.themedEventsPortfolio

export const metadata: Metadata = {
  title: themedMeta.title,
  description: themedMeta.description,
  keywords: themedMeta.keywords,
  alternates: {
    canonical: themedMeta.canonical,
  },
  openGraph: {
    title: themedMeta.ogTitle,
    description: themedMeta.ogDescription,
    type: 'article',
    url: themedMeta.canonical,
  },
}

export default function ThemedEventsPortfolioPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Themed Event Design & Styling',
    description: 'Custom concept design and styling for specialty and themed celebrations throughout Palm Springs.',
    url: '/experiences/themed-events',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Portfolio', url: '/experiences' },
      { name: 'Themed Events', url: '/experiences/themed-events' },
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
              Themed Events & Concept Design
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Custom concept design and floral styling for specialty events and celebrations throughout Palm Springs.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Bringing Concepts to Life
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A themed event isn't just a party with a name—it's an opportunity to create a complete experience. From the moment your guests arrive, every detail should reinforce the concept. The florals, the styling, the colors, the installations—they all work together to tell a story and create an unforgettable atmosphere.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Delicate Flowers, we specialize in taking your theme—whether it's vintage glamour, botanical elegance, cultural celebration, or something entirely unique—and bringing it to life through thoughtful floral design and styling. We ask the right questions to understand your vision, and then we design an experience that exceeds it.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Themed Event Design Services
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Concept Development</h3>
                    <p className="leading-relaxed">
                      We listen to your vision and help refine it. If you have a theme in mind, we expand on it. If you're still exploring ideas, we help you find the concept that resonates. Then we design everything to serve that theme.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Cohesive Styling</h3>
                    <p className="leading-relaxed">
                      Color palettes, floral selections, and design elements that all speak the same language. Centerpieces, installations, corsages, ambient florals—everything reinforces the theme and creates a unified aesthetic.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Thematic Installations</h3>
                    <p className="leading-relaxed">
                      Statement pieces and installations that announce your theme. Archways, entryway arrangements, focal point designs—installations that make your concept immediately recognizable.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Period & Cultural Design</h3>
                    <p className="leading-relaxed">
                      Events celebrating a specific era, culture, or aesthetic require sensitivity and knowledge. We research, we ask questions, and we design with authenticity and respect.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Surprise & Delight Elements</h3>
                    <p className="leading-relaxed">
                      Special touches that make your guests smile. Unexpected florals, clever details, moments of beauty that reinforce why your theme matters—and why this event will be remembered.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Why Themed Events Matter
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A themed event is a celebration with intention. It's not just throwing a party—it's creating an experience that your guests will talk about for years. When every element, including the florals, reinforces your concept, the event feels cohesive, thoughtful, and memorable.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We understand that themed events require attention to detail and creative thinking. We've designed vintage garden parties, modern minimalist celebrations, cultural events, seasonal festivities, and concepts we'd never encountered before. Each one taught us something. Each one pushed our creativity.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We're ready to design your next concept event. Tell us your theme, your vision, and your dreams. We'll create florals and styling that make them real.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Let's Design Your Themed Event
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  You have a vision. We have the creativity and expertise to bring it to life. Let's work together to create an event that's uniquely yours and unforgettably beautiful.
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
                    href="/services/wedding-styling"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Wedding Styling
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

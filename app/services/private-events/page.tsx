import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const eventsMeta = PAGES.privateEvents

export const metadata: Metadata = {
  title: eventsMeta.title,
  description: eventsMeta.description,
  keywords: eventsMeta.keywords,
  alternates: {
    canonical: eventsMeta.canonical,
  },
  openGraph: {
    title: eventsMeta.ogTitle,
    description: eventsMeta.ogDescription,
    type: 'article',
    url: eventsMeta.canonical,
  },
}

export default function PrivateEventsPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Private Event Styling & Design',
    description: 'Full-service private event styling and design. From intimate dinners to celebrations, we create luxury experiences throughout Palm Springs.',
    url: '/services/private-events',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Private Event Styling', url: '/services/private-events' },
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
              Private Event Styling & Design
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Full-service event design and styling for intimate gatherings, celebrations, and luxury experiences throughout Palm Springs.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Events That Create Memories
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A private event is a chance to create an experience. When you're hosting something meaningful—a milestone birthday, an intimate dinner, a gathering of people you care about—every detail matters. The light, the florals, the table design, the atmosphere—they all contribute to the feeling your guests take home with them.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Delicate Flowers, we handle the full design and styling of your private event. We work with your venue, we consider your aesthetic, and we create an environment where your guests feel welcomed, celebrated, and immersed in beauty. From concept through execution, we bring precision, artistry, and genuine care to every detail.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Event Styling Services
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Complete Event Design</h3>
                    <p className="leading-relaxed">
                      We handle the full vision—from concept through day-of execution. Floral design, tablescape styling, ambiance creation, ambient florals, and coordination to ensure everything is perfect when your guests arrive.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Dinner Party Styling</h3>
                    <p className="leading-relaxed">
                      Intimate dinners for 6 to celebrations for 100. We design table settings, centerpieces, ambient florals, and overall aesthetics that make dining memorable and create a sophisticated atmosphere.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Milestone Celebrations</h3>
                    <p className="leading-relaxed">
                      Birthdays, anniversaries, retirements, and life chapters deserve thoughtful design. We create events that honor the occasion and celebrate the person with beauty and intention.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Venue Transformation</h3>
                    <p className="leading-relaxed">
                      Your space has potential. Whether hosting at home, in a rented venue, or in the desert, we use florals, styling, and thoughtful design to transform any space into something extraordinary.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Day-of Coordination</h3>
                    <p className="leading-relaxed">
                      We arrive early, we set up beautifully, and we stay focused on details. You focus on enjoying your event—we handle everything else so it feels effortless and perfect.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Our Private Event Process
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  It begins with a consultation. We listen. Your vision, your aesthetic, your non-negotiables, your dreams. We ask questions about the feeling you want to create, the moments that matter most, and what success looks like to you.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  From there, we design a custom proposal with specific recommendations for florals, styling, color palette, and the overall aesthetic. We're collaborative—your feedback shapes every revision. We present options, refine details, and make sure you're confident in the plan before the event.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  On your event day, we handle setup, styling, and day-of coordination. We ensure every arrangement is exactly as envisioned, every detail is perfect, and every guest experiences the beauty you've invested in creating.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Plan Your Private Event
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  You have a vision for a beautiful gathering. We have the expertise to bring it to life. Let's work together to create an event your guests will remember and treasure forever.
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
                      → Celebrations
                    </Link>
                    <Link
                      href="/experiences/outdoor-soiree"
                      className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                    >
                      → Outdoor Events
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

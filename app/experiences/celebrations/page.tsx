import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES, SITE_URL } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const celebrationMeta = PAGES.celebrationPortfolio

export const metadata: Metadata = {
  title: celebrationMeta.title,
  description: celebrationMeta.description,
  keywords: celebrationMeta.keywords,
  alternates: {
    canonical: celebrationMeta.canonical,
  },
  openGraph: {
    title: celebrationMeta.ogTitle,
    description: celebrationMeta.ogDescription,
    type: 'article',
    url: celebrationMeta.canonical,
  },
}

export default function CelebrationPortfolioPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Celebration & Party Styling',
    description: 'Floral design and styling for celebrations, parties, and special occasions throughout Palm Springs.',
    url: '/experiences/celebrations',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Portfolio', url: '/experiences' },
      { name: 'Celebrations', url: '/experiences/celebrations' },
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
              Celebration & Party Styling
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Floral design and styling for milestone celebrations, dinner parties, and special occasions throughout Palm Springs.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Designing Moments Worth Celebrating
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  From milestone birthdays to intimate dinner parties, anniversary celebrations to "just because" gatherings, your event deserves florals and styling that feel intentional. At Delicate Flowers, we create atmospheres where your guests feel the care you've invested in every detail.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We understand that celebrations are as unique as the people hosting them. Whether you're envisioning a sophisticated garden party, a vibrant themed celebration, or an elegant dinner gathering, we design custom floral arrangements and styling that match the energy and aesthetic of your vision.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Celebration Design Services
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Milestone Celebrations</h3>
                    <p className="leading-relaxed">
                      Birthdays, anniversaries, retirements, and life chapters. We create florals and styling that honor the moment and the person being celebrated.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Dinner Party Design</h3>
                    <p className="leading-relaxed">
                      From intimate gatherings to sophisticated dinner experiences. We design centerpieces, florals, and table styling that encourage conversation and create memory.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Event Florals & Installations</h3>
                    <p className="leading-relaxed">
                      Entryway arrangements, statement installations, ambient florals, and design elements that transform your space into something extraordinary.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Seasonal & Themed Events</h3>
                    <p className="leading-relaxed">
                      Holiday gatherings, seasonal celebrations, and themed events. We create cohesive design that brings your concept to life through florals and styling.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Why Work With Us
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We don't do generic. Every celebration is different, which means every design should be too. We listen to what matters to you—the feeling you want to create, the colors that resonate, the level of complexity—and we design accordingly.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  From consultation through execution, we're collaborative. We present options, refine based on your feedback, and on the day of your event, we ensure everything is set up beautifully and on time so you can actually enjoy your own celebration.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We bring precision, artistry, and a genuine commitment to making your event feel special. That's the Delicate Flowers difference.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Let's Create Your Celebration
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Your event is waiting for florals and styling that match its importance. We'd love to discuss your vision and create something beautiful together.
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

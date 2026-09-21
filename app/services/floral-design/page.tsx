import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { PAGES } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const floralMeta = PAGES.floralDesign

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

export default function FloralDesignPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Custom Floral Design',
    description: 'Bespoke floral design and custom arrangements for events, celebrations, and special occasions throughout Palm Springs.',
    url: '/services/floral-design',
  })

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Floral Design', url: '/services/floral-design' },
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
              Custom Floral Design
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Bespoke floral arrangements and custom designs tailored to your vision, aesthetics, and the moments that matter most.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Florals as Expression
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Flowers are one of nature's most eloquent languages. They communicate emotion, celebrate moment, and create beauty. At Delicate Flowers, we specialize in translating your vision into floral designs that feel authentic, intentional, and unforgettably beautiful.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Whether you're drawn to romantic garden roses, architectural succulents, bold jewel tones, or soft desert botanicals, we listen to what resonates with you and design flowers that amplify that feeling. Every arrangement is made to order with premium blooms and thoughtful design—not trends that fade, but timeless beauty that photographs brilliantly and lasts.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  What We Create
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Event Florals</h3>
                    <p className="leading-relaxed">
                      Comprehensive floral design for celebrations, private events, weddings, and special occasions. From ambient florals to dramatic installations, every piece works cohesively with your event's vision.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Hand-Tied Bouquets</h3>
                    <p className="leading-relaxed">
                      Classic arrangements with natural movement and elegance. Perfect for gifting, celebrations, or enjoying at home. Each is designed to be beautiful fresh and designed to last.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Sculptural Installations</h3>
                    <p className="leading-relaxed">
                      Statement pieces and dramatic installations designed to command attention. Archways, entryway arrangements, focal installations—florals that announce your vision immediately.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Bridal & Ceremony Design</h3>
                    <p className="leading-relaxed">
                      Wedding florals including bridal bouquets, ceremony installations, and reception arrangements. Designs that photograph beautifully and move with you through your day.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#1B5E4F] mb-2">Custom Designs</h3>
                    <p className="leading-relaxed">
                      If you have a specific vision—a color palette, a flower you love, or a concept you want brought to life—we create custom arrangements designed just for you.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Our Approach to Floral Design
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We start with listening. We ask about the occasion, the feeling you want to create, the colors that move you, and any flowers or elements you love. We ask about your space, your aesthetic, and what "beautiful" means to you. Then we design flowers that exceed those expectations.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We source premium flowers from growers who share our commitment to quality. We design with color theory, texture, movement, and lasting beauty in mind. Every stem is fresh, every arrangement is made with care, and every detail reflects our dedication to the craft.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We're not following trends—we're creating designs that will feel beautiful six months from now, not just on the day. That's the Delicate Flowers philosophy.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif text-[#1B5E4F] mb-6">
                  Let's Design Your Florals
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Your flowers deserve to be as thoughtfully designed as they are beautiful. Whether you have a clear vision or are just exploring ideas, we'd love to discuss your needs and create arrangements that feel uniquely yours.
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
                  <Link
                    href="/services/wedding-styling"
                    className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                  >
                    → Wedding Styling
                  </Link>
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-serif text-[#1B5E4F] mb-4">
                    Shop & Portfolio
                  </h3>
                  <nav className="space-y-4">
                    <Link
                      href="/floral"
                      className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                    >
                      → Shop Arrangements
                    </Link>
                    <Link
                      href="/experiences/floral-arrangements"
                      className="block text-[#1B5E4F] hover:text-[#D4AF37] transition-colors font-sans text-sm"
                    >
                      → Portfolio
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

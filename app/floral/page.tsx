import type { Metadata } from 'next'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { PAGES } from '@/lib/seo'
import { getFloralCatalog } from '@/lib/squareCatalog'
import FloralShop from './FloralShop'

const floralMeta = PAGES.floral

export const dynamic = 'force-dynamic'

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

export default async function FloralPage() {
  let catalog

  try {
    catalog = await getFloralCatalog()
  } catch (error) {
    console.error('Unable to load floral catalog:', error)
    catalog = {
      category: { id: '', name: 'floral' },
      items: [],
    }
  }

  return (
    <main
      className="min-h-screen bg-[#FCFBF7] text-[#1F4D4F]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(31,77,79,0.045) 1px, transparent 0)',
        backgroundSize: '18px 18px',
      }}
    >
      <section className="pt-28 lg:pt-32">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-5 mb-7">
            <span className="block w-16 h-px bg-[#1F4D4F]" />
            <p className="font-sans text-[0.62rem] sm:text-xs font-medium tracking-[0.38em] uppercase text-[#1F4D4F]">
              Luxury Floral &amp; Tablescape Design
            </p>
          </div>

          <h1 className="font-serif text-[3.35rem] sm:text-6xl lg:text-[5.4rem] leading-[0.95] tracking-[-0.035em] font-bold text-[#1F4D4F]">
            The{' '}
            <em className="font-serif font-normal italic text-[#FF6F61]">
              Floral
            </em>{' '}
            Edit
          </h1>

          <p className="font-serif italic text-[1.35rem] sm:text-2xl lg:text-[1.9rem] leading-[1.2] text-[#1F4D4F] mt-5 max-w-[760px]">
            Designer florals for entertaining, gifting
            <br className="hidden sm:block" /> and unforgettable moments in Palm Springs.
          </p>
        </div>

        <div className="relative mt-7 h-[360px] sm:h-[500px] lg:h-[590px] overflow-hidden">
          <img
            src="/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Blush Peony Cascade.jpg"
            alt="Luxury floral design by Delicate Flowers in Palm Springs"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1F4D4F]/10" />

          <div className="absolute right-6 sm:right-12 lg:right-[8%] bottom-12 sm:bottom-16 text-white">
            <p className="font-serif text-sm sm:text-base tracking-[0.28em] leading-[1.75]">
              BEAUTY
              <br />
              BRINGS
              <br />
              PEOPLE
              <br />
              TOGETHER
            </p>
            <span className="block w-16 h-px bg-white mt-4" />
          </div>
        </div>
      </section>

      <FloralShop
        categoryName={catalog.category.name}
        items={catalog.items}
      />

      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-0">
        <Link
          href="/services/tablescape-design"
          className="group grid grid-cols-1 sm:grid-cols-[46%_54%] overflow-hidden bg-[#F1F7F3] border border-[#1F4D4F]/10 shadow-[0_18px_50px_rgba(31,77,79,0.08)]"
        >
          <div className="h-[220px] sm:h-[280px] lg:h-[320px] overflow-hidden">
            <img
              src="/Photo Slides/Celebrations/Delicate Flower-6-table3.png"
              alt="Elegant Palm Springs tablescape styling by Delicate Flowers"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          <div className="relative p-7 sm:p-9 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-10 h-px bg-[#1F4D4F]" />
              <p className="font-sans text-[0.62rem] sm:text-xs tracking-[0.28em] uppercase text-[#1F4D4F]">
                Need the whole table?
              </p>
            </div>

            <h2 className="font-serif text-[2.4rem] sm:text-[3.2rem] lg:text-[4rem] font-bold leading-[0.95] text-[#1F4D4F]">
              Explore{' '}
              <em className="font-serif font-normal italic">
                Tablescapes
              </em>
            </h2>

            <p className="font-sans text-[0.62rem] sm:text-xs tracking-[0.26em] uppercase leading-[1.65] text-[#1F4D4F] mt-5 max-w-[520px]">
              Complete floral design for unforgettable gatherings.
            </p>

            <span className="absolute right-7 sm:right-10 bottom-7 sm:bottom-9 text-[#1F4D4F] text-4xl font-light transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </Link>
      </section>

      <Link
        href="/floral/checkout"
        aria-label="View floral cart"
        className="fixed z-40 right-5 bottom-5 sm:right-8 sm:bottom-8 w-[68px] h-[68px] rounded-full bg-[#0F6A5D] text-white flex items-center justify-center shadow-[0_14px_35px_rgba(15,106,93,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,106,93,0.34)]"
      >
        <ShoppingCart size={29} strokeWidth={1.8} />
      </Link>

      <div className="bg-[#0F6A5D] text-[#FCFBF7] text-center px-6 py-5 mt-10">
        <p className="font-sans text-[0.6rem] sm:text-xs tracking-[0.28em] uppercase">
          Serving Palm Springs &amp; Surrounding Desert Communities
        </p>
      </div>
    </main>
  )
}

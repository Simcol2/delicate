import type { Metadata } from 'next'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { bouquets } from '@/lib/floral'
import { PAGES } from '@/lib/seo'

const floralMeta = PAGES.floral

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

const featuredIds = ['blush-romance', 'garden-harvest', 'silver-hydrangea']

export default function FloralPage() {
  const featuredBouquets = featuredIds
    .map((id) => bouquets.find((bouquet) => bouquet.id === id))
    .filter((bouquet): bouquet is (typeof bouquets)[number] => Boolean(bouquet))

  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#1F4D4F]">
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
            alt="Luxury blush floral arrangement by Delicate Flowers in Palm Springs"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1F4D4F]/5" />

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

      <section className="max-w-[1180px] mx-auto px-6 lg:px-10 pt-8 sm:pt-10 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1F4D4F]/20 pb-5">
          <p className="font-sans text-[0.64rem] sm:text-xs font-semibold tracking-[0.34em] uppercase text-[#1F4D4F]">
            Our Signature Arrangements
          </p>
          <p className="font-serif italic text-base sm:text-lg text-[#5A625F]">
            Fresh. Refined. Always a Good Idea.
          </p>
        </div>

        <div>
          {featuredBouquets.map((bouquet) => (
            <article
              key={bouquet.id}
              className="border-b border-[#1F4D4F]/15 py-4 sm:py-5"
            >
              <Link
                href={`/floral/${bouquet.id}`}
                className="group grid grid-cols-[128px_1fr] sm:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr] gap-4 sm:gap-8 lg:gap-10 items-center"
              >
                <div className="aspect-[1.16/1] sm:aspect-[1.18/1] overflow-hidden bg-[#EDE6DB]">
                  <img
                    src={bouquet.image}
                    alt={`${bouquet.name} floral arrangement by Delicate Flowers`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                </div>

                <div className="min-w-0 py-1">
                  <h2 className="font-serif text-[1.75rem] sm:text-[2.35rem] lg:text-[2.7rem] leading-none text-[#1F4D4F] group-hover:text-[#FF6F61] transition-colors">
                    {bouquet.name}
                  </h2>

                  <p className="font-serif text-[0.98rem] sm:text-[1.23rem] lg:text-[1.35rem] leading-[1.15] text-[#505552] mt-2 max-w-[650px]">
                    {bouquet.shortDescription}
                  </p>

                  <p className="font-sans text-[0.72rem] sm:text-sm font-medium tracking-[0.24em] uppercase text-[#C3913F] mt-4">
                    ${bouquet.price} / Event
                  </p>

                  <span className="inline-flex items-center gap-4 font-sans text-[0.62rem] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#1F4D4F] mt-3">
                    View Arrangement
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-1 mb-0">
        <Link
          href="/services"
          className="group grid grid-cols-1 sm:grid-cols-[46%_54%] overflow-hidden bg-[#E6EEE9]"
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
        className="fixed z-40 right-5 bottom-5 sm:right-8 sm:bottom-8 w-[68px] h-[68px] rounded-full bg-[#0F6A5D] text-white flex items-center justify-center shadow-[0_12px_30px_rgba(15,106,93,0.3)] transition-transform hover:scale-105"
      >
        <ShoppingCart size={29} strokeWidth={1.8} />
      </Link>

      <div className="bg-[#0F6A5D] text-[#F7F3EA] text-center px-6 py-5 mt-4">
        <p className="font-sans text-[0.6rem] sm:text-xs tracking-[0.28em] uppercase">
          Serving Palm Springs &amp; Surrounding Desert Communities
        </p>
      </div>
    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HeroProps {
  onOpenDesigner: () => void
  onOpenContact: () => void
}

export default function Hero({
  onOpenDesigner,
  onOpenContact,
}: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const reveal = mounted
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-6'

  return (
    <>
      {/* =========================================================
          MOBILE HERO
          This is intentionally separate from desktop so mobile
          can match the approved mockup without changing desktop.
         ========================================================= */}
      <section className="lg:hidden relative min-h-[1120px] overflow-hidden bg-[#F8F3E9]">
        {/* Flyer-style cream background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 26% 18%, rgba(255,255,255,0.96), rgba(248,243,233,0.80) 44%, rgba(245,239,227,0.98) 100%)',
          }}
        />

        {/* Linen texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent 0,
                transparent 3px,
                rgba(31,77,79,0.024) 3px,
                rgba(31,77,79,0.024) 4px
              ),
              repeating-linear-gradient(
                0deg,
                transparent 0,
                transparent 3px,
                rgba(31,77,79,0.018) 3px,
                rgba(31,77,79,0.018) 4px
              )
            `,
          }}
        />

        {/* Palm shadow, top right */}
        <div
          className="absolute top-0 right-[-10%] w-[72%] h-[45%] pointer-events-none opacity-[0.22]"
          style={{
            backgroundImage: 'url(/images/palm-shadow.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'top right',
          }}
        />

        {/* Palm shadow, lower left */}
        <div
          className="absolute left-[-18%] bottom-[6%] w-[65%] h-[34%] pointer-events-none opacity-[0.16] rotate-180"
          style={{
            backgroundImage: 'url(/images/palm-shadow.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'bottom left',
          }}
        />

        {/* Floral arrangement */}
        <img
          src="/images/file_00000000c09881f6ab4000ca9355e001.png"
          alt="Delicate Flowers floral arrangement"
          className={`
            absolute
            z-[5]
            right-[-23%]
            top-[265px]
            w-[75%]
            max-w-none
            object-contain
            pointer-events-none
            transition-all
            duration-[1400ms]
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{
            transitionDelay: '0.3s',
            filter: 'brightness(1.035) contrast(1.04) saturate(1.03)',
          }}
        />

        <div className="relative z-20 px-7 pt-[138px] pb-12">
          {/* Eyebrow */}
          <p
            className={`font-sans text-[0.60rem] font-bold tracking-[0.36em] uppercase text-[#1F4D4F] mb-7 flex items-center gap-4 transition-all duration-1000 ${reveal}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <span className="block w-12 h-[1px] bg-[#1F4D4F]" />
            <span className="whitespace-nowrap">
              Luxury Floral &amp; Tablescape Design
            </span>
          </p>

          {/* Title */}
          <h1
            className={`relative z-20 mb-7 transition-all duration-1000 ${reveal}`}
            style={{ transitionDelay: '0.25s' }}
          >
            <span
              className="block text-[#1F4D4F] font-bold leading-[0.92]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3.65rem, 17vw, 5.2rem)',
                letterSpacing: '-0.045em',
              }}
            >
              You Host.
            </span>

            <span
              className="block text-[#FF6F61] italic font-normal leading-[0.94]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(3.75rem, 17vw, 5.35rem)',
                letterSpacing: '-0.035em',
              }}
            >
              We Style.
            </span>
          </h1>

          {/* Tagline */}
          <p
            className={`relative z-20 w-[58%] font-serif text-[1.62rem] text-[#1F4D4F] italic font-semibold leading-[1.08] mb-7 transition-all duration-1000 ${reveal}`}
            style={{ transitionDelay: '0.4s' }}
          >
            Dressing your tables better than your guests
          </p>

          {/* Description */}
          <p
            className={`relative z-20 w-[56%] font-sans text-[0.98rem] font-normal text-[#555555] leading-[1.55] mb-7 transition-all duration-1000 ${reveal}`}
            style={{ transitionDelay: '0.55s' }}
          >
            Curated in-home entertaining experiences for those who appreciate
            the art of gathering. Serving Palm Springs and surrounding desert
            communities.
          </p>

          {/* CTA area */}
          <div
            className={`relative z-20 flex flex-col items-start gap-5 transition-all duration-1000 ${reveal}`}
            style={{ transitionDelay: '0.7s' }}
          >
            <Link
              href="/services"
              className="inline-flex w-[56%] min-w-[238px] items-center justify-between px-7 py-5 bg-[#1F4D4F] text-[#F8F3E9] font-sans text-[0.66rem] font-bold tracking-[0.25em] uppercase shadow-[0_12px_28px_rgba(31,77,79,0.14)]"
            >
              <span>Explore Services</span>
              <span>→</span>
            </Link>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-4 font-sans text-[#1F4D4F] text-[0.66rem] font-bold tracking-[0.24em] uppercase"
            >
              <span>Book a Consultation</span>
              <span>→</span>
            </button>

            <button
              onClick={onOpenDesigner}
              className="inline-flex w-[57%] min-w-[245px] items-center justify-between px-7 py-5 bg-[#FF6F61] text-white font-sans text-[0.66rem] font-bold tracking-[0.23em] uppercase shadow-[0_12px_28px_rgba(255,111,97,0.16)]"
            >
              <span>Meet the Designer</span>
              <span className="text-xl leading-none">›</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESKTOP HERO
          Kept separate so the mobile redesign cannot disturb it.
         ========================================================= */}
      <section className="hidden lg:block relative min-h-screen overflow-hidden bg-[#F8F3E9]">
        {/* Soft flyer-style background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.92), rgba(248,243,233,0.72) 42%, rgba(245,239,227,0.95) 100%)',
          }}
        />

        {/* Subtle linen texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent 0,
                transparent 3px,
                rgba(31,77,79,0.025) 3px,
                rgba(31,77,79,0.025) 4px
              ),
              repeating-linear-gradient(
                0deg,
                transparent 0,
                transparent 3px,
                rgba(31,77,79,0.02) 3px,
                rgba(31,77,79,0.02) 4px
              )
            `,
          }}
        />

        {/* Palm shadows */}
        <div
          className="absolute top-20 right-0 w-[55%] h-[55%] pointer-events-none opacity-25 blur-[1px]"
          style={{
            backgroundImage: 'url(/images/palm-shadow.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'top right',
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-[42%] h-[42%] pointer-events-none opacity-20 rotate-180"
          style={{
            backgroundImage: 'url(/images/palm-shadow.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'bottom left',
          }}
        />

        <div className="relative z-10 max-w-[1500px] mx-auto px-16 pt-44 pb-20 min-h-screen flex flex-col justify-center">
          {/* Eyebrow */}
          <p
            className={`font-sans text-[0.68rem] font-bold tracking-[0.42em] uppercase text-[#1F4D4F] mb-8 flex items-center gap-4 transition-all duration-1000 ${reveal}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="block w-14 h-[1px] bg-[#1F4D4F]" />
            Luxury Floral &amp; Tablescape Design
          </p>

          <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-8">
            {/* LEFT CONTENT */}
            <div className="relative z-20 max-w-2xl">
              <h1
                className={`mb-8 transition-all duration-1000 ${reveal}`}
                style={{
                  transitionDelay: '0.35s',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                <span
                  className="block text-[#1F4D4F] font-bold leading-[0.95]"
                  style={{
                    fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  You Host.
                </span>

                <span
                  className="block text-[#FF6F61] italic font-normal leading-[0.95]"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  We Style.
                </span>
              </h1>

              <p
                className={`font-serif text-[2.2rem] text-[#1F4D4F] italic font-semibold leading-tight max-w-xl mb-8 transition-all duration-1000 ${reveal}`}
                style={{ transitionDelay: '0.5s' }}
              >
                Dressing your tables better than your guests
              </p>

              <p
                className={`font-sans text-[1.15rem] font-normal text-[#555555] leading-[1.65] max-w-xl mb-10 transition-all duration-1000 ${reveal}`}
                style={{ transitionDelay: '0.65s' }}
              >
                Curated in-home entertaining experiences for those who
                appreciate the art of gathering. Serving Palm Springs and
                surrounding desert communities.
              </p>

              <div
                className={`flex flex-col items-start gap-6 transition-all duration-1000 ${reveal}`}
                style={{ transitionDelay: '0.8s' }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center min-w-[250px] px-8 py-5 bg-[#1F4D4F] text-[#F8F3E9] font-sans text-[0.7rem] font-bold tracking-[0.28em] uppercase hover:bg-[#FF6F61] transition-colors duration-300 shadow-[0_12px_28px_rgba(31,77,79,0.16)]"
                >
                  Explore Services
                  <span className="ml-4">→</span>
                </Link>

                <button
                  onClick={onOpenContact}
                  className="font-sans text-[#1F4D4F] text-[0.7rem] font-bold tracking-[0.26em] uppercase flex items-center gap-3 hover:text-[#FF6F61] transition-colors"
                >
                  Book a Consultation
                  <span>→</span>
                </button>

                <button
                  onClick={onOpenDesigner}
                  className="inline-flex items-center justify-between min-w-[280px] px-8 py-5 bg-[#FF6F61] text-white font-sans text-[0.7rem] font-bold tracking-[0.24em] uppercase hover:bg-[#1F4D4F] transition-colors duration-300 shadow-[0_12px_28px_rgba(255,111,97,0.18)]"
                >
                  Meet the Designer
                  <span className="text-xl leading-none">›</span>
                </button>
              </div>
            </div>

            {/* DESKTOP FLORAL ARRANGEMENT */}
            <div className="relative min-h-[760px] flex items-end justify-end">
              <div
                className="absolute bottom-[5%] right-[8%] w-[72%] h-[11%] rounded-[50%] blur-2xl opacity-20"
                style={{
                  background:
                    'radial-gradient(ellipse, rgba(67,52,35,0.38), transparent 68%)',
                }}
              />

              <img
                src="/images/file_00000000c09881f6ab4000ca9355e001.png"
                alt="Delicate Flowers floral arrangement"
                className={`
                  relative
                  z-10
                  w-[112%]
                  xl:w-[108%]
                  max-w-none
                  object-contain
                  object-bottom
                  transition-all
                  duration-[1400ms]
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{
                  transitionDelay: '0.35s',
                  filter:
                    'brightness(1.035) contrast(1.04) saturate(1.03)',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

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

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F8F3E9]">
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

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-36 lg:pt-44 pb-16 lg:pb-20 min-h-screen flex flex-col justify-center">

        {/* Eyebrow */}
        <p
          className={`font-sans text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.42em] uppercase text-[#1F4D4F] mb-8 flex items-center gap-4 transition-all duration-1000 ${
            mounted
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <span className="block w-10 sm:w-14 h-[1px] bg-[#1F4D4F]" />
          Luxury Floral & Tablescape Design
        </p>

        <div className="relative grid lg:grid-cols-[0.95fr_1.05fr] items-center gap-4 lg:gap-8">

          {/* LEFT CONTENT */}
          <div className="relative z-20 max-w-2xl pr-[18%] sm:pr-[12%] lg:pr-0">

            {/* Heading */}
            <h1
              className={`mb-8 transition-all duration-1000 ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
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
                  fontFamily:
                    "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                We Style.
              </span>
            </h1>

            {/* Tagline */}
            <p
              className={`font-serif text-2xl sm:text-3xl lg:text-[2.2rem] text-[#1F4D4F] italic font-semibold leading-tight max-w-xl mb-8 transition-all duration-1000 ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              Dressing your tables better than your guests
            </p>

            {/* Description */}
            <p
              className={`font-sans text-base sm:text-lg lg:text-[1.15rem] font-normal text-[#555555] leading-[1.65] max-w-xl mb-10 transition-all duration-1000 ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.65s' }}
            >
              Curated in-home entertaining experiences for those who
              appreciate the art of gathering. Serving Palm Springs and
              surrounding desert communities.
            </p>

            {/* CTA area */}
            <div
              className={`flex flex-col items-start gap-6 transition-all duration-1000 ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
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

          {/* FLORAL ARRANGEMENT */}
<div
  className="
    absolute
    right-[-38%]
    top-[31rem]
    w-[92%]
    z-[5]

    sm:right-[-24%]
    sm:top-[29rem]
    sm:w-[78%]

    lg:relative
    lg:right-auto
    lg:top-auto
    lg:w-auto
    lg:min-h-[760px]
    lg:flex
    lg:items-end
    lg:justify-end
    lg:mt-0
  "
>
  {/* soft base shadow */}
  <div
    className="
      absolute
      bottom-[4%]
      right-[8%]
      w-[75%]
      h-[10%]
      rounded-[50%]
      blur-2xl
      opacity-20
    "
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
      w-full
      max-w-none
      object-contain
      object-bottom
      transition-all
      duration-[1400ms]

      lg:w-[112%]
      xl:w-[108%]

      ${
        mounted
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }
    `}
    style={{
      transitionDelay: '0.35s',
      filter:
        'brightness(1.035) contrast(1.04) saturate(1.03)',
    }}
  />
</div>

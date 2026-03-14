'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HeroProps {
  onOpenDesigner: () => void
  onOpenContact: () => void
}

export default function Hero({ onOpenDesigner, onOpenContact }: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
      {/* Left Side - Content */}
      <div className="bg-ivory flex flex-col justify-end px-6 lg:px-20 pb-16 lg:pb-20 pt-32 lg:pt-40 relative z-10">
        {/* Geometric Pattern Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(242, 140, 56, 0.04) 25%, transparent 25%),
              linear-gradient(225deg, rgba(242, 140, 56, 0.04) 25%, transparent 25%),
              linear-gradient(315deg, rgba(242, 140, 56, 0.04) 25%, transparent 25%),
              linear-gradient(45deg, rgba(242, 140, 56, 0.04) 25%, transparent 25%)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gold Bar - Now Tangerine */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 hidden lg:block"
          style={{
            background: 'linear-gradient(to bottom, transparent, #F28C38, transparent)',
          }}
        />

        {/* Eyebrow */}
        <p 
          className={`font-sans text-[0.65rem] font-normal tracking-[0.4em] uppercase text-tangerine mb-8 flex items-center gap-4 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <span className="block w-10 h-[1px] bg-tangerine"></span>
          Luxury Floral & Tablescape Design
        </p>

        {/* Title - Playfair Display Bold */}
        <h1 
          className={`text-5xl sm:text-6xl lg:text-[clamp(3.2rem,5.5vw,5.5rem)] font-bold leading-[1.05] text-midnight tracking-[-0.01em] mb-8 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ 
            transitionDelay: '0.5s',
            fontFamily: "'Playfair Display', Georgia, serif"
          }}
        >
          You Host.
          <br />
          <em className="text-coral not-italic">We Style.</em>
        </h1>

        {/* Sub-tagline */}
        <p 
          className={`font-serif text-xl lg:text-2xl text-midnight italic mb-8 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.6s' }}
        >
          Dressing your tables better than your guests
        </p>

        {/* Description */}
        <p 
          className={`font-sans text-base lg:text-lg font-light text-text-mid leading-relaxed max-w-md mb-10 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.7s' }}
        >
          Curated in-home entertaining experiences for those who appreciate
          the art of gathering. Serving Palm Springs and surrounding desert communities.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-6 items-start mb-12 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.9s' }}
        >
          <Link href="/services" className="btn-primary">
            <span>Explore Services</span>
          </Link>
          <button onClick={onOpenContact} className="btn-text">
            Book a Consultation
          </button>
        </div>

        {/* Meet Designer Button */}
        <button
          onClick={onOpenDesigner}
          className={`group inline-flex items-center gap-3 px-6 py-4 bg-tangerine text-cream hover:bg-midnight transition-all duration-400 shadow-lg w-fit transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '1.1s' }}
        >
          <span className="font-sans text-sm tracking-[0.2em] uppercase font-medium">
            Meet the Designer
          </span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll Hint */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1.6s' }}
        >
          <div 
            className="w-[1px] h-12"
            style={{
              background: 'linear-gradient(to bottom, #F28C38, transparent)',
              animation: 'scrollDrop 2s ease infinite',
            }}
          />
          <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-text-light">
            Scroll
          </span>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="relative overflow-hidden min-h-[400px] lg:min-h-screen bg-gradient-to-br from-turquoise/30 via-blush to-cactus/30">
        {/* Sun Orb - Now Tangerine */}
        <div 
          className="absolute top-[12%] right-[15%] w-28 h-28 lg:w-32 lg:h-32 rounded-full animate-pulse-orb"
          style={{
            background: 'radial-gradient(circle, rgba(242, 140, 56, 0.6) 0%, rgba(242, 140, 56, 0.1) 60%, transparent 100%)',
          }}
        />

        {/* Hero Image - Rotated 90 degrees on desktop, normal on mobile */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img
            src="/images/Gemini_Generated_Image_7pemq97pemq97pem.png"
            alt="Delicate Flowers floral arrangement"
            className="w-[150%] h-[150%] object-cover lg:rotate-90"
          />
        </div>

        {/* Overlay Text */}
        <div 
          className="absolute bottom-6 right-6 font-serif text-sm italic text-midnight/50 tracking-[0.06em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          Palm Springs · California · Floral Atelier
        </div>
      </div>
    </section>
  )
}

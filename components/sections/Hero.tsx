'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onOpenDesigner: () => void
  onOpenContact: () => void
}

export default function Hero({ onOpenDesigner, onOpenContact }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const subTaglineRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      // Tagline fades in
      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.4'
      )
      // Title fades in with slight delay
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        '-=0.6'
      )
      // Sub-tagline (Dressing your tables...)
      .fromTo(
        subTaglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.8'
      )
      // CTA buttons
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      // Description text below buttons
      .fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )

      // Parallax for text on scroll
      gsap.to([titleRef.current, subTaglineRef.current, ctaRef.current, descriptionRef.current], {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-48 pb-20 bg-hero-image bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/hero-bg.jpg)',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#faf6f0]/90 via-[#faf6f0]/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Top Tagline */}
          <p
            ref={taglineRef}
            className="text-[#8f0e04] text-sm tracking-[0.3em] uppercase mb-8 font-sans font-medium py-2 will-change-transform"
          >
            Luxury Floral & Tablescape Design
          </p>
          {/* Main Headline */}
          <h1
            ref={titleRef}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#2c2420] leading-[0.95] will-change-transform"
          >
            You Host.
            <br />
            <span 
              className="text-[#8f0e04]"
              style={{ fontFamily: 'var(--font-script), cursive' }}
            >
              We Style.
            </span>
          </h1>
          {/* Sub-tagline */}
          <p 
            ref={subTaglineRef}
            className="font-serif italic text-[#8f0e04] text-xl md:text-2xl mt-3 mb-8 will-change-transform"
          >
            Dressing your tables better than your guests
          </p>
          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4 mb-10 will-change-transform">
            <a
              href="/services"
              className="px-10 py-4 bg-[#c9594a] text-[#faf6f0] font-sans text-sm tracking-widest uppercase hover:bg-[#8f0e04] transition-colors duration-300"
            >
              Explore Services
            </a>
            <button
              onClick={onOpenContact}
              className="px-10 py-4 border-2 border-[#c9594a] text-[#8f0e04] font-sans text-sm tracking-widest uppercase hover:bg-[#c9594a] hover:text-[#faf6f0] transition-all duration-300"
            >
              Book a Consultation
            </button>
          </div>
          {/* Description - Now below buttons */}
          <p
            ref={descriptionRef}
            className="font-sans text-[#2c2420]/80 text-lg md:text-xl max-w-xl leading-relaxed will-change-transform mb-8"
          >
            Curated in-home entertaining experiences for those who appreciate 
            the art of gathering. Serving Palm Springs and surrounding desert communities.
          </p>
          {/* Meet the Designer Button */}
          <button
            onClick={onOpenDesigner}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-[#8f0e04] text-[#faf6f0] hover:bg-[#c9594a] transition-all duration-300 shadow-lg"
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
        </div>
      </div>
    </section>
  )
}

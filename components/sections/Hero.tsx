'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onOpenDesigner: () => void
}

export default function Hero({ onOpenDesigner }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const subTaglineRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      // Banner fades in first
      tl.fromTo(
        bannerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      // Tagline fades in
      .fromTo(
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
      className="relative min-h-screen flex items-center justify-center pt-48 pb-20"
    >
      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--white-pure)]/90 via-[var(--white-pure)]/60 to-transparent pointer-events-none" />

      {/* Service Area Banner */}
      <div ref={bannerRef} className="fixed top-0 left-0 right-0 z-[60]">
        <div className="bg-[#d3dcde] text-[var(--navy-midnight)] py-2.5 text-center">
          <p className="text-xs sm:text-sm tracking-wider font-sans font-medium px-4">
            Serving the Coachella Valley & Beyond
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Top Tagline */}
          <p
            ref={taglineRef}
            className="text-[var(--plum-royal)] text-sm tracking-[0.3em] uppercase mb-8 font-sans font-medium py-2 will-change-transform"
          >
            Luxury Floral & Tablescape Design
          </p>
          
          {/* Main Headline */}
          <h1
            ref={titleRef}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--plum-deep)] leading-[0.95] will-change-transform"
          >
            You Host.
            <br />
            <span 
              className="text-[var(--plum-deep)]"
              style={{ fontFamily: 'var(--font-script), cursive' }}
            >
              We Style.
            </span>
          </h1>
          
          {/* Sub-tagline */}
          <p 
            ref={subTaglineRef}
            className="font-serif italic text-[var(--plum-royal)] text-xl md:text-2xl mt-3 mb-8 will-change-transform"
          >
            Dressing your tables better than your guests
          </p>
          
          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4 mb-10 will-change-transform">
            <a
              href="/services"
              className="px-10 py-4 bg-[#d3dcde] text-[var(--navy-midnight)] font-sans text-sm tracking-widest uppercase hover:bg-[#b8c4c7] transition-colors duration-300"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="px-10 py-4 border-2 border-[#d3dcde] text-[var(--navy-midnight)] font-sans text-sm tracking-widest uppercase hover:bg-[#d3dcde] hover:text-[var(--navy-midnight)] transition-all duration-300"
            >
              Book a Consultation
            </a>
          </div>

          {/* Description - Now below buttons */}
          <p
            ref={descriptionRef}
            className="font-sans text-[var(--navy-midnight)]/80 text-lg md:text-xl max-w-xl leading-relaxed will-change-transform mb-8"
          >
            Curated in-home entertaining experiences for those who appreciate 
            the art of gathering. Serving Palm Springs and surrounding desert communities.
          </p>

          {/* Meet the Designer Button */}
          <button
            onClick={onOpenDesigner}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-[#c97b6e] text-white hover:bg-[#b56a5d] transition-all duration-300 shadow-lg"
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

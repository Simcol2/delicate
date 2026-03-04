'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const subTaglineRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      // Tagline fades in first
      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
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
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20"
    >
      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--white-pure)]/90 via-[var(--white-pure)]/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Top Tagline */}
          <p
            ref={taglineRef}
            className="text-[var(--plum-royal)] text-sm tracking-[0.3em] uppercase mb-8 font-sans font-medium py-2"
          >
            Luxury Floral & Tablescape Design
          </p>
          
          {/* Main Headline */}
          <h1
            ref={titleRef}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--plum-deep)] leading-[0.95]"
          >
            You Host.
            <br />
            <span 
              className="text-[var(--gold-antique)]"
              style={{ fontFamily: 'var(--font-script), cursive' }}
            >
              We Style.
            </span>
          </h1>
          
          {/* Sub-tagline */}
          <p 
            ref={subTaglineRef}
            className="font-serif italic text-[var(--plum-royal)] text-xl md:text-2xl mt-3 mb-8"
          >
            Dressing your tables better than your guests
          </p>
          
          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4 mb-10">
            <a
              href="#services"
              className="px-10 py-4 bg-[var(--plum-deep)] text-[var(--gold-antique)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-royal)] transition-colors duration-300"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="px-10 py-4 border-2 border-[var(--plum-deep)] text-[var(--plum-deep)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-deep)] hover:text-[var(--gold-antique)] transition-all duration-300"
            >
              Book a Consultation
            </a>
          </div>

          {/* Description - Now below buttons */}
          <p
            ref={descriptionRef}
            className="font-sans text-[var(--navy-midnight)]/80 text-lg md:text-xl max-w-xl leading-relaxed"
          >
            Curated in-home entertaining experiences for those who appreciate 
            the art of gathering. Serving Palm Springs and surrounding desert communities.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-6 lg:left-12 flex flex-col items-start gap-3 z-10">
        <span className="text-[var(--plum-royal)]/60 text-xs tracking-widest uppercase font-sans">Scroll</span>
        <ArrowDown className="text-[var(--plum-royal)]/60 animate-bounce" size={20} />
      </div>
    </section>
  )
}

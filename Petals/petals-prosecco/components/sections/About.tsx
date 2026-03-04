'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-40"
    >
      {/* Subtle dark overlay for the entire section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--plum-deep)]/60 via-[var(--plum-deep)]/70 to-[var(--plum-deep)]/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Text Box with Dark Transparency */}
          <div className="bg-[var(--plum-deep)]/85 backdrop-blur-sm border border-[var(--gold-antique)]/20 p-8 lg:p-16 max-w-4xl mx-auto">
            <div ref={contentRef}>
              <span className="text-[var(--gold-antique)] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
                Our Story
              </span>
              
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[var(--blush-warm)] leading-tight mb-8">
                Creating Moments
                <br />
                <span 
                  className="text-[var(--gold-antique)]"
                  style={{ fontFamily: 'var(--font-script), cursive' }}
                >
                  That Linger
                </span>
              </h2>
              
              <p className="font-sans text-[var(--blush-warm)]/90 text-lg leading-relaxed mb-6">
                Delicate Flowers was born from a simple belief: the most memorable 
                gatherings happen in the comfort of home. We transform your space 
                into an immersive experience where every detail whispers luxury.
              </p>
              
              <p className="font-sans text-[var(--blush-warm)]/90 text-lg leading-relaxed mb-10">
                From intimate dinner parties to celebratory brunches, we bring 
                editorial-level styling to your table. Our approach blends seasonal 
                florals, vintage textiles, and artisanal tableware to create 
                tablescapes that tell your unique story.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[var(--gold-antique)]/30">
                <div>
                  <span className="font-serif text-4xl text-[var(--gold-antique)]">150+</span>
                  <p className="font-sans text-sm text-[var(--blush-warm)]/70 mt-2 uppercase tracking-wider">Events Styled</p>
                </div>
                <div>
                  <span className="font-serif text-4xl text-[var(--gold-antique)]">5</span>
                  <p className="font-sans text-sm text-[var(--blush-warm)]/70 mt-2 uppercase tracking-wider">Years Experience</p>
                </div>
                <div>
                  <span className="font-serif text-4xl text-[var(--gold-antique)]">100%</span>
                  <p className="font-sans text-sm text-[var(--blush-warm)]/70 mt-2 uppercase tracking-wider">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

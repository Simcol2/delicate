'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="relative py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="section-label">Our Story</span>
            
            {/* Playfair Display Bold */}
            <h2 
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-midnight leading-[1.1] mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Creating Moments
              <br />
              <em className="not-italic" style={{ color: '#FF6F61' }}>That Linger</em>
            </h2>
            
            <div className="space-y-6 text-text-mid text-base lg:text-lg font-semibold leading-relaxed">
              <p>
                Delicate Flowers was born from a simple belief: the most memorable 
                gatherings happen in the comfort of home. We transform your space 
                into an immersive experience where every detail whispers luxury.
              </p>
              
              <p>
                From intimate dinner parties to celebratory brunches, we bring 
                editorial-level styling to your table. Our approach blends seasonal 
                florals, vintage textiles, and artisanal tableware to create 
                tablescapes that tell your unique story.
              </p>

              <p className="font-serif text-xl lg:text-2xl italic font-bold pt-4" style={{ color: '#FF6F61' }}>
                Let us dress your table better than your guests.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-10 mt-10 border-t border-midnight/30">
              <div>
                <span 
                  className="text-3xl lg:text-4xl text-midnight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
                >
                  150+
                </span>
                <p className="font-sans text-xs text-text-mid font-bold mt-2 uppercase tracking-[0.2em]">Events Styled</p>
              </div>
              <div>
                <span 
                  className="text-3xl lg:text-4xl text-midnight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
                >
                  5
                </span>
                <p className="font-sans text-xs text-text-mid mt-2 uppercase tracking-[0.2em]">Years Experience</p>
              </div>
              <div>
                <span 
                  className="text-3xl lg:text-4xl text-midnight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
                >
                  100%
                </span>
                <p className="font-sans text-xs text-text-mid mt-2 uppercase tracking-[0.2em]">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-[400px] lg:h-[500px]">
            <img 
              src="/Photo Slides/Outdoor Soiree/Delicate Flower-10.png"
              alt="Outdoor soiree floral arrangement"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent" />
            <div className="absolute inset-4 border border-cream/50" />
            <div className="absolute bottom-8 left-8 right-8 bg-cream/95 backdrop-blur-sm p-6">
              <p className="font-serif italic text-midnight text-center">
                &ldquo;Every petal placed with purpose.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

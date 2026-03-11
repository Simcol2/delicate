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
      className="relative py-32 lg:py-40 bg-[#FAF6F0]/50"
    >
      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Text Box with Cream Background */}
          <div className="bg-[#fffdf9]/75 border border-[#C9A96E]/30 p-8 lg:p-16 max-w-4xl mx-auto shadow-lg">
            <div ref={contentRef}>
              <span className="text-[#CC2A7A] text-sm tracking-[0.3em] uppercase font-sans block mb-4 font-medium">
                <span className="font-bold">Our Story</span>
              </span>
              
              <h2 className="font-serif font-bold text-4xl lg:text-5xl xl:text-6xl text-[#1A2744] leading-tight mb-8">
                Creating Moments
                <br />
                <span 
                  className="text-[#CC2A7A] font-bold"
                  style={{ fontFamily: 'var(--font-script), cursive' }}
                >
                  That Linger
                </span>
              </h2>
              
              <p className="font-sans text-[#1A2744] text-lg leading-relaxed mb-6">
                Delicate Flowers was born from a simple belief: the most memorable 
                gatherings happen in the comfort of home. We transform your space 
                into an immersive experience where every detail whispers luxury.
              </p>
              
              <p className="font-sans text-[#1A2744] text-lg leading-relaxed mb-10">
                From intimate dinner parties to celebratory brunches, we bring 
                editorial-level styling to your table. Our approach blends seasonal 
                florals, vintage textiles, and artisanal tableware to create 
                tablescapes that tell your unique story.
              </p>

              <p 
                className="text-[#CC2A7A] font-bold text-3xl lg:text-4xl leading-relaxed mb-10"
                style={{ fontFamily: 'var(--font-script), cursive' }}
              >
                Let us dress your table better than your guests.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#C9A96E]">
                <div>
                  <span className="font-serif text-4xl text-[#CC2A7A]">150+</span>
                  <p className="font-sans text-sm text-[#1A2744] mt-2 uppercase tracking-wider font-bold">Events Styled</p>
                </div>
                <div>
                  <span className="font-serif text-4xl text-[#CC2A7A]">5</span>
                  <p className="font-sans text-sm text-[#1A2744] mt-2 uppercase tracking-wider font-bold">Years Experience</p>
                </div>
                <div>
                  <span className="font-serif text-4xl text-[#CC2A7A]">100%</span>
                  <p className="font-sans text-sm text-[#1A2744] mt-2 uppercase tracking-wider font-bold">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

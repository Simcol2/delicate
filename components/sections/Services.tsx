'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ServicesProps {
  onOpenContact: () => void
}

const services = [
  {
    title: 'The Look',
    description: 'Curated, high-end floral and tablescape styling designed to transform your dining space into an immersive visual experience.',
    image: '/images/Delicate%20Flower-4-table%20setting2.png',
  },
  {
    title: 'The Smoke',
    description: 'Artisan, slow-smoked heritage meats crafted to provide a rich, savory centerpiece for your curated menu. Inquire about our signature seasoning.',
    image: '/images/Delicate%20Flower-5-smoker.png',
  },
  {
    title: 'The Treats',
    description: 'Bespoke, custom-formulated signature cocktails designed to perfectly complement the exact aesthetic and flavor profile of your gathering.',
    image: '/images/Delicate%20Flower-4-drink%20(1).png',
  },
]

export default function Services({ onOpenContact }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 lg:py-40"
    >
      {/* Terracotta overlay at 20% opacity */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'rgba(201, 89, 74, 0.2)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Blurred box behind header and cards */}
        <div className="relative flex flex-col items-center justify-center mb-20">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-full max-w-3xl h-full rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 0,
              top: 0,
              height: '100%',
            }}
          />
          <div className="relative z-10 text-center max-w-3xl mx-auto py-10">
            <span className="text-[#8f0e04] text-sm tracking-[0.3em] uppercase font-sans block mb-4 font-medium">
              <span className="font-bold">What We Offer</span>
            </span>
            <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#2c2420] leading-tight mb-6 drop-shadow-lg">
                Three Elements
                <br />
                <span className="text-[#faf6f0] drop-shadow-md" style={{ fontFamily: 'var(--font-script), cursive' }}>Of Style</span>
            </h2>
            <p className="font-sans text-[#2c2420]/80 text-lg mb-10">
              Every gathering deserves intentional design. Our curated approach 
              brings together sight, taste, and atmosphere.
            </p>
            {/* Service Cards - 3 columns */}
            <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto items-stretch justify-items-center">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-lg flex flex-col h-64 md:h-auto w-full max-w-xs md:max-w-none"
                  style={{ aspectRatio: '3/4' }}
                >
                  {/* Content at bottom */}
                  <div 
                    className="absolute bottom-4 left-4 right-4 p-6 md:p-8 flex flex-col justify-center items-center"
                  >
                    <h3 className="font-serif text-3xl text-[#2c2420] mb-3 drop-shadow-lg leading-tight text-center">
                      <span className="font-bold">{service.title}</span>
                    </h3>
                    <p className="font-sans text-[#2c2420] text-sm leading-relaxed drop-shadow-md text-center">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-sans text-white font-bold text-sm mb-6">
            Not sure what you need? Let&apos;s discuss your vision.
          </p>
          <button
            onClick={onOpenContact}
            className="inline-block px-10 py-4 bg-[#c9594a] text-white font-sans text-sm tracking-widest uppercase hover:bg-[#8f0e04] hover:text-[#faf6f0] transition-all duration-300 border-2 border-[#c9594a]"
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  )
}

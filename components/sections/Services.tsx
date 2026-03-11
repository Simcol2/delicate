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
      {/* Blurred white box behind section, 50% opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      />
      {/* Terracotta overlay at 20% opacity */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'rgba(201, 89, 74, 0.2)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#8f0e04] text-sm tracking-[0.3em] uppercase font-sans block mb-4 font-medium">
            What We Offer
          </span>
          <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#2c2420] leading-tight mb-6 drop-shadow-lg">
            Three Elements
            <br />
            <span className="text-[#faf6f0] drop-shadow-md">Of Style</span>
          </h2>
          <p className="font-sans text-[#2c2420]/80 text-lg">
            Every gathering deserves intentional design. Our curated approach 
            brings together sight, taste, and atmosphere.
          </p>
        </div>

        {/* Service Cards - 3 columns with images */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto items-stretch justify-items-center">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-lg flex flex-col h-64 md:h-auto w-full max-w-xs md:max-w-none"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Background Image using img tag - hidden on mobile */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 hidden md:block"
              />
              {/* Content at bottom */}
              <div 
                className="absolute bottom-4 left-4 right-4 p-6 md:p-8 flex flex-col justify-center items-center"
              >
                <h3 className="font-serif text-3xl text-[#2c2420] mb-3 drop-shadow-lg leading-tight text-center">
                  {service.title}
                </h3>
                <p className="font-sans text-[#2c2420] text-sm leading-relaxed drop-shadow-md text-center">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-sans text-[#2c2420]/80 text-sm mb-6">
            Not sure what you need? Let&apos;s discuss your vision.
          </p>
          <button
            onClick={onOpenContact}
            className="inline-block px-10 py-4 border-2 border-[#8f0e04] text-[#8f0e04] font-sans text-sm tracking-widest uppercase hover:bg-[#8f0e04] hover:text-[#faf6f0] transition-all duration-300"
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  )
}

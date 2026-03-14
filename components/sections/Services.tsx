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
    num: '01',
    title: 'The Look',
    description: 'Curated, high-end floral and tablescape styling designed to transform your dining space into an immersive visual experience.',
    image: '/images/Delicate%20Flower-4-table%20setting2.png',
  },
  {
    num: '02',
    title: 'The Smoke',
    description: 'Artisan, slow-smoked heritage meats crafted to provide a rich, savory centerpiece for your curated menu. Inquire about our signature seasoning.',
    image: '/images/Delicate%20Flower-5-smoker.png',
  },
  {
    num: '03',
    title: 'The Treats',
    description: 'Bespoke, custom-formulated signature cocktails designed to perfectly complement the exact aesthetic and flavor profile of your gathering.',
    image: '/images/Delicate%20Flower-4-drink%20(1).png',
  },
]

export default function Services({ onOpenContact }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 60, opacity: 0 },
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
      className="relative py-24 lg:py-32 bg-ivory overflow-hidden"
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(194,150,90,0.08) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(155,173,152,0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <span className="section-label justify-center">What We Offer</span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-dark mt-4 mb-6">
            Three Elements
            <br />
            <em className="text-rose not-italic">Of Style</em>
          </h2>
          <p className="font-sans text-text-mid text-base lg:text-lg max-w-xl mx-auto">
            Every gathering deserves intentional design. Our curated approach 
            brings together sight, taste, and atmosphere.
          </p>
        </div>

        {/* Service Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-cream border border-gold/20 p-8 lg:p-10 hover:border-gold/50 transition-all duration-500"
            >
              <span className="font-serif text-5xl lg:text-6xl text-gold/30">{service.num}</span>
              <h3 className="font-serif text-xl lg:text-2xl text-dark mt-4 mb-4">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-text-mid leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-sans text-text-mid text-sm mb-6">
            Not sure what you need? Let&apos;s discuss your vision.
          </p>
          <a
            href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <span>Schedule a Call</span>
          </a>
        </div>
      </div>
    </section>
  )
}

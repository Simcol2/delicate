'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Flower2, Wine, Flame } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Flower2,
    title: 'The Look',
    description: 'Curated, high-end floral and tablescape styling designed to transform your dining space into an immersive visual experience.',
  },
  {
    icon: Flame,
    title: 'The Smoke',
    description: 'Artisan, slow-smoked heritage meats crafted to provide a rich, savory centerpiece for your curated menu.',
  },
  {
    icon: Wine,
    title: 'The Treats',
    description: 'Bespoke, custom-formulated signature cocktails designed to perfectly complement the exact aesthetic and flavor profile of your gathering.',
  },
]

export default function Services() {
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
      className="py-32 lg:py-40 bg-[var(--plum-deep)]"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[var(--gold-antique)] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
            What We Offer
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[var(--blush-warm)] leading-tight mb-6">
            Three Elements
            <br />
            <span className="text-[var(--gold-antique)]">Of Style</span>
          </h2>
          <p className="font-sans text-[var(--blush-warm)]/70 text-lg">
            Every gathering deserves intentional design. Our curated approach 
            brings together sight, taste, and atmosphere.
          </p>
        </div>

        {/* Service Cards - 3 columns */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 bg-[var(--plum-royal)]/30 border border-[var(--gold-antique)]/10 hover:border-[var(--gold-antique)]/30 transition-all duration-500 text-center"
            >
              <service.icon className="text-[var(--gold-antique)] mb-6 mx-auto" size={32} strokeWidth={1.5} />
              <h3 className="font-serif text-2xl text-[var(--blush-warm)] mb-4">
                {service.title}
              </h3>
              <p className="font-sans text-[var(--blush-warm)]/60 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-sans text-[var(--blush-warm)]/60 text-sm mb-6">
            Not sure what you need? Let&apos;s discuss your vision.
          </p>
          <a
            href="#contact"
            className="inline-block px-10 py-4 border border-[var(--gold-antique)] text-[var(--gold-antique)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--gold-antique)] hover:text-[var(--plum-deep)] transition-all duration-300"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </section>
  )
}

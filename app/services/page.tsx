'use client'

import { useState, useEffect } from 'react'
import { Wine, UtensilsCrossed, GlassWater } from 'lucide-react'
import ContactModal from '@/components/ui/ContactModal'

const services = [
  {
    id: 'tablescapes',
    icon: UtensilsCrossed,
    title: 'Tablescapes',
    description: 'Curated, high-end floral and tablescape styling designed to transform your dining space into an immersive visual experience.',
    features: [
      'Custom floral centerpieces',
      'Tablescaping with charge plates & dinnerware',
      'Styled & provided napkins',
      'Personalized place cards',
      'Tablecloth & linen selection',
      'On-site setup',
    ],
  },
  {
    id: 'cocktail-bar',
    icon: GlassWater,
    title: 'Cocktail Bar',
    description: 'Bespoke, custom-formulated signature cocktails designed to perfectly complement the exact aesthetic and flavor profile of your gathering.',
    features: [
      'Signature cocktail creation',
      'Professional bartending service',
      'Custom drink menu design',
      'Bar styling & setup',
      'Glassware & equipment',
      'Non-alcoholic options',
    ],
  },
  {
    id: 'smoked-meats',
    icon: Wine,
    title: 'Smoked Meats',
    description: 'Artisan, slow-smoked heritage meats crafted to provide a rich, savory centerpiece for your curated menu.',
    features: [
      'Brisket, turkey, chicken, or pork',
      'Expert smoking technique',
      'Signature seasoning blends',
      'Beautiful presentation',
      'Complementary sides available',
      'Setup & service',
    ],
  },
]

export default function ServicesPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-cream pt-32 lg:pt-40 pb-0">
      {/* Header */}
      <header className="text-center px-6 pt-10 pb-16 max-w-2xl mx-auto">
        <p className="section-label justify-center font-semibold">What We Do</p>
        <h1 
          className="text-4xl lg:text-5xl xl:text-6xl font-bold text-midnight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Our <em className="not-italic" style={{ color: '#FF6F61' }}>Services</em>
        </h1>
        <p className="font-sans text-text-mid text-base lg:text-lg font-semibold leading-relaxed mt-6">
          We bring together sight, taste, and atmosphere to create unforgettable 
          gatherings. Three core services, endless possibilities.
        </p>
      </header>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={`bg-ivory p-8 lg:p-10 border border-midnight/10 hover:border-midnight/30 transition-all duration-500 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-full bg-midnight/10">
                  <Icon className="w-6 h-6 text-midnight" />
                </div>

                {/* Number */}
                <span 
                  className="text-4xl lg:text-5xl block mb-4"
                  style={{ color: 'rgba(45, 169, 194, 0.3)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
                >
                  0{i + 1}
                </span>

                {/* Title */}
                <h2 
                  className="text-2xl lg:text-3xl text-midnight mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p className="font-sans text-text-mid font-semibold mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-3 text-sm font-semibold text-text-mid"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-midnight mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="btn-text font-semibold"
                >
                  Learn More
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Pricing Note */}
      <section className="bg-midnight py-16 px-6 text-center">
        <h2 
          className="text-2xl lg:text-3xl text-cream mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
        >
          Custom Packages
        </h2>
        <p className="font-sans text-cream/80 font-semibold max-w-lg mx-auto mb-8">
          Every event is unique. We create custom packages based on your guest count, 
          styling scope, and services selected. Contact us for a personalized quote.
        </p>
        <a
          href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300"
          style={{ backgroundColor: '#FF6F61', color: '#FAF9F6' }}
        >
          Schedule a Consultation
        </a>
        <p className="font-sans text-cream/60 text-sm mt-6 italic font-semibold">
          Scheduling a call is great, but feel free to just call if you have any quick questions!
        </p>
      </section>

      {/* Back to Home */}
      <div className="text-center py-16 bg-cream">
        <a href="/" className="btn-text font-semibold">
          Back to Home
        </a>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </main>
  )
}

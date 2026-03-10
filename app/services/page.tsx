'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import Navbar from '@/components/navigation/Navbar'
import { Sun, Heart, Wine, Sparkles, Plus } from 'lucide-react'

const packages = [
  {
    id: 'sunset',
    name: 'The Sunset',
    icon: Sun,
    description: 'An intimate gathering for those who appreciate golden hour elegance. Perfect for small dinners and casual celebrations.',
    features: [
      'Floral centerpieces (2-3 tables)',
      'Table linens & napkins',
      'Candle arrangement',
      'Basic tableware styling',
      '2-hour setup & styling',
    ],
    price: 'Starting at $850',
    color: 'from-orange-400 to-pink-500',
  },
  {
    id: 'affair',
    name: 'The Affair',
    icon: Heart,
    description: 'A curated experience for special moments. Ideal for anniversaries, birthdays, and meaningful celebrations.',
    features: [
      'Custom floral installations',
      'Premium linens & textiles',
      'Designer tableware',
      'Ambient lighting design',
      '4-hour setup & styling',
      'Personalized place cards',
    ],
    price: 'Starting at $1,850',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'champagne',
    name: 'The Champagne Toast',
    icon: Wine,
    description: 'The ultimate luxury experience. For those who want to make a statement with their celebration.',
    features: [
      'Bespoke floral masterpieces',
      'Luxury linens & dinnerware',
      'Custom cocktail service setup',
      'Professional lighting',
      'Full day coordination',
      'Photography styling',
      'Personalized favors',
    ],
    price: 'Starting at $3,500',
    color: 'from-amber-400 to-yellow-500',
  },
]

const addOns = [
  { name: 'Signature Cocktail Service', price: '+$350' },
  { name: 'Photo Booth Setup', price: '+$450' },
  { name: 'Live Floral Installation', price: '+$650' },
  { name: 'Additional Tables (per table)', price: '+$150' },
]

export default function ServicesPage() {
  useEffect(() => {
    // Animate packages on load
    const cards = document.querySelectorAll('.package-card')
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      }
    )
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--white-pure)] pt-32 pb-20">
        <div className="w-full px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[var(--gold-antique)] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
              Our Packages
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[var(--plum-deep)] leading-tight mb-6">
              Curated Experiences
            </h1>
            <p className="font-sans text-[var(--navy-midnight)]/70 text-lg">
              Choose from our thoughtfully designed packages or create your own bespoke experience.
            </p>
          </div>

          {/* Three Packages - One Row */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="package-card group relative bg-white rounded-xl shadow-lg overflow-hidden border border-[var(--gold-antique)]/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Header with gradient */}
                <div className={`h-24 bg-gradient-to-r ${pkg.color} flex items-center justify-center`}>
                  <pkg.icon className="text-white w-10 h-10" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-[calc(100%-6rem)]">
                  <h3 className="font-serif text-2xl text-[var(--plum-deep)] mb-2 text-center">
                    {pkg.name}
                  </h3>
                  <p className="font-sans text-[var(--navy-midnight)]/70 text-sm text-center mb-4">
                    {pkg.description}
                  </p>
                  <p className="font-serif text-xl text-[var(--plum-deep)] text-center mb-4">
                    {pkg.price}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[var(--navy-midnight)]/80">
                        <Sparkles className="w-4 h-4 text-[var(--gold-antique)] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href="/#contact"
                    className="w-full block text-center px-6 py-3 bg-[var(--plum-deep)] text-[var(--gold-antique)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-royal)] transition-colors duration-300"
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-[#f5f0e8] rounded-xl p-8 border border-[var(--gold-antique)]/20">
              <div className="flex items-center gap-3 mb-6">
                <Plus className="w-6 h-6 text-[var(--plum-deep)]" />
                <h2 className="font-serif text-3xl text-[var(--plum-deep)]">Add-Ons</h2>
              </div>
              <p className="font-sans text-[var(--navy-midnight)]/70 mb-6">
                Enhance any package with these special additions:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {addOns.map((addon, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                  >
                    <span className="font-sans text-[var(--navy-midnight)]">{addon.name}</span>
                    <span className="font-serif text-[var(--plum-deep)]">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Build Your Own Section */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[var(--plum-deep)] rounded-xl p-8 text-white">
              <h2 className="font-serif text-3xl mb-4">Build Your Own Package</h2>
              <p className="font-sans text-white/80 mb-6">
                Have a unique vision? We love creating bespoke experiences tailored to your specific needs and preferences. Let us bring your dream tablescape to life.
              </p>
              <a
                href="/#contact"
                className="inline-block px-10 py-4 border-2 border-[var(--gold-antique)] text-[var(--gold-antique)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--gold-antique)] hover:text-[var(--plum-deep)] transition-all duration-300"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-16">
            <a
              href="/"
              className="inline-block px-10 py-4 border-2 border-[var(--plum-deep)] text-[var(--plum-deep)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-deep)] hover:text-[var(--gold-antique)] transition-all duration-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

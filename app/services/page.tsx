'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import ContactModal from '@/components/ui/ContactModal'

const packages = [
  {
    id: 'sunset',
    badge: 'The Sunset',
    name: 'Sunset',
    guests: 'Up to 8 Guests',
    description: 'An intimate, beautifully considered tablescape for smaller gatherings where every seat feels special. Thoughtfully styled from centerpiece to place card, we handle it all, so you can simply arrive and enjoy.',
    features: [
      '3 custom floral centerpieces',
      'Tablescaping with charge plates & dinnerware (ours or yours)',
      'Styled & provided napkins',
      'Personalized place cards',
      'Tablecloth included',
      'On-site setup the day before',
      'Full breakdown & pickup the day after',
    ],
    price: '$750',
    featured: false,
  },
  {
    id: 'champagne',
    badge: 'Most Popular',
    name: 'Champagne',
    guests: 'Up to 20 Guests',
    description: 'Full-scale table design for the events worth celebrating properly. Every element is considered, from the centerpieces to the bar to the moment your guests walk through the door. This is the package for hosts who want the whole picture to feel intentional.',
    features: [
      '3 custom floral centerpieces',
      'Complete table setting, chargers, cutlery, glassware & china (as needed)',
      'Full tablescaping & styling',
      'Bar styling with florals included',
      'Entry styling with florals included',
    ],
    price: '$1,250',
    featured: true,
  },
  {
    id: 'affair',
    badge: 'The Affair',
    name: 'The Affair',
    guests: '20+ Guests',
    description: 'For the event that commands presence in every room. A full-venue transformation, from the entry to the restrooms, built around a custom design concept that ties every space together. This is the experience guests talk about long after the night ends.',
    features: [
      '3 statement floral centerpieces',
      'Multi-table styling',
      'Custom themed design concept',
      'Elevated place settings throughout',
      'Bar & lounge styling',
      'Entry styling (1)',
      'Restroom styling (2 spaces)',
      'Kitchen accent styling (1)',
      'Accent florals throughout',
    ],
    price: '$2,500',
    featured: false,
  },
]

const addOns = [
  {
    name: 'Signature Dessert Display',
    description: 'A styled spread designed to be as beautiful as it is delicious.',
  },
  {
    name: 'Signature Cocktail Station',
    description: 'A fully styled cocktail setup that doubles as a conversation piece.',
  },
  {
    name: 'Smoked Meats',
    description: 'Brisket, turkey, chicken, or pork, expertly smoked and beautifully presented.',
  },
  {
    name: 'Specialty Vases',
    description: 'Curated vessels that elevate your florals and anchor your aesthetic.',
  },
  {
    name: 'Outdoor Entry Styling',
    description: 'Set the tone before guests step inside, a styled outdoor welcome moment.',
  },
]

const byoItems = [
  {
    name: 'Your Spaces',
    description: 'Main table, bar, entry, lounge, kitchen, bathroom, outdoors, choose what you want styled.',
  },
  {
    name: 'Your Aesthetic',
    description: 'Vibe, color palette, theme, floral preferences, we build around your vision, not a template.',
  },
  {
    name: 'Your Details',
    description: 'Tableware, linens, place settings, centerpieces, mix our inventory with your own pieces.',
  },
  {
    name: 'Your Add-ons',
    description: 'Dessert displays, cocktail stations, smoked meats, specialty florals, layer in anything you love.',
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
        <p className="section-label justify-center">Every detail. Every table. Every time.</p>
        <h1 className="section-title">
          Packages designed<br />
          for <em className="text-rose">moments that matter.</em>
        </h1>
        <p className="font-sans text-text-mid text-[15px] leading-[1.85] mt-6">
          Whether you&apos;re hosting eight of your closest friends or staging an event that fills every room, our packages are built around one belief: the table sets the tone for everything that happens around it.
        </p>
        <div className="flex items-center justify-center gap-4 mt-9">
          <span className="w-[50px] h-[1px] bg-midnight" />
          <span className="font-serif italic text-midnight text-lg">✦</span>
          <span className="w-[50px] h-[1px] bg-midnight" />
        </div>
      </header>

      {/* Pricing Note */}
      <p className="text-center text-xs tracking-wide text-text-mid/70 max-w-md mx-auto px-6 mb-14">
        Pricing shown is a starting figure. Final quotes are tailored to your guest count, styling scope, and add-ons selected. A consultation is required to confirm your custom total.
      </p>

      {/* Three Packages */}
      <section className="grid md:grid-cols-3 gap-[2px] max-w-6xl mx-auto px-6">
        {packages.map((pkg, i) => (
          <div
            key={pkg.id}
            className={`p-10 md:p-12 relative transition-all duration-300 hover:shadow-2xl hover:z-10 flex flex-col ${
              pkg.featured ? 'bg-dark' : 'bg-ivory'
            } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* Badge */}
            <span className={`text-[10px] font-medium tracking-[0.3em] uppercase block mb-3 ${
              pkg.featured ? 'text-cream' : 'text-rose'
            }`}>
              {pkg.badge}
            </span>

            {/* Name */}
            <h2 className={`font-serif text-4xl md:text-5xl font-light tracking-tight leading-none ${pkg.featured ? 'text-cream' : 'text-dark'}`}>
              {pkg.name}
            </h2>

            {/* Guests */}
            <span className={`inline-block mt-3 text-xs tracking-[0.12em] uppercase border rounded-full px-4 py-1.5 ${
              pkg.featured ? 'text-cream border-cream/30' : 'text-dark border-midnight'
            }`}>
              {pkg.guests}
            </span>

            {/* Divider */}
            <div className="w-9 h-[1px] my-7 bg-midnight" />

            {/* Description */}
            <p className={`text-sm leading-[1.85] mb-8 ${
              pkg.featured ? 'text-cream/90' : 'text-text'
            }`}>
              {pkg.description}
            </p>

            {/* Features */}
            <ul className="space-y-0 mb-10">
              {pkg.features.map((feature, idx) => (
                <li 
                  key={idx} 
                  className={`flex items-start gap-3 text-sm py-2.5 border-b ${
                    pkg.featured ? 'text-cream/90 border-cream/20' : 'text-text border-midnight/20'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${
                    pkg.featured ? 'bg-midnight' : 'bg-rose'
                  }`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className={`pt-7 border-t mt-auto ${
              pkg.featured ? 'border-cream/20' : 'border-midnight'
            }`}>
              <span className={`text-[10px] font-medium tracking-[0.28em] uppercase block mb-1.5 ${pkg.featured ? 'text-cream/70' : 'text-text-mid'}`}>
                Starting at
              </span>
              <span className={`font-serif text-4xl font-light leading-none ${pkg.featured ? 'text-cream' : 'text-dark'}`}>
                {pkg.price}
              </span>
              <p className="text-xs mt-1 text-cream/70">
                Final pricing confirmed at consultation
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block mt-7 text-xs font-medium tracking-[0.2em] uppercase border-b pb-0.5 transition-colors duration-200 ${
                pkg.featured 
                  ? 'text-cream border-cream hover:text-coral hover:border-coral' 
                  : 'text-dark border-rose hover:text-rose'
              }`}
            >
              Book a consultation
            </a>
          </div>
        ))}
      </section>

      {/* Add-ons Section */}
      <section className="max-w-4xl mx-auto mt-20 px-6 pb-16">
        <div className="text-center mb-10">
          <p className="section-label justify-center">Elevate your experience</p>
          <h2 className="section-title">
            Curated <em className="text-rose">add-ons</em>
          </h2>
          <p className="font-sans text-text-mid text-[15px] leading-[1.75] mt-4 max-w-md mx-auto">
            Layer in something extra. Each add-on is priced individually and can be added to any package during your consultation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-[2px] mt-9 bg-midnight/15">
          {addOns.map((addon, idx) => (
            <div
              key={idx}
              className="bg-ivory p-7 text-center"
            >
              <Sparkles className="w-5 h-5 text-rose mx-auto mb-2.5" />
              <span className="font-serif text-lg text-dark block mb-1.5">
                {addon.name}
              </span>
              <span className="text-sm text-text-mid leading-snug block">
                {addon.description}
              </span>
              <span className="inline-block mt-2.5 text-[10px] tracking-[0.2em] uppercase text-rose border border-midnight/20 px-2.5 py-1">
                Priced on request
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Build Your Own Section */}
      <section className="bg-ivory px-6 py-20 text-center mt-[2px] border-t border-midnight/20">
        <p className="section-label justify-center">Fully bespoke</p>
        <h2 className="section-title">
          Build <em className="text-rose">Your Own</em>
        </h2>
        <p className="font-sans text-text-mid text-[15px] leading-[1.85] mt-6 max-w-xl mx-auto">
          Not every event fits a package, and that&apos;s exactly the point. Tell us your spaces, your vision, and your vibe. We&apos;ll build a custom scope and quote around what matters most to you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] max-w-4xl mx-auto mt-12 border border-midnight/20">
          {byoItems.map((item, idx) => (
            <div
              key={idx}
              className="p-8 text-left border-b sm:border-b-0 sm:border-r last:border-r-0 border-midnight/20 bg-cream"
            >
              <span className="font-serif text-xl text-dark block mb-2">
                {item.name}
              </span>
              <span className="text-sm text-text-mid leading-relaxed block">
                {item.description}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsContactModalOpen(true)}
          className="btn-primary mt-12"
        >
          <span>Start building your experience</span>
        </button>
        <p className="text-xs text-text-light tracking-wide mt-4">
          A consultation is required for all custom packages. The $75 site visit fee is credited to your balance at booking.
        </p>
      </section>

      {/* Back to Home */}
      <div className="text-center py-16 bg-cream">
        <a href="/" className="btn-text">
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

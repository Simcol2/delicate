'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Navbar from '@/components/navigation/Navbar'
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

  useEffect(() => {
    // Animate packages on load
    const cards = document.querySelectorAll('.pkg-card')
    gsap.fromTo(
      cards,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      }
    )

    // Animate add-ons
    const addons = document.querySelectorAll('.addon-item')
    gsap.fromTo(
      addons,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.4,
      }
    )
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF6F0] pt-32 pb-0">
        <div className="w-full">
          {/* Header */}
          <header className="text-center px-6 pt-10 pb-16 max-w-2xl mx-auto">
            <span className="text-[#CC2A7A] text-xs tracking-[0.35em] uppercase font-sans block mb-5">
              Every detail. Every table. Every time.
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A2744] leading-tight font-bold">
              Packages designed<br />
              for <em className="text-[#CC2A7A] italic">moments that matter.</em>
            </h1>
            <p className="font-sans text-[#1A2744] text-[15px] leading-[1.85] mt-6">
              Whether you&apos;re hosting eight of your closest friends or staging an event that fills every room, our packages are built around one belief: the table sets the tone for everything that happens around it. Choose the experience that fits your vision, or build your own from the ground up.
            </p>
            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mt-9">
              <span className="w-[50px] h-[1px] bg-[#CC2A7A]" />
              <span className="font-serif italic text-[#CC2A7A] text-lg">✦</span>
              <span className="w-[50px] h-[1px] bg-[#c9594a]" />
            </div>
          </header>

          {/* Pricing Note */}
          <p className="text-center text-xs tracking-wide text-[#1A2744]/70 max-w-md mx-auto px-6 mb-14">
            Pricing shown is a starting figure. Final quotes are tailored to your guest count, styling scope, and add-ons selected. A consultation is required to confirm your custom total.
          </p>

          {/* Three Packages - One Row */}
          <section className="grid md:grid-cols-3 gap-[2px] max-w-6xl mx-auto px-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`pkg-card p-10 md:p-12 relative opacity-0 transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(44,36,32,0.08)] hover:z-10 flex flex-col ${
                  pkg.featured ? 'bg-[#1A2744]' : 'bg-[#FFFDF9]'
                }`}
              >
                {/* Badge */}
                <span className={`text-[10px] font-medium tracking-[0.3em] uppercase block mb-3 ${
                  pkg.featured ? 'text-white' : 'text-[#CC2A7A]'
                }`}>
                  {pkg.badge}
                </span>

                {/* Name */}
                <h2 className={`font-serif text-4xl md:text-5xl font-bold tracking-tight leading-none ${pkg.featured ? 'text-white' : 'text-[#1A2744]'}`}>
                  {pkg.name}
                </h2>

                {/* Guests */}
                <span className={`inline-block mt-3 text-xs tracking-[0.12em] uppercase border rounded-full px-4 py-1.5 ${
                  pkg.featured 
                    ? 'text-white border-white/30' 
                    : 'text-[#1A2744] border-[#C9A96E]'
                }`}>
                  {pkg.guests}
                </span>

                {/* Divider */}
                <div className="w-9 h-[1px] my-7 bg-[#C9A96E]" />

                {/* Description */}
                <p className={`text-sm leading-[1.85] mb-8 ${
                  pkg.featured ? 'text-white/90' : 'text-[#1A2744]'
                }`}>
                  {pkg.description}
                </p>

                {/* Features */}
                <ul className="space-y-0 mb-10">
                  {pkg.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className={`flex items-start gap-3 text-sm py-2.5 border-b ${
                        pkg.featured 
                          ? 'text-white/90 border-white/20' 
                          : 'text-[#1A2744] border-[#e8d5b0]'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${
                        pkg.featured ? 'bg-[#C9A96E]' : 'bg-[#CC2A7A]'
                      }`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className={`pt-7 border-t mt-auto ${
                  pkg.featured ? 'border-white/20' : 'border-[#C9A96E]'
                }`}>
                  <span className={`text-[10px] font-medium tracking-[0.28em] uppercase block mb-1.5 ${pkg.featured ? 'text-white/70' : 'text-[#1A2744]/70'}`}>
                    Starting at
                  </span>
                  <span className={`font-serif text-4xl font-light leading-none ${pkg.featured ? 'text-white' : 'text-[#1A2744]'}`}>
                    {pkg.price}
                  </span>
                  <p className="text-xs mt-1 text-white/70">
                    Final pricing confirmed at consultation
                  </p>
                </div>

                {/* CTA - Opens Google Calendar */}
                <a
                  href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block mt-7 text-xs font-medium tracking-[0.2em] uppercase border-b pb-0.5 transition-colors duration-200 ${
                    pkg.featured 
                      ? 'text-white border-white hover:text-[#C9A96E] hover:border-[#C9A96E]' 
                      : 'text-[#1A2744] border-[#CC2A7A] hover:text-[#CC2A7A]'
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
              <span className="text-[#CC2A7A] text-xs tracking-[0.35em] uppercase font-sans block mb-3">
                Elevate your experience
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A2744] font-bold">
                Curated <em className="text-[#CC2A7A] italic">add-ons</em>
              </h2>
              <p className="font-sans text-[#1A2744] text-[15px] leading-[1.75] mt-4 max-w-md mx-auto">
                Layer in something extra. Each add-on is priced individually and can be added to any package during your consultation.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-[2px] mt-9">
              {addOns.map((addon, idx) => (
                <div
                  key={idx}
                  className="addon-item bg-[#fffdf9] p-7 text-center opacity-0"
                >
                  <Sparkles className="w-5 h-5 text-[#CC2A7A] mx-auto mb-2.5" />
                  <span className="font-serif text-lg text-[#1A2744] block mb-1.5 font-bold">
                    {addon.name}
                  </span>
                  <span className="text-sm text-[#1A2744]/80 leading-snug block">
                    {addon.description}
                  </span>
                  <span className="inline-block mt-2.5 text-[10px] tracking-[0.2em] uppercase text-[#CC2A7A] border border-[#e8d5b0] px-2.5 py-1 rounded-full">
                    Priced on request
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Build Your Own Section - Cream background */}
          <section className="bg-[#fffdf9] px-6 py-20 text-center mt-[2px] border-t border-[#e8d5b0]">
            <span className="text-[#CC2A7A] text-xs tracking-[0.35em] uppercase font-sans block mb-4">
              Fully bespoke
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A2744] font-bold leading-tight">
              Build <em className="text-[#CC2A7A] italic">Your Own</em>
            </h2>
            <p className="font-sans text-[#6b5b52] text-[15px] leading-[1.85] mt-6 max-w-xl mx-auto">
              Not every event fits a package, and that&apos;s exactly the point. Tell us your spaces, your vision, and your vibe. We&apos;ll build a custom scope and quote around what matters most to you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] max-w-4xl mx-auto mt-12 border border-[#e8d5b0]">
              {byoItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 text-left border-b sm:border-b-0 sm:border-r last:border-r-0 border-[#e8d5b0] bg-[#faf6f0]"
                >
                  <span className="font-serif text-xl text-[#1A2744] block mb-2 font-bold">
                    {item.name}
                  </span>
                  <span className="text-sm text-[#1A2744]/80 leading-relaxed block">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block mt-12 bg-[#CC2A7A] text-[#faf6f0] text-xs font-medium tracking-[0.22em] uppercase px-9 py-4 hover:bg-[#1A2744] transition-colors duration-200"
            >
              Start building your experience
            </button>
            <p className="text-xs text-[#a89189] tracking-wide mt-4">
              A consultation is required for all custom packages. The $75 site visit fee is credited to your balance at booking.
            </p>
          </section>

          {/* Back to Home */}
          <div className="text-center py-16 bg-[#faf6f0]">
            <a
              href="/"
              className="inline-block px-10 py-4 border-2 border-[#CC2A7A] text-[#CC2A7A] font-sans text-sm tracking-widest uppercase hover:bg-[#1A2744] hover:text-[#faf6f0] transition-all duration-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  )
}

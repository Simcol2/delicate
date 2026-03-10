'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import Navbar from '@/components/navigation/Navbar'
import Image from 'next/image'

export default function AboutPage() {
  useEffect(() => {
    // Animate content on load
    const content = document.querySelector('.about-content')
    gsap.fromTo(
      content,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    )
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf8f3] pt-32 pb-20">
        <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="about-content flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Photo Side */}
            <div className="w-full md:w-2/5 relative h-72 md:h-auto md:min-h-[600px] shrink-0">
              <Image
                src="/images/WhatsApp Image 2026-03-05 at 11.32.29 AM.jpeg"
                alt="Event Designer"
                fill
                className="object-cover object-top md:object-[25%_center]"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Bio Side */}
            <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <span className="text-[var(--gold-antique)] text-xs tracking-[0.3em] uppercase font-sans font-medium mb-3">
                Meet The Designer
              </span>
              
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--plum-deep)] mb-3 leading-tight">
                Creating Tables That
                <span 
                  className="block text-[var(--plum-deep)] mt-2"
                  style={{ fontFamily: 'var(--font-script), cursive' }}
                >
                  Feel Like Home
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-[#c97b6e] font-sans text-base italic mb-6">
                April is your local crafty mamma bear that would love an invite to your next event!
              </p>

              <div className="space-y-4 text-[var(--navy-midnight)]/80 text-base leading-relaxed font-sans">
                <p>
                  I&apos;m an event stylist who believes a beautiful gathering is really about how people feel when they&apos;re sitting at the table.
                </p>
                
                <p>
                  I&apos;m known for bold florals, layered place settings, and that golden-hour glow that makes everyone linger a little longer. I design tables that feel warm, welcoming, and thoughtfully put together.
                </p>
                
                <p>
                  I have spent years perfecting the little details most people overlook. Napkins can be bunny ears and everything should sparkle. My tables feel abundant but effortless, and every guest will always feel like they were considered.
                </p>

                <p className="text-[var(--plum-deep)] font-medium italic border-l-2 border-[var(--gold-antique)] pl-4 mt-6">
                  My philosophy is simple: when people feel cared for, they remember the evening long after the dishes are washed!
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-[var(--gold-antique)]/20">
                <a
                  href="/#contact"
                  className="inline-block px-8 py-4 bg-[var(--plum-deep)] text-[var(--gold-antique)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-royal)] transition-colors duration-300"
                >
                  Schedule a Consultation
                </a>
              </div>
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

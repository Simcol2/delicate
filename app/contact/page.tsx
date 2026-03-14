'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 bg-cream"
    >
      {/* Linen texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(31, 77, 79, 0.03) 2px, rgba(31, 77, 79, 0.03) 4px),
            repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(31, 77, 79, 0.03) 2px, rgba(31, 77, 79, 0.03) 4px)
          `,
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        <div ref={contentRef} className="text-center mb-16">
          <span className="section-label justify-center font-semibold">Get in Touch</span>
          <h1 
            className="text-4xl lg:text-5xl xl:text-6xl text-midnight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
          >
            Let&apos;s Create Something
            <br />
            <em className="not-italic" style={{ color: '#FF6F61' }}>Beautiful Together</em>
          </h1>
          <p className="font-sans text-text-mid text-lg max-w-xl mx-auto">
            Ready to transform your next gathering? We&apos;d love to hear about your vision 
            and discuss how we can bring it to life.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Phone */}
          <div className="bg-white p-8 text-center border border-midnight/10 hover:border-midnight/30 transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-midnight/10">
              <Phone className="w-5 h-5 text-midnight" />
            </div>
            <h3 className="font-display text-lg text-midnight mb-2 font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Call
            </h3>
            <a 
              href="tel:7606736636" 
              className="font-sans font-semibold text-midnight hover:text-coral transition-colors"
            >
              (760) 673-6636
            </a>
          </div>

          {/* Email */}
          <div className="bg-white p-8 text-center border border-midnight/10 hover:border-midnight/30 transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-midnight/10">
              <Mail className="w-5 h-5 text-midnight" />
            </div>
            <h3 className="font-display text-lg text-midnight mb-2 font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Email
            </h3>
            <a 
              href="mailto:april@delicateflowers.co" 
              className="font-sans font-semibold text-midnight hover:text-coral transition-colors"
            >
              april@delicateflowers.co
            </a>
          </div>

          {/* Location */}
          <div className="bg-white p-8 text-center border border-midnight/10 hover:border-midnight/30 transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-midnight/10">
              <MapPin className="w-5 h-5 text-midnight" />
            </div>
            <h3 className="font-display text-lg text-midnight mb-2 font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Location
            </h3>
            <p className="font-sans font-semibold text-midnight">
              Palm Springs, CA
            </p>
          </div>
        </div>

        {/* Schedule Call CTA */}
        <div className="bg-midnight p-10 lg:p-16 text-center">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-cream/10">
            <Calendar className="w-7 h-7 text-cream" />
          </div>
          <h2 
            className="text-2xl lg:text-3xl text-cream mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
          >
            Schedule a Consultation
          </h2>
          <p className="font-sans text-cream/80 mb-8 max-w-lg mx-auto">
            Book a time to discuss your event. We&apos;ll talk through your vision, 
            answer questions, and start planning something unforgettable.
          </p>
          <a
            href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-coral text-cream font-sans text-sm font-bold tracking-widest uppercase hover:bg-turquoise transition-all duration-300"
            style={{ backgroundColor: '#FF6F61' }}
          >
            Schedule a Call
          </a>
          <p className="font-sans text-cream/60 text-sm mt-6 italic">
            Scheduling a call is great, but feel free to just call if you have any quick questions!
          </p>
        </div>
      </div>
    </section>
  )
}

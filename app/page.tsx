'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import DesignerModal from '@/components/ui/DesignerModal'
import ContactModal from '@/components/ui/ContactModal'
import MothersDayPopup from '@/components/ui/MothersDayPopup'

export default function Page() {
  const [isDesignerModalOpen, setIsDesignerModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <>
      <main>
        <Hero 
          onOpenDesigner={() => setIsDesignerModalOpen(true)} 
          onOpenContact={() => setIsContactModalOpen(true)}
        />
        <Ticker />
        
        {/* Philosophy Section */}
        <section className="py-20 lg:py-32 px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative overflow-hidden">
          {/* Background DF Text */}
          <div 
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[20rem] font-light text-gold/[0.05] leading-none pointer-events-none select-none tracking-[-0.08em]"
          >
            DF
          </div>

          <div className="relative z-10">
            <p className="section-label">Our Philosophy</p>
            <h2 className="section-title">Where the<br />desert meets<br /><em>artistry.</em></h2>
            <p className="font-serif text-xl lg:text-[1.25rem] font-light leading-[1.75] text-text-mid mt-8">
              Palm Springs is unlike anywhere else on earth. Its light is <strong className="font-medium text-dark">golden and relentless.</strong>{' '}
              Its architecture, a love letter to geometry and glass. Its mood, effortlessly glamorous{' '}
              without trying.
              <br /><br />
              Delicate Flowers was born in this landscape. We design floral experiences that feel like{' '}
              they belong here: <strong className="font-medium text-dark">sculptural, intentional, alive.</strong> Every arrangement is{' '}
              a conversation between nature and design.
            </p>
            <div className="mt-12 flex items-center gap-6">
              <div className="w-12 h-[1px] bg-gold"></div>
              <span className="font-serif italic text-base text-text-light">
                April Garrow, Founder & Lead Designer
              </span>
            </div>
          </div>

          {/* Visual Card Stack */}
          <div className="relative h-80 lg:h-[480px]">
            <div className="absolute top-0 left-0 w-[72%] h-[75%] bg-gradient-to-br from-sage-light to-blue-light flex items-center justify-center">
              <svg className="w-4/5 h-4/5" viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="260" fill="url(#c1g)" rx="0"/>
                <rect x="40" y="150" width="220" height="90" fill="rgba(255,255,255,0.4)"/>
                <rect x="35" y="144" width="230" height="10" fill="rgba(194,150,90,0.6)"/>
                <rect x="50" y="158" width="90" height="60" fill="rgba(168,189,208,0.5)"/>
                <rect x="160" y="158" width="80" height="60" fill="rgba(168,189,208,0.4)"/>
                <path d="M0 150 Q75 100 150 130 Q225 95 300 140 L300 260 L0 260Z" fill="rgba(155,173,152,0.25)"/>
                <circle cx="250" cy="55" r="35" fill="rgba(223,192,138,0.5)"/>
                <path d="M80 240 C80 200 81 160 80 130" stroke="#8B6B4A" strokeWidth="4" fill="none"/>
                <path d="M80 130 C60 105 30 100 15 85" stroke="#9BAD98" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-[60%] h-[58%] bg-gradient-to-br from-blush to-gold-pale flex items-center justify-center">
              <svg className="w-4/5 h-4/5" viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="240" height="200" fill="rgba(232,192,176,0.3)"/>
                <circle cx="120" cy="100" r="55" fill="#E8C0B0" opacity="0.8"/>
                <circle cx="120" cy="100" r="38" fill="#D4A59A"/>
                <circle cx="120" cy="100" r="22" fill="#C9897A"/>
              </svg>
            </div>
            <div className="absolute bottom-[15%] left-[5%] w-[35%] h-[35%] bg-dark flex items-center justify-center p-6">
              <p className="font-serif italic text-sm text-gold-pale leading-relaxed text-center">
                "Every petal placed with <em>purpose.</em>"
              </p>
            </div>
            <div className="absolute -top-4 -right-4 w-[60%] h-[55%] border border-gold/30 pointer-events-none"></div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-ivory py-20 lg:py-32 px-6 lg:px-20 relative overflow-hidden">
          {/* Geometric pattern */}
          <div 
            className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{
              background: `conic-gradient(from 45deg, rgba(194,150,90,0.06) 0deg 90deg, transparent 90deg 180deg, rgba(155,173,152,0.06) 180deg 270deg, transparent 270deg 360deg)`,
            }}
          />

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
            <div>
              <p className="section-label">What We Offer</p>
              <h2 className="section-title">Floral services<br />for every <em>occasion.</em></h2>
            </div>
            <a href="/services" className="btn-text">Full Service List</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5px] bg-gold/15">
            {[
              {
                num: '01',
                title: 'Wedding Design',
                desc: 'From ceremony arches to bridal bouquets, we build floral worlds that make your wedding day feel singular. Each design is rooted in your vision and refined by our expertise.',
                link: 'Book a Consultation',
              },
              {
                num: '02',
                title: 'Event Florals',
                desc: 'Galas, private dinners, corporate affairs, milestone celebrations. We design atmospheric installations and tablescapes that turn any venue into an experience.',
                link: 'Book a Consultation',
              },
              {
                num: '03',
                title: 'Residential Design',
                desc: 'Weekly or monthly floral subscriptions that keep your home in perpetual bloom. Curated to your space, your palette, your season.',
                link: 'Book a Consultation',
              },
              {
                num: '04',
                title: "Same-Day Luxury",
                desc: 'Impeccably arranged, same-day delivered across the Coachella Valley. Every bouquet carries the Delicate Flowers standard — no exceptions.',
                link: 'Order Now',
              },
              {
                num: '05',
                title: 'Hotel & Hospitality',
                desc: "Lobby installations, suite arrangements, and ongoing partnerships with Palm Springs' most prestigious properties. We speak the language of luxury hospitality.",
                link: 'Partner With Us',
              },
              {
                num: '06',
                title: 'Sympathy & Gifts',
                desc: "Tender, thoughtful arrangements for life's most meaningful moments. Designed with care and delivered with discretion throughout the desert cities.",
                link: 'Send a Gift',
              },
            ].map((service, i) => (
              <div key={i} className="service-card bg-cream">
                <div className="service-num">{service.num}</div>
                <h3 className="font-serif-sc text-base lg:text-[1.05rem] font-normal tracking-[0.08em] text-dark mb-4">
                  {service.title}
                </h3>
                <p className="font-sans text-sm font-light leading-[1.85] text-text-mid mb-6">
                  {service.desc}
                </p>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.25em] uppercase text-gold no-underline transition-all duration-300 hover:gap-4"
                >
                  {service.link} →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Quote Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-dark py-20 lg:py-24 px-6 lg:px-20 relative overflow-hidden">
          {/* Background pattern */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(194,150,90,0.04) 59px, rgba(194,150,90,0.04) 60px),
                repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(194,150,90,0.04) 59px, rgba(194,150,90,0.04) 60px)
              `,
            }}
          />

          <div className="relative z-10">
            <span className="font-serif text-8xl leading-[0.7] text-gold opacity-25 mb-[-2rem] block">"</span>
            <p className="font-serif text-2xl lg:text-[clamp(1.6rem,2.5vw,2.4rem)] font-light italic leading-[1.5] text-cream tracking-[0.01em]">
              The desert teaches you that <em className="not-italic text-gold-pale">beauty is not soft.</em> It is intentional, 
              structured, and perfectly placed against the light.
            </p>
            <p className="mt-8 font-sans text-[0.65rem] tracking-[0.3em] uppercase text-gold flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gold"></span>
              April Garrow, Founder
            </p>
          </div>

          <div className="relative z-10">
            <svg className="w-full aspect-[3/4]" viewBox="0 0 380 500" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="190" cy="250" rx="160" ry="200" fill="rgba(194,150,90,0.06)"/>
              <rect x="90" y="350" width="200" height="150" fill="rgba(250,246,239,0.12)" rx="0"/>
              <rect x="130" y="100" width="120" height="255" fill="rgba(250,246,239,0.1)" rx="0"/>
              <rect x="120" y="94" width="140" height="10" fill="#C2965A" rx="0" opacity="0.5"/>
              <rect x="165" y="70" width="50" height="28" fill="rgba(250,246,239,0.1)"/>
              <rect x="160" y="64" width="60" height="8" fill="#C2965A" opacity="0.4"/>
            </svg>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 px-6 lg:px-20 bg-gradient-to-br from-blush via-gold-pale to-blue-light relative overflow-hidden">
          {/* Diagonal stripes */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(-45deg, transparent 0px, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center relative z-10">
            <div>
              <h2 className="font-serif text-4xl lg:text-[clamp(2.5rem,4.5vw,4rem)] font-light text-dark leading-[1.15] mb-6">
                Begin your<br /><em className="italic text-dark/70">floral story.</em>
              </h2>
              <p className="font-sans text-sm font-light text-text-mid leading-relaxed max-w-md">
                Every extraordinary event starts with a single conversation. We would love to learn about yours 
                and design something that exceeds what you imagined.
              </p>
            </div>
            <div>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="btn-dark"
              >
                Send an Inquiry
              </button>
            </div>
          </div>
        </section>
      </main>

      <DesignerModal 
        isOpen={isDesignerModalOpen} 
        onClose={() => setIsDesignerModalOpen(false)} 
      />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      <MothersDayPopup />
    </>
  )
}

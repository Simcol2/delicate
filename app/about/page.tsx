'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-cream pt-32 lg:pt-40 pb-20 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="section-label justify-center">Meet The Designer</p>
          <h1 className="section-title">Creating Tables That<br><em className="text-rose">Feel Like Home</em></br></h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <div 
            className={`relative aspect-[3/4] lg:aspect-auto lg:h-[700px] overflow-hidden transition-all duration-1000 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute inset-0 bg-ivory">
              <Image
                src="/images/WhatsApp Image 2026-03-05 at 11.32.29 AM.jpeg"
                alt="April Garrow - Event Designer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Gold frame accent */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/30 pointer-events-none"></div>
          </div>

          {/* Bio */}
          <div 
            className={`transition-all duration-1000 delay-400 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="font-serif text-rose text-lg italic mb-8">
              April is your local crafty mamma bear that would love an invite to your next event!
            </p>

            <div className="space-y-6 font-sans text-base font-light leading-relaxed text-text-mid">
              <p>
                I&apos;m an event stylist who believes a beautiful gathering is really about how people feel when they&apos;re sitting at the table.
              </p>
              
              <p>
                I&apos;m known for bold florals, layered place settings, and that golden-hour glow that makes everyone linger a little longer. I design tables that feel warm, welcoming, and thoughtfully put together.
              </p>
              
              <p>
                I have spent years perfecting the little details most people overlook. Napkins can be bunny ears and everything should sparkle. My tables feel abundant but effortless, and every guest will always feel like they were considered.
              </p>
            </div>

            <blockquote className="mt-10 pl-6 border-l-2 border-gold">
              <p className="font-serif text-lg text-dark italic">
                My philosophy is simple: when people feel cared for, they remember the evening long after the dishes are washed!
              </p>
            </blockquote>

            {/* Signature */}
            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-gold"></div>
              <span className="font-serif italic text-text-light">April Garrow</span>
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a href="/consultation" className="btn-primary text-center">
                <span>Book a Consultation</span>
              </a>
              <a href="/" className="btn-text justify-center">
                Back to Home
              </a>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Intentional Design',
              desc: 'Every element is chosen with purpose, from the angle of a bloom to the weight of a napkin fold.',
            },
            {
              title: 'Warmth First',
              desc: 'Beauty means nothing if guests dont feel at ease. We design for connection, not just aesthetics.',
            },
            {
              title: 'Desert Soul',
              desc: 'Palm Springs light and landscape inform everything we create. Bold, sculptural, sun-drenched.',
            },
          ].map((value, i) => (
            <div 
              key={i}
              className="p-8 border-t-2 border-gold/20 bg-ivory/50"
            >
              <span className="font-serif text-4xl text-gold/20">0{i + 1}</span>
              <h3 className="font-serif-sc text-lg tracking-[0.08em] text-dark mt-4 mb-3">
                {value.title}
              </h3>
              <p className="font-sans text-sm font-light text-text-mid leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

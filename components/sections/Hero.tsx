'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface HeroProps {
  onOpenDesigner: () => void
  onOpenContact: () => void
}

export default function Hero({ onOpenDesigner, onOpenContact }: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
      {/* Left Side - Content */}
      <div className="bg-ivory flex flex-col justify-end px-6 lg:px-20 pb-16 lg:pb-20 pt-32 lg:pt-40 relative z-10">
        {/* Geometric Pattern Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(194,150,90,0.04) 25%, transparent 25%),
              linear-gradient(225deg, rgba(194,150,90,0.04) 25%, transparent 25%),
              linear-gradient(315deg, rgba(194,150,90,0.04) 25%, transparent 25%),
              linear-gradient(45deg, rgba(194,150,90,0.04) 25%, transparent 25%)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gold Bar */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 hidden lg:block"
          style={{
            background: 'linear-gradient(to bottom, transparent, #C2965A, transparent)',
          }}
        />

        {/* Eyebrow */}
        <p 
          className={`font-sans text-[0.65rem] font-normal tracking-[0.4em] uppercase text-gold mb-8 flex items-center gap-4 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <span className="block w-10 h-[1px] bg-gold"></span>
          Est. in the Desert Sun
        </p>

        {/* Title */}
        <h1 
          className={`font-serif text-5xl sm:text-6xl lg:text-[clamp(3.2rem,5.5vw,5.5rem)] font-light leading-[1.05] text-dark tracking-[-0.01em] mb-8 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.5s' }}
        >
          You Host.
          <br />
          <em className="text-rose not-italic">We Style.</em>
        </h1>

        {/* Description */}
        <p 
          className={`font-serif text-lg lg:text-xl font-semibold text-dark leading-relaxed max-w-md mb-10 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.7s' }}
        >
          From intimate dinner parties under the palms to full in-home transformations, 
          every event is an opportunity to create something completely unforgettable.
          <br /><br />
          April Garrow brings a signature warmth and artistry to every table she touches, 
          because the most beautiful things deserve to be handled with care.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-6 items-start mb-12 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.9s' }}
        >
          <Link href="/services" className="btn-primary">
            <span>Explore Services</span>
          </Link>
          <button onClick={onOpenContact} className="btn-text">
            Book a Consultation
          </button>
        </div>

        {/* Meet Designer Button */}
        <button
          onClick={onOpenDesigner}
          className={`group inline-flex items-center gap-3 px-6 py-4 bg-gold text-cream hover:bg-dark transition-all duration-400 shadow-lg w-fit transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '1.1s' }}
        >
          <span className="font-sans text-sm tracking-[0.2em] uppercase font-medium">
            Meet the Designer
          </span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll Hint */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1.6s' }}
        >
          <div 
            className="w-[1px] h-12"
            style={{
              background: 'linear-gradient(to bottom, #C2965A, transparent)',
              animation: 'scrollDrop 2s ease infinite',
            }}
          />
          <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-text-light">
            Scroll
          </span>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="relative overflow-hidden min-h-[400px] lg:min-h-screen bg-gradient-to-br from-blue-light via-blush to-sage-light">
        {/* Sun Orb */}
        <div 
          className="absolute top-[12%] right-[15%] w-28 h-28 lg:w-32 lg:h-32 rounded-full animate-pulse-orb"
          style={{
            background: 'radial-gradient(circle, rgba(223,192,138,0.6) 0%, rgba(194,150,90,0.1) 60%, transparent 100%)',
          }}
        />

        {/* SVG Illustration */}
        <svg 
          viewBox="0 0 500 600" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B8D4E8" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#E8C0B0" stopOpacity="0.2"/>
            </linearGradient>
            <linearGradient id="houseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2EDE4"/>
              <stop offset="100%" stopColor="#E8DDD0"/>
            </linearGradient>
            <linearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A1F1A" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#2A1F1A" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C2965A"/>
              <stop offset="100%" stopColor="#DFC08A"/>
            </linearGradient>
            <linearGradient id="leafGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9BAD98"/>
              <stop offset="100%" stopColor="#7A9477"/>
            </linearGradient>
            <linearGradient id="petalGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E8C0B0"/>
              <stop offset="100%" stopColor="#C9897A"/>
            </linearGradient>
          </defs>

          {/* Ground */}
          <rect x="0" y="480" width="500" height="120" fill="#E8DDD0" rx="0"/>

          {/* Mid-century house - Carport */}
          <rect x="30" y="290" width="140" height="8" fill="url(#goldGrad)" rx="0"/>
          <rect x="30" y="298" width="140" height="120" fill="url(#houseGrad)"/>
          <rect x="35" y="305" width="125" height="50" fill="rgba(168,189,208,0.35)" rx="0"/>
          <rect x="82" y="298" width="4" height="182" fill="rgba(194,150,90,0.5)"/>
          <rect x="155" y="298" width="4" height="182" fill="rgba(194,150,90,0.5)"/>

          {/* Main house */}
          <rect x="170" y="260" width="270" height="220" fill="url(#houseGrad)"/>
          <rect x="165" y="255" width="280" height="8" fill="url(#goldGrad)" rx="0"/>

          {/* Glass wall */}
          <rect x="180" y="270" width="180" height="140" fill="rgba(168,189,208,0.4)" rx="0"/>
          <line x1="270" y1="270" x2="270" y2="410" stroke="rgba(194,150,90,0.5)" strokeWidth="1.5"/>
          <line x1="225" y1="270" x2="225" y2="410" stroke="rgba(194,150,90,0.3)" strokeWidth="1"/>
          <line x1="315" y1="270" x2="315" y2="410" stroke="rgba(194,150,90,0.3)" strokeWidth="1"/>
          <line x1="180" y1="335" x2="360" y2="335" stroke="rgba(194,150,90,0.3)" strokeWidth="1"/>

          {/* Door */}
          <rect x="380" y="340" width="48" height="120" fill="rgba(168,189,208,0.5)"/>
          <path d="M380 340 Q404 315 428 340" fill="rgba(168,189,208,0.5)" stroke="rgba(194,150,90,0.4)" strokeWidth="1"/>
          <line x1="390" y1="400" x2="390" y2="415" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>

          {/* Roof shadow */}
          <rect x="165" y="263" width="280" height="30" fill="url(#shadowGrad)"/>

          {/* Ground level */}
          <rect x="0" y="478" width="500" height="6" fill="rgba(194,150,90,0.2)"/>

          {/* Palm Tree Left */}
          <g transform="translate(60, 100)">
            <path d="M0 380 C-2 300 2 220 0 140" stroke="#8B6B4A" strokeWidth="6" strokeLinecap="round" fill="none"/>
            <path d="M0 140 C-40 80 -90 60 -110 30" stroke="url(#leafGrad1)" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <path d="M0 140 C-30 110 -20 70 -10 40" stroke="#9BAD98" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path d="M0 140 C20 110 40 80 50 50" stroke="#9BAD98" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path d="M0 140 C40 100 80 90 110 70" stroke="url(#leafGrad1)" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <path d="M0 140 C-10 105 10 70 20 30" stroke="#8BA888" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M0 140 C-50 120 -70 140 -100 130" stroke="#9BAD98" strokeWidth="3" strokeLinecap="round" fill="none"/>
          </g>

          {/* Palm Tree Right */}
          <g transform="translate(445, 50)">
            <path d="M0 430 C-2 350 2 260 0 160" stroke="#8B6B4A" strokeWidth="5" strokeLinecap="round" fill="none"/>
            <path d="M0 160 C-50 90 -100 70 -120 35" stroke="url(#leafGrad1)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path d="M0 160 C-20 130 -10 90 -5 55" stroke="#9BAD98" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M0 160 C25 120 50 95 65 60" stroke="#9BAD98" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M0 160 C50 115 90 105 110 85" stroke="url(#leafGrad1)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          </g>

          {/* Floral Arrangement */}
          <g transform="translate(240, 460)">
            <path d="M0 20 C0 0 -15 -40 -25 -80" stroke="#9BAD98" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M0 20 C0 0 5 -30 10 -70" stroke="#8BA888" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M0 20 C5 5 25 -20 35 -55" stroke="#9BAD98" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M0 20 C-5 0 -30 -25 -45 -50" stroke="#9BAD98" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M0 20 C8 5 50 -10 65 -35" stroke="#8BA888" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <circle cx="-25" cy="-85" r="22" fill="url(#petalGrad1)" opacity="0.9"/>
            <circle cx="-25" cy="-85" r="14" fill="#D4A59A"/>
            <circle cx="-25" cy="-85" r="7" fill="#C9897A"/>
            <circle cx="35" cy="-60" r="16" fill="#C9D8C5" opacity="0.9"/>
            <circle cx="35" cy="-60" r="9" fill="#9BAD98"/>
            <circle cx="10" cy="-74" r="10" fill="#DFC08A" opacity="0.9"/>
            <circle cx="10" cy="-74" r="5" fill="#C2965A"/>
            <circle cx="-65" cy="-43" r="12" fill="url(#petalGrad1)" opacity="0.85"/>
            <circle cx="-65" cy="-43" r="6" fill="#C9897A"/>
          </g>

          {/* Gold decorative element */}
          <g transform="translate(420, 200)" opacity="0.4">
            <polygon points="0,-25 22,12 -22,12" fill="none" stroke="url(#goldGrad)" strokeWidth="1"/>
            <polygon points="0,-15 13,7 -13,7" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5"/>
          </g>
        </svg>

        {/* Overlay Text */}
        <div 
          className="absolute bottom-6 right-6 font-serif text-sm italic text-dark/50 tracking-[0.06em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          Palm Springs · California · Floral Atelier
        </div>
      </div>
    </section>
  )
}

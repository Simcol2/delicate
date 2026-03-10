'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import FullscreenMenu from './FullscreenMenu'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-10 left-0 right-0 z-[70] transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--plum-deep)]/95 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo - White on scroll (desktop), Dark on scroll (mobile) */}
          <a 
            href="#" 
            className={`text-2xl lg:text-3xl tracking-wide transition-colors duration-300 ${
              isScrolled 
                ? 'text-white lg:text-white' 
                : 'text-[var(--plum-deep)]'
            }`}
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            Delicate Flowers
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <a 
              href="#about" 
              className={`text-sm font-sans hover:text-[var(--gold-antique)] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[var(--plum-deep)]'
              }`}
            >
              About
            </a>
            <a 
              href="/services" 
              className={`text-sm font-sans hover:text-[var(--gold-antique)] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[var(--plum-deep)]'
              }`}
            >
              Services
            </a>
            <a 
              href="#gallery" 
              className={`text-sm font-sans hover:text-[var(--gold-antique)] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[var(--plum-deep)]'
              }`}
            >
              Gallery
            </a>
            <a 
              href="/faq" 
              className={`text-sm font-sans hover:text-[var(--gold-antique)] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[var(--plum-deep)]'
              }`}
            >
              FAQ
            </a>
            {/* Book Now - White text and border on scroll */}
            <a 
              href="#contact" 
              className={`px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 ${
                isScrolled 
                  ? 'border border-white text-white hover:bg-white hover:text-[var(--plum-deep)]'
                  : 'border-2 border-[var(--plum-deep)] text-[var(--plum-deep)] hover:bg-[var(--plum-deep)] hover:text-[var(--gold-antique)]'
              }`}
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button - Dark on scroll */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-[var(--plum-deep)]' : 'text-[var(--plum-deep)]'
            }`}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

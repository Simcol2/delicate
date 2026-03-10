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
        className={`fixed top-10 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#de6050]/95 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo - White on scroll (desktop), Dark on scroll (mobile) */}
          <a 
            href="/" 
            className={`text-2xl lg:text-3xl tracking-wide transition-colors duration-300 ${
              isScrolled 
                ? 'text-white lg:text-white' 
                : 'text-[#2c2420]'
            }`}
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            Delicate Flowers
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12 relative z-10">
            <a 
              href="/about" 
              className={`text-sm font-sans hover:text-[#de6050] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              About
            </a>
            <a 
              href="/services" 
              className={`text-sm font-sans hover:text-[#de6050] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              Services
            </a>
            <a 
              href="#gallery" 
              className={`text-sm font-sans hover:text-[#de6050] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              Gallery
            </a>
            <a 
              href="/faq" 
              className={`text-sm font-sans hover:text-[#de6050] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              FAQ
            </a>
            <a 
              href="/client/login" 
              className={`text-sm font-sans hover:text-[#de6050] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              Client Portal
            </a>
          </div>

          {/* Mobile Menu Button - Dark on scroll */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-[#2c2420]' : 'text-[#2c2420]'
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

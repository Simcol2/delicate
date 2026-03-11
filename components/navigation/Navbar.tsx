'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import Image from 'next/image'
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
        className={`fixed top-8 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF6F0]/75 backdrop-blur-sm py-2'
            : 'bg-[#FAF6F0]/20 backdrop-blur-sm py-3'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between relative">
          {/* Logo Image */}
          <a 
            href="/" 
            className="relative h-16 w-60 lg:h-20 lg:w-80 transition-all duration-300 z-10"
          >
            <img
              src="/images/df-logo.png"
              alt="Delicate Flowers"
              className="h-full w-auto object-contain object-left"
            />
          </a>

          {/* Mobile Brand Name - Centered */}
          <span className="lg:hidden absolute left-1/2 -translate-x-1/2 font-serif text-lg text-[#1A2744] tracking-wide whitespace-nowrap">
            Delicate by design.
          </span>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12 relative z-10">
            <a 
              href="/" 
              className={`text-sm font-sans hover:text-[#CC2A7A] transition-colors tracking-widest uppercase font-bold text-[#1A2744]`}
            >
              Home
            </a>
            <a 
              href="/about" 
              className={`text-sm font-sans hover:text-[#CC2A7A] transition-colors tracking-widest uppercase font-bold text-[#1A2744]`}
            >
              About
            </a>
            <a 
              href="/services" 
              className={`text-sm font-sans hover:text-[#CC2A7A] transition-colors tracking-widest uppercase font-bold text-[#1A2744]`}
            >
              Services
            </a>
            <a 
              href="/experiences" 
              className={`text-sm font-sans hover:text-[#CC2A7A] transition-colors tracking-widest uppercase font-bold text-[#1A2744]`}
            >
              Portfolio
            </a>
            <a 
              href="/faq" 
              className={`text-sm font-sans hover:text-[#CC2A7A] transition-colors tracking-widest uppercase font-bold text-[#1A2744]`}
            >
              FAQ
            </a>
            <a 
              href="/client/login" 
              className={`text-sm font-sans hover:text-[#CC2A7A] transition-colors tracking-widest uppercase font-bold text-[#1A2744]`}
            >
              Client Portal
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`lg:hidden p-2 transition-colors duration-300 text-[#1A2744]`}
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

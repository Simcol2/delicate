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
            ? 'bg-[#c9594a]/95 backdrop-blur-md py-2'
            : 'bg-transparent py-3'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo Image */}
          <a 
            href="/" 
            className="relative h-16 w-60 lg:h-20 lg:w-80 transition-all duration-300"
          >
            <img
              src="/images/df-logo.png"
              alt="Delicate Flowers"
              className="h-full w-auto object-contain object-left"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12 relative z-10">
            <a 
              href="/" 
              className={`text-sm font-sans hover:text-[#8f0e04] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              Home
            </a>
            <a 
              href="/about" 
              className={`text-sm font-sans hover:text-[#8f0e04] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              About
            </a>
            <a 
              href="/services" 
              className={`text-sm font-sans hover:text-[#8f0e04] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              Services
            </a>
            <a 
              href="/experiences" 
              className={`text-sm font-sans hover:text-[#8f0e04] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              Portfolio
            </a>
            <a 
              href="/faq" 
              className={`text-sm font-sans hover:text-[#8f0e04] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              FAQ
            </a>
            <a 
              href="/client/login" 
              className={`text-sm font-sans hover:text-[#8f0e04] transition-colors tracking-widest uppercase ${
                isScrolled ? 'text-white' : 'text-[#2c2420]'
              }`}
            >
              Client Portal
            </a>
          </div>

          {/* Mobile Menu Button */}
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

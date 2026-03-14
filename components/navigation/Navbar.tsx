'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Story' },
    { href: '/services', label: 'Services' },
    { href: '/experiences', label: 'Gallery' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 lg:px-12 py-4 transition-all duration-400 bg-cream border-b border-midnight/10"
      >
        {/* Logo Image */}
        <Link href="/" className="no-underline">
          <img 
            src="/images/Delicate Flower-12 (4).png?v=3" 
            alt="Delicate Flowers" 
            className="h-20 lg:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-sans text-[0.7rem] font-normal tracking-[0.22em] uppercase text-midnight no-underline transition-colors duration-300 relative hover:text-[#FF6F61] group`}
              >
                {link.label}
                <span 
                  className={`absolute -bottom-1 left-0 h-[1px] bg-midnight transition-all duration-350 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/client/login"
              className="inline-block px-5 py-2.5 border border-midnight text-midnight font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase no-underline transition-all duration-350 hover:bg-midnight hover:text-cream whitespace-nowrap"
            >
              Client Portal
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
          aria-label="Menu"
        >
          <span className="block w-6 h-[1px] bg-midnight transition-all"></span>
          <span className="block w-6 h-[1px] bg-midnight transition-all"></span>
          <span className="block w-6 h-[1px] bg-midnight transition-all"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[200] bg-cream flex flex-col items-center justify-center gap-10 transition-opacity duration-400 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 z-[201] w-14 h-14 flex items-center justify-center bg-coral text-cream rounded-full text-3xl font-bold cursor-pointer shadow-xl hover:bg-midnight transition-colors border-4 border-cream"
          aria-label="Close menu"
        >
          ✕
        </button>
        
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-4xl font-bold text-midnight no-underline tracking-[0.02em] transition-colors duration-300 hover:text-[#2DA9C2]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/client/login"
          onClick={() => setMobileMenuOpen(false)}
          className="font-display text-4xl font-bold text-midnight no-underline tracking-[0.02em] transition-colors duration-300 hover:text-[#2DA9C2]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Client Portal
        </Link>
      </div>
    </>
  )
}

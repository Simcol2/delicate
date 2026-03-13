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
    { href: '/about', label: 'Story' },
    { href: '/services', label: 'Services' },
    { href: '/experiences', label: 'Gallery' },
    { href: '/faq', label: 'FAQ' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 lg:px-12 transition-all duration-400"
        style={{
          padding: scrolled ? '1rem 3rem' : '1.5rem 3rem',
          background: 'rgba(250, 246, 239, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled 
            ? '1px solid rgba(194, 150, 90, 0.25)' 
            : '1px solid rgba(194, 150, 90, 0.18)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col no-underline">
          <span 
            className="font-serif-sc text-xl lg:text-[1.4rem] font-normal text-dark tracking-[0.15em] leading-none"
          >
            Delicate Flowers
          </span>
          <span 
            className="font-sans text-[0.6rem] font-light text-gold tracking-[0.35em] uppercase mt-[3px]"
          >
            Palm Springs, CA
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-sans text-[0.7rem] font-normal tracking-[0.22em] uppercase text-text-mid no-underline transition-colors duration-300 relative hover:text-gold group`}
              >
                {link.label}
                <span 
                  className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-350 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/client/login"
              className="px-6 py-3 border border-gold text-gold font-sans text-[0.65rem] tracking-[0.25em] uppercase no-underline transition-all duration-350 hover:bg-gold hover:text-cream"
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
          <span className="block w-6 h-[1px] bg-gold transition-all"></span>
          <span className="block w-6 h-[1px] bg-gold transition-all"></span>
          <span className="block w-6 h-[1px] bg-gold transition-all"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[99] bg-cream flex flex-col items-center justify-center gap-10 transition-opacity duration-400 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-7 right-8 bg-transparent border-none text-gold text-3xl font-extralight cursor-pointer"
        >
          ✕
        </button>
        
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-4xl font-light text-text no-underline tracking-[0.06em] transition-colors duration-300 hover:text-gold"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/client/login"
          onClick={() => setMobileMenuOpen(false)}
          className="font-serif text-4xl font-light text-text no-underline tracking-[0.06em] transition-colors duration-300 hover:text-gold"
        >
          Client Portal
        </Link>
      </div>
    </>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Story' },
    { href: '/services', label: 'Services' },
    { href: '/experiences', label: 'Gallery' },
    { href: '/floral', label: 'Floral' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* MOBILE NAV
          Transparent on purpose so the hero background flows through it.
          The existing horizontal logo is clipped to show only the circular mark;
          the teal wordmark is rendered as text to match the mockup.
      */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-[100] h-[112px] flex items-center justify-between px-7 bg-transparent border-0">
        <Link
          href="/"
          className="no-underline flex items-center gap-4 min-w-0"
        >
          {/* Crop only the round mark from the existing horizontal logo */}
          <div className="w-[62px] h-[62px] overflow-hidden flex-shrink-0">
            <img
              src="/images/Delicate Flower-12 (4).png?v=3"
              alt=""
              aria-hidden="true"
              className="h-[62px] w-auto max-w-none object-contain object-left"
            />
          </div>

          <span
            className="text-[#1F4D4F] text-[1.45rem] sm:text-[1.7rem] tracking-[0.07em] whitespace-nowrap"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
            }}
          >
            DELICATE FLOWERS
          </span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-11 h-11 flex flex-col items-center justify-center gap-[7px] bg-transparent border-none cursor-pointer flex-shrink-0"
          aria-label="Open menu"
        >
          <span className="block w-8 h-[2px] bg-[#1F4D4F]" />
          <span className="block w-8 h-[2px] bg-[#1F4D4F]" />
          <span className="block w-8 h-[2px] bg-[#1F4D4F]" />
        </button>
      </nav>

      {/* DESKTOP NAV - unchanged */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-[100] items-center justify-between px-12 py-2.5 bg-cream border-b border-midnight/10">
        <Link href="/" className="no-underline">
          <img
            src="/images/Delicate Flower-12 (4).png?v=3"
            alt="Delicate Flowers"
            className="h-11 w-auto object-contain"
          />
        </Link>

        <ul className="flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-[0.7rem] font-normal tracking-[0.22em] uppercase text-midnight no-underline transition-colors duration-300 relative hover:text-[#FF6F61] group"
              >
                {link.label}

                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-midnight transition-all duration-350 ${
                    isActive(link.href)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
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
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden fixed inset-0 z-[200] bg-[#F8F3E9] flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage: 'url(/images/palm-shadow.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '80%',
            backgroundPosition: 'top right',
          }}
        />

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-7 right-6 z-[201] w-12 h-12 flex items-center justify-center bg-transparent text-[#1F4D4F] text-4xl font-light border-none cursor-pointer"
          aria-label="Close menu"
        >
          ×
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="relative z-10 text-[2.65rem] font-bold text-[#1F4D4F] no-underline leading-none hover:text-[#FF6F61] transition-colors"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/client/login"
          onClick={() => setMobileMenuOpen(false)}
          className="relative z-10 mt-3 px-7 py-4 bg-[#1F4D4F] text-[#F8F3E9] font-sans text-[0.68rem] font-bold tracking-[0.24em] uppercase no-underline"
        >
          Client Portal
        </Link>
      </div>
    </>
  )
}

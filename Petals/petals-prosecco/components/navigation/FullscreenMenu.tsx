'use client'

import { X } from 'lucide-react'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[var(--plum-deep)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 lg:px-12 py-6">
          <span 
              className="text-2xl text-[var(--gold-antique)] tracking-wide"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              Delicate Flowers
            </span>
          <button
            onClick={onClose}
            className="text-[var(--gold-antique)] p-2"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12">
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleLinkClick}
              className="group flex items-center gap-6 py-4 border-b border-[var(--gold-antique)]/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-[var(--gold-antique)]/40 font-sans text-sm">
                0{index + 1}
              </span>
              <span className="font-serif text-4xl lg:text-6xl text-[var(--blush-warm)] group-hover:text-[var(--gold-antique)] transition-colors duration-300">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer Info */}
        <div className="px-6 lg:px-12 py-8 grid grid-cols-2 gap-8 border-t border-[var(--gold-antique)]/20">
          <div>
            <p className="text-[var(--gold-antique)]/60 text-xs uppercase tracking-widest mb-2">Location</p>
            <p className="text-[var(--blush-warm)] font-sans text-sm">Palm Springs, California</p>
          </div>
          <div>
            <p className="text-[var(--gold-antique)]/60 text-xs uppercase tracking-widest mb-2">Contact</p>
            <p className="text-[var(--blush-warm)] font-sans text-sm">hello@petalsandprosecco.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

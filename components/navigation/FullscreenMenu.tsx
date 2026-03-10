'use client'

import { X } from 'lucide-react'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const menuItems = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/experiences' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Client Portal', href: '/client/login' },
  ]

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#8f0e04] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      } ${!isOpen ? 'pointer-events-none' : ''}`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 lg:px-12 py-6">
          <span 
              className="text-2xl text-[#faf6f0] tracking-wide"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              Delicate Flowers
            </span>
          <button
            onClick={onClose}
            className="text-[#faf6f0] p-2"
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
              className="group flex items-center gap-6 py-4 border-b border-[#c9a96e]/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-[#faf6f0]/40 font-sans text-sm">
                0{index + 1}
              </span>
              <span className="font-serif text-4xl lg:text-6xl text-[#faf6f0] group-hover:text-[#faf6f0] transition-colors duration-300">
                {item.label}
              </span>
            </a>
          ))}
        </div>


      </div>
    </div>
  )
}

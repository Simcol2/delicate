'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface DesignerModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DesignerModal({ isOpen, onClose }: DesignerModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
      
      // Animate in
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      )
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen])

  // Handle wheel events to prevent body scroll
  useEffect(() => {
    const modal = modalRef.current
    if (!modal || !isOpen) return

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement
      const scrollableContent = contentRef.current
      
      if (!scrollableContent) return
      
      const isAtTop = scrollableContent.scrollTop === 0
      const isAtBottom = scrollableContent.scrollTop + scrollableContent.clientHeight >= scrollableContent.scrollHeight - 1
      
      // If scrolling up and at top, or scrolling down and at bottom, prevent default
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault()
      }
    }

    modal.addEventListener('wheel', handleWheel, { passive: false })
    return () => modal.removeEventListener('wheel', handleWheel)
  }, [isOpen])

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.2,
      ease: 'power2.in'
    })
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose
    })
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm opacity-0 overscroll-contain"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] bg-[#faf8f3] md:rounded-lg shadow-2xl overflow-hidden opacity-0 flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-2 bg-white/80 rounded-full text-[var(--plum-deep)]/60 hover:text-[var(--plum-deep)] hover:bg-white transition-all duration-200 shadow-sm"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="flex flex-col md:flex-row">
            {/* Photo Side - Full width on mobile */}
            <div className="w-full md:w-2/5 relative h-64 sm:h-72 md:h-auto md:min-h-[500px] shrink-0">
              <Image
                src="/images/WhatsApp Image 2026-03-05 at 11.32.29 AM.jpeg"
                alt="Event Designer"
                fill
                className="object-cover object-top md:object-[25%_center]"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Bio Side */}
            <div className="w-full md:w-3/5 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col">
              <span className="text-[var(--gold-antique)] text-xs tracking-[0.3em] uppercase font-sans font-medium mb-2">
                Meet The Designer
              </span>
              
              <h2 
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--plum-deep)] mb-2"
              >
                Creating Tables That
                <span 
                  className="block text-[var(--plum-deep)] mt-1"
                  style={{ fontFamily: 'var(--font-script), cursive' }}
                >
                  Feel Like Home
                </span>
              </h2>

              {/* Tagline */}
              <p className="text-[#c97b6e] font-sans text-sm sm:text-base italic mb-4">
                April is your local crafty mamma bear that would love an invite to your next event!
              </p>

              <div className="space-y-3 text-[var(--navy-midnight)]/80 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  I&apos;m an event stylist who believes a beautiful gathering is really about how people feel when they&apos;re sitting at the table.
                </p>
                
                <p>
                  I&apos;m known for bold florals, layered place settings, and that golden-hour glow that makes everyone linger a little longer. I design tables that feel warm, welcoming, and thoughtfully put together.
                </p>
                
                <p>
                  I have spent years perfecting the little details most people overlook. Napkins can be bunny ears and everything should sparkle. My tables feel abundant but effortless, and every guest will always feel like they were considered.
                </p>

                <p className="text-[var(--plum-deep)] font-medium italic border-l-2 border-[var(--gold-antique)] pl-4 mt-4">
                  My philosophy is simple: when people feel cared for, they remember the evening long after the dishes are washed!
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-6 pt-5 border-t border-[var(--gold-antique)]/20">
                <a
                  href="#contact"
                  onClick={handleClose}
                  className="inline-block w-full sm:w-auto text-center px-6 py-3 bg-[var(--plum-deep)] text-[var(--gold-antique)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-royal)] transition-colors duration-300"
                >
                  Schedule a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

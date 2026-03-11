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

  // Lock body scroll and animate in
  useEffect(() => {
    if (!isOpen) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalPaddingRight = document.body.style.paddingRight
    const originalOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    
    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 })

    return () => {
      document.body.style.paddingRight = originalPaddingRight
      document.body.style.overflow = originalOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
    }
  }, [isOpen])

  // Handle scroll locking
  useEffect(() => {
    if (!isOpen) return

    const scrollContainer = contentRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
      
      const isAtTop = scrollContainer.scrollTop <= 0
      const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 2
      
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault()
      }
    }

    let startY = 0
    let startScrollTop = 0

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
      startScrollTop = scrollContainer.scrollTop
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation()
      
      const y = e.touches[0].clientY
      const deltaY = startY - y
      const newScrollTop = startScrollTop + deltaY
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight
      
      if (newScrollTop < 0 || newScrollTop > maxScroll) {
        e.preventDefault()
      }
    }

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true })
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true })

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel, { capture: true })
      scrollContainer.removeEventListener('touchstart', handleTouchStart)
      scrollContainer.removeEventListener('touchmove', handleTouchMove, { capture: true })
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(modalRef.current, { opacity: 0, scale: 0.95, y: 20, duration: 0.2, ease: 'power2.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: onClose })
  }

  if (!isOpen) return null

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm opacity-0" onClick={(e) => e.target === overlayRef.current && handleClose()}>
      <div ref={modalRef} className="relative w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] bg-[#faf6f0] md:rounded-lg shadow-2xl overflow-hidden opacity-0 flex flex-col">
        <style jsx>{`
          .modal-scroll {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            scrollbar-width: thin;
            scrollbar-color: #C9A96E #FAF6F0;
          }
          .modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .modal-scroll::-webkit-scrollbar-track {
            background: #FAF6F0;
          }
          .modal-scroll::-webkit-scrollbar-thumb {
            background: #C9A96E;
            border-radius: 4px;
          }
        `}</style>

        <button onClick={handleClose} className="absolute top-3 right-3 z-20 p-2 bg-white/90 rounded-full text-[#1A2744]/60 hover:text-[#CC2A7A] shadow-sm">
          <X size={24} />
        </button>

        <div ref={contentRef} className="flex-1 modal-scroll">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 relative h-64 sm:h-72 md:h-auto md:min-h-[500px] shrink-0">
              <Image src="/images/WhatsApp Image 2026-03-05 at 11.32.29 AM.jpeg" alt="Event Designer" fill 
                className="object-cover object-top md:object-[25%_center]" sizes="(max-width: 768px) 100vw, 40vw" priority />
            </div>

            <div className="w-full md:w-3/5 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col">
              <span className="text-[#CC2A7A] text-xs tracking-[0.3em] uppercase font-medium mb-2">Meet The Designer</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A2744] mb-4">
                Creating Tables That
                <span className="block text-[#CC2A7A] mt-1" style={{ fontFamily: 'var(--font-script), cursive' }}>Feel Like Home</span>
              </h2>
              <p className="text-[#CC2A7A] text-sm sm:text-base italic mb-4">April is your local crafty mamma bear that would love an invite to your next event!</p>

              <div className="space-y-3 text-[#1A2744] text-base sm:text-lg leading-relaxed">
                <p>I'm an event stylist who believes a beautiful gathering is really about making people feel special when they're sitting at the table.</p>
                <p>I'm known for bold florals, layered place settings, and that golden-hour glow that makes everyone linger a little longer.</p>
                <p>I have spent years perfecting the little details most people overlook. Napkins can be bunny ears and everything should sparkle.</p>
                <p className="text-[#2c2420] font-medium italic border-l-2 border-[#C9A96E] pl-4 mt-4">
                  <span className="text-lg sm:text-xl">My philosophy is simple: when people feel cared for, they remember the evening long after the dishes are washed!</span>
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#C9A96E]">
                <a 
                  href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8" 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose} 
                  className="inline-block w-full sm:w-auto text-center px-6 py-3 bg-[#CC2A7A] text-white text-sm tracking-widest uppercase hover:bg-[#1A2744]"
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

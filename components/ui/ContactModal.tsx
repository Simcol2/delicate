'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'
import { gsap } from 'gsap'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    venueName: '',
    venueLocation: '',
    guestSize: '',
    message: '',
    termsAccepted: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Lock body scroll when modal opens
  useEffect(() => {
    if (!isOpen) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalPaddingRight = document.body.style.paddingRight
    const originalOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    
    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(contentRef.current, { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: 0.1 })

    return () => {
      document.body.style.paddingRight = originalPaddingRight
      document.body.style.overflow = originalOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
    }
  }, [isOpen])

  // Handle scroll locking with proper trackpad support
  useEffect(() => {
    if (!isOpen) return

    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    // This is the key function - it stops ALL wheel events from propagating
    const handleWheel = (e: WheelEvent) => {
      // Always stop the event from reaching the body
      e.stopPropagation()
      
      const isAtTop = scrollContainer.scrollTop <= 0
      const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 2
      
      // Only prevent default if at bounds (scroll chaining)
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault()
      }
    }

    // Handle touch events for mobile/trackpad
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
      
      // Prevent pull-down/pull-up refresh
      if (newScrollTop < 0 || newScrollTop > maxScroll) {
        e.preventDefault()
      }
    }

    // Add listeners to the scroll container with capture phase
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true })
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true })

    // Also add wheel listener to modal content to catch any missed events
    const content = contentRef.current
    if (content) {
      content.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    }

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel, { capture: true })
      scrollContainer.removeEventListener('touchstart', handleTouchStart)
      scrollContainer.removeEventListener('touchmove', handleTouchMove, { capture: true })
      if (content) {
        content.removeEventListener('wheel', handleWheel, { capture: true })
      }
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    gsap.to(contentRef.current, { opacity: 0, scale: 0.95, y: 20, duration: 0.2 })
    gsap.to(modalRef.current, { opacity: 0, duration: 0.2, onComplete: onClose })
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.termsAccepted) {
      setSubmitStatus('error')
      setStatusMessage('Please accept the Terms of Service to continue.')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage("Thank you! Your inquiry has been sent. We'll be in touch soon.")
        setFormData({ name: '', email: '', eventType: '', date: '', venueName: '', venueLocation: '', guestSize: '', message: '', termsAccepted: false })
        setTimeout(() => { handleClose(); setSubmitStatus('idle') }, 2000)
      } else {
        setSubmitStatus('error')
        setStatusMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm opacity-0"
      onClick={(e) => e.target === modalRef.current && handleClose()}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#8f0e04] opacity-0 flex flex-col"
      >
        <style jsx>{`
          .modal-scroll {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            scrollbar-width: thin;
            scrollbar-color: #faf6f0 rgba(255,255,255,0.1);
          }
          .modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .modal-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          .modal-scroll::-webkit-scrollbar-thumb {
            background: #faf6f0;
            border-radius: 4px;
          }
        `}</style>

        <button onClick={handleClose} className="absolute top-4 right-4 z-20 p-2 text-white/60 hover:text-white">
          <X size={24} />
        </button>

        <div className="p-6 border-b border-white/10 shrink-0">
          <span className="text-[#faf6f0] text-xs tracking-[0.3em] uppercase block mb-2">Get in Touch</span>
          <h2 className="font-serif text-2xl md:text-3xl text-white">Book a Consultation</h2>
        </div>

        <div 
          ref={scrollContainerRef}
          className="modal-scroll flex-1 p-6"
          style={{ maxHeight: 'calc(90vh - 100px)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Your Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white placeholder:text-white/40 text-sm focus:border-[#faf6f0] focus:outline-none" placeholder="Jane Doe" required />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white placeholder:text-white/40 text-sm focus:border-[#faf6f0] focus:outline-none" placeholder="jane@email.com" required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Event Type</label>
                <select value={formData.eventType} onChange={(e) => setFormData({...formData, eventType: e.target.value})} 
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white text-sm focus:border-[#faf6f0] focus:outline-none" required>
                  <option value="" className="bg-[#8f0e04]">Select an option</option>
                  <option value="dinner" className="bg-[#8f0e04]">Intimate Dinner</option>
                  <option value="brunch" className="bg-[#8f0e04]">Brunch Gathering</option>
                  <option value="celebration" className="bg-[#8f0e04]">Special Celebration</option>
                  <option value="corporate" className="bg-[#8f0e04]">Corporate Event</option>
                  <option value="other" className="bg-[#8f0e04]">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Event Date</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} 
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white text-sm [color-scheme:dark]" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Venue Name</label>
                <input type="text" value={formData.venueName} onChange={(e) => setFormData({...formData, venueName: e.target.value})} 
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white placeholder:text-white/40 text-sm focus:border-[#faf6f0] focus:outline-none" placeholder="Enter venue name" />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Venue Location</label>
                <input type="text" value={formData.venueLocation} onChange={(e) => setFormData({...formData, venueLocation: e.target.value})} 
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white placeholder:text-white/40 text-sm focus:border-[#faf6f0] focus:outline-none" placeholder="Enter venue location" />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Guest Size</label>
              <input type="text" value={formData.guestSize} onChange={(e) => setFormData({...formData, guestSize: e.target.value})} 
                className="w-full bg-transparent border-b border-white/30 py-2.5 text-white placeholder:text-white/40 text-sm focus:border-[#faf6f0] focus:outline-none" placeholder="Number of guests" />
            </div>

            <div>
              <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">Tell Us About Your Vision</label>
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={3}
                className="w-full bg-transparent border-b border-white/30 py-2.5 text-white resize-none placeholder:text-white/40 text-sm focus:border-[#faf6f0] focus:outline-none" placeholder="Share your ideas, guest count, preferred style..." required />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" id="terms" checked={formData.termsAccepted} 
                onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})} className="mt-1 w-4 h-4 accent-[#faf6f0]" />
              <label htmlFor="terms" className="text-white/80 text-sm">
                I have read and agree to the <a href="/terms" target="_blank" className="text-[#faf6f0] underline hover:text-white">Terms of Service</a>
              </label>
            </div>

            {submitStatus !== 'idle' && (
              <div className={`flex items-center gap-2 p-3 ${submitStatus === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {submitStatus === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span className="text-sm">{statusMessage}</span>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} 
              className="w-full px-8 py-3 bg-[#faf6f0] text-[#8f0e04] text-sm tracking-widest uppercase hover:bg-white disabled:opacity-50">
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

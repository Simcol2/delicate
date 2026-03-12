'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'
import { gsap } from 'gsap'
import emailjs from '@emailjs/browser'

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
    phoneNumber: '',
    eventType: '',
    date: '',
    location: '',
    guestSize: '',
    message: '',
    referredBy: '',
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
      // EmailJS configuration
      const SERVICE_ID = 'service_ajiko7e'
      const TEMPLATE_ID = 'template_pl9ghk7'
      const PUBLIC_KEY = 'JibkW5e7TBEs2vKc0'
      const OWNER_EMAIL = 'april@delicateflowers.co'

      // Template variables must match EmailJS template
      const templateParams = {
        first_name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber || 'Not specified',
        eventType: formData.eventType || 'Not specified',
        event_date: formData.date || 'Not specified',
        event_location: formData.location || 'Not specified',
        guest_count: formData.guestSize || 'Not specified',
        message: formData.message,
        referredBy: formData.referredBy || 'Not specified',
        reply_to: formData.email,
        to_email: OWNER_EMAIL,  // Send to you
      }

      // Send email via EmailJS
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      // Also save to Google Sheet
      const SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/1Y7wvAyu5OWX--eEOAbw-QgsL1wKfrgnMYP5ozGQpzm-mHsBCfrJUQk3F/exec'
      
      fetch(SHEET_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber || '',
          eventType: formData.eventType || '',
          eventDate: formData.date || '',
          location: formData.location || '',
          guestSize: formData.guestSize || '',
          message: formData.message,
          referredBy: formData.referredBy || '',
        }),
      }).catch(err => console.log('Sheet logging (non-critical):', err))

      setSubmitStatus('success')
      setStatusMessage("Thank you! Your inquiry has been sent. We'll be in touch soon.")
      setFormData({ name: '', email: '', phoneNumber: '', eventType: '', date: '', location: '', guestSize: '', message: '', referredBy: '', termsAccepted: false })
      setTimeout(() => { handleClose(); setSubmitStatus('idle') }, 2000)
    } catch (error) {
      console.error('EmailJS error:', error)
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
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#fffdf9] opacity-0 flex flex-col"
      >
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

        <button onClick={handleClose} className="absolute top-4 right-4 z-20 p-2 text-[#1A2744]/60 hover:text-[#CC2A7A]">
          <X size={24} />
        </button>

        <div className="p-6 border-b border-[#C9A96E] shrink-0 bg-[#FAF6F0]">
          <span className="text-[#CC2A7A] text-xs tracking-[0.3em] uppercase block mb-2 font-bold">Get in Touch</span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#1A2744] font-bold">Book a Consultation</h2>
        </div>

        <div 
          ref={scrollContainerRef}
          className="modal-scroll flex-1 p-6 bg-[#FAF6F0]"
          style={{ maxHeight: 'calc(90vh - 100px)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#1A2744] text-xs tracking-widest uppercase mb-2 font-bold">Your Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-transparent border-b border-[#C9A96E] py-2.5 text-[#1A2744] placeholder:text-[#1A2744]/50 text-sm focus:border-[#CC2A7A] focus:outline-none" placeholder="Jane Doe" required />
              </div>
              <div>
                <label className="block text-[#1A2744] text-xs tracking-widest uppercase mb-2 font-bold">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="w-full bg-transparent border-b border-[#C9A96E] py-2.5 text-[#1A2744] placeholder:text-[#1A2744]/50 text-sm focus:border-[#CC2A7A] focus:outline-none" placeholder="jane@email.com" required />
              </div>
            </div>

            <div>
              <label className="block text-[#1A2744] text-xs tracking-widest uppercase mb-2 font-bold">Phone Number</label>
              <input type="tel" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} 
                className="w-full bg-transparent border-b border-[#C9A96E] py-2.5 text-[#1A2744] placeholder:text-[#1A2744]/50 text-sm focus:border-[#CC2A7A] focus:outline-none" placeholder="(555) 123-4567" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#1A2744] text-xs tracking-widest uppercase mb-2 font-bold">Event Type</label>
                <select value={formData.eventType} onChange={(e) => setFormData({...formData, eventType: e.target.value})} 
                  className="w-full bg-transparent border-b border-[#C9A96E] py-2.5 text-[#1A2744] text-sm focus:border-[#CC2A7A] focus:outline-none" required>
                  <option value="" className="bg-[#FAF6F0]">Select an option</option>
                  <option value="dinner" className="bg-[#FAF6F0]">Intimate Dinner</option>
                  <option value="brunch" className="bg-[#FAF6F0]">Brunch Gathering</option>
                  <option value="celebration" className="bg-[#FAF6F0]">Special Celebration</option>
                  <option value="corporate" className="bg-[#FAF6F0]">Corporate Event</option>
                  <option value="other" className="bg-[#FAF6F0]">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[#1A2744] text-xs tracking-widest uppercase mb-2 font-bold">Event Date</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} 
                  className="w-full bg-transparent border-b border-[#C9A96E] py-2.5 text-[#1A2744] text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-[#1A2744] text-xs tracking-widest uppercase mb-2 font-bold">Location</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} 
                className="w-full bg-transparent border-b border-[#C9A96E] py-2.5 text-[#1A2744] placeholder:text-[#1A2744]/50 text-sm focus:border-[#CC2A7A] focus:outline-none" placeholder="Enter location" />
            </div>

            <div>
              <label className="block text-[#1A2744] text-xs tracking-widest uppercase mb-2 font-bold">Guest Size</label>
              <input type="text" value={formData.guestSize} onChange={(e) => setFormData({...formData, guestSize: e.target.value})} 
                className="w-full bg-transparent border-b border-[#C9A96E] py-2.5 text-[#1A2744] placeholder:text-[#1A2744]/50 text-sm focus:border-[#CC2A7A] focus:outline-none" placeholder="Number of guests" />
            </div>

            <div>
              <label className="block text-[#1A2744] text-xs tracking-widest uppercase mb-2 font-bold">Tell Us About Your Vision</label>
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={3}
                className="w-full bg-transparent border-b border-[#C9A96E] py-2.5 text-[#1A2744] resize-none placeholder:text-[#1A2744]/50 text-sm focus:border-[#CC2A7A] focus:outline-none" placeholder="Share your ideas, guest count, preferred style..." required />
            </div>

            <div>
              <label className="block text-[#1A2744] text-xs tracking-widest uppercase mb-2 font-bold">Referred By</label>
              <input type="text" value={formData.referredBy} onChange={(e) => setFormData({...formData, referredBy: e.target.value})} 
                className="w-full bg-transparent border-b border-[#C9A96E] py-2.5 text-[#1A2744] placeholder:text-[#1A2744]/50 text-sm focus:border-[#CC2A7A] focus:outline-none" placeholder="How did you hear about us?" />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" id="terms" checked={formData.termsAccepted} 
                onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})} className="mt-1 w-4 h-4 accent-[#CC2A7A]" />
              <label htmlFor="terms" className="text-[#1A2744] text-sm">
                I have read and agree to the <a href="/terms" target="_blank" className="text-[#CC2A7A] underline hover:text-[#1A2744]">Terms of Service</a>
              </label>
            </div>

            {submitStatus !== 'idle' && (
              <div className={`flex items-center gap-2 p-3 ${submitStatus === 'success' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                {submitStatus === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span className="text-sm">{statusMessage}</span>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} 
              className="w-full px-8 py-3 bg-[#CC2A7A] text-white text-sm tracking-widest uppercase hover:bg-[#1A2744] transition-colors disabled:opacity-50 font-bold">
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

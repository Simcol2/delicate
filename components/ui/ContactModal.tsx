'use client'

import { useState, useEffect, useRef } from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'
import { gsap } from 'gsap'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    venueName: '',
    venueLocation: '',
    guestSize: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: 0.1 }
      )
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.2,
    })
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: onClose
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        setFormData({
          name: '', email: '', eventType: '', date: '',
          venueName: '', venueLocation: '', guestSize: '', message: '',
        })
        setTimeout(() => {
          handleClose()
          setSubmitStatus('idle')
        }, 2000)
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
        className="relative w-full max-w-2xl max-h-[90vh] bg-[var(--navy-midnight)] overflow-hidden opacity-0"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <span className="text-[#de6050] text-xs tracking-[0.3em] uppercase font-sans block mb-2">
            Get in Touch
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-white">
            Book a Consultation
          </h2>
        </div>

        {/* Scrollable Form */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white font-sans focus:border-[#de6050] focus:outline-none transition-colors placeholder:text-white/40 text-sm"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white font-sans focus:border-[#de6050] focus:outline-none transition-colors placeholder:text-white/40 text-sm"
                  placeholder="jane@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-2">
                  Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white font-sans focus:border-[#de6050] focus:outline-none transition-colors text-sm"
                  required
                >
                  <option value="" className="bg-[var(--navy-midnight)]">Select an option</option>
                  <option value="dinner" className="bg-[var(--navy-midnight)]">Intimate Dinner</option>
                  <option value="brunch" className="bg-[var(--navy-midnight)]">Brunch Gathering</option>
                  <option value="celebration" className="bg-[var(--navy-midnight)]">Special Celebration</option>
                  <option value="corporate" className="bg-[var(--navy-midnight)]">Corporate Event</option>
                  <option value="other" className="bg-[var(--navy-midnight)]">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white font-sans focus:border-[#de6050] focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-2">
                  Venue Name
                </label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white font-sans focus:border-[#de6050] focus:outline-none transition-colors placeholder:text-white/40 text-sm"
                  placeholder="Enter venue name"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-2">
                  Venue Location
                </label>
                <input
                  type="text"
                  value={formData.venueLocation}
                  onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-2.5 text-white font-sans focus:border-[#de6050] focus:outline-none transition-colors placeholder:text-white/40 text-sm"
                  placeholder="Enter venue location"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-2">
                Guest Size
              </label>
              <input
                type="text"
                value={formData.guestSize}
                onChange={(e) => setFormData({ ...formData, guestSize: e.target.value })}
                className="w-full bg-transparent border-b border-white/30 py-2.5 text-white font-sans focus:border-[#de6050] focus:outline-none transition-colors placeholder:text-white/40 text-sm"
                placeholder="Number of guests"
              />
            </div>

            <div>
              <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-2">
                Tell Us About Your Vision
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full bg-transparent border-b border-white/30 py-2.5 text-white font-sans focus:border-[#de6050] focus:outline-none transition-colors resize-none placeholder:text-white/40 text-sm"
                placeholder="Share your ideas, guest count, preferred style..."
                required
              />
            </div>

            {submitStatus !== 'idle' && (
              <div className={`flex items-center gap-2 p-3 ${
                submitStatus === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {submitStatus === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span className="font-sans text-sm">{statusMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 bg-[#de6050] text-white font-sans text-sm tracking-widest uppercase hover:bg-[#c94a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Instagram, CheckCircle, AlertCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage('Thank you! Your inquiry has been sent. We\'ll be in touch soon.')
        // Reset form
        setFormData({
          name: '',
          email: '',
          eventType: '',
          date: '',
          venueName: '',
          venueLocation: '',
          guestSize: '',
          message: '',
        })
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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 lg:py-40 bg-[var(--navy-midnight)]"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl mx-auto">
          {/* Info Side */}
          <div>
            <span className="text-[var(--gold-antique)] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
              Get in Touch
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-8">
              Let&apos;s Create
              <br />
              <span className="text-[var(--gold-antique)]">Something Beautiful</span>
            </h2>
            <p className="font-sans text-white/70 text-lg leading-relaxed mb-12">
              Ready to elevate your next gathering? We&apos;d love to hear about 
              your vision. Reach out to schedule a complimentary consultation 
              where we&apos;ll discuss your event, style preferences, and how we 
              can bring your dream tablescape to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <a href="mailto:hello@delicateflowers.co" className="flex items-center gap-4 text-white/80 hover:text-[var(--gold-antique)] transition-colors group">
                <Mail className="text-[var(--gold-antique)]" size={20} />
                <span className="font-sans">hello@delicateflowers.co</span>
              </a>
              <a href="tel:+17606736636" className="flex items-center gap-4 text-white/80 hover:text-[var(--gold-antique)] transition-colors group">
                <Phone className="text-[var(--gold-antique)]" size={20} />
                <span className="font-sans">(760) 673-6636</span>
              </a>
              <div className="flex items-center gap-4 text-white/80">
                <MapPin className="text-[var(--gold-antique)]" size={20} />
                <span className="font-sans">Palm Springs, California</span>
              </div>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/80 hover:text-[var(--gold-antique)] transition-colors group">
                <Instagram className="text-[var(--gold-antique)]" size={20} />
                <span className="font-sans">@delicateflowers</span>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors placeholder:text-white/40"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors placeholder:text-white/40"
                  placeholder="jane@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors"
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
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Venue Name
                </label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors placeholder:text-white/40"
                  placeholder="Enter venue name"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Venue Location
                </label>
                <input
                  type="text"
                  value={formData.venueLocation}
                  onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors placeholder:text-white/40"
                  placeholder="Enter venue location"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-3">
                Guest Size
              </label>
              <input
                type="text"
                value={formData.guestSize}
                onChange={(e) => setFormData({ ...formData, guestSize: e.target.value })}
                className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors placeholder:text-white/40"
                placeholder="Number of guests"
              />
            </div>

            <div>
              <label className="block text-white/60 text-xs tracking-widest uppercase font-sans mb-3">
                Tell Us About Your Vision
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors resize-none placeholder:text-white/40"
                placeholder="Share your ideas, guest count, preferred style..."
                required
              />
            </div>

            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <div className={`flex items-center gap-3 p-4 ${
                submitStatus === 'success' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {submitStatus === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span className="font-sans text-sm">{statusMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-12 py-4 bg-[var(--gold-antique)] text-[var(--plum-deep)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--gold-pale)] transition-colors duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

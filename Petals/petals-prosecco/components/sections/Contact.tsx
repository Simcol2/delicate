'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    message: '',
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
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
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[var(--blush-warm)] leading-tight mb-8">
              Let's Create
              <br />
              <span className="text-[var(--gold-antique)]">Something Beautiful</span>
            </h2>
            <p className="font-sans text-[var(--blush-warm)]/70 text-lg leading-relaxed mb-12">
              Ready to elevate your next gathering? We'd love to hear about 
              your vision. Reach out to schedule a complimentary consultation 
              where we'll discuss your event, style preferences, and how we 
              can bring your dream tablescape to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <a href="mailto:hello@petalsandprosecco.com" className="flex items-center gap-4 text-[var(--blush-warm)]/80 hover:text-[var(--gold-antique)] transition-colors group">
                <Mail className="text-[var(--gold-antique)]" size={20} />
                <span className="font-sans">hello@petalsandprosecco.com</span>
              </a>
              <a href="tel:+17605551234" className="flex items-center gap-4 text-[var(--blush-warm)]/80 hover:text-[var(--gold-antique)] transition-colors group">
                <Phone className="text-[var(--gold-antique)]" size={20} />
                <span className="font-sans">(760) 555-1234</span>
              </a>
              <div className="flex items-center gap-4 text-[var(--blush-warm)]/80">
                <MapPin className="text-[var(--gold-antique)]" size={20} />
                <span className="font-sans">Palm Springs, California</span>
              </div>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[var(--blush-warm)]/80 hover:text-[var(--gold-antique)] transition-colors group">
                <Instagram className="text-[var(--gold-antique)]" size={20} />
                <span className="font-sans">@petalsandprosecco</span>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[var(--gold-antique)]/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--gold-antique)]/30 py-3 text-[var(--blush-warm)] font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-[var(--gold-antique)]/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--gold-antique)]/30 py-3 text-[var(--blush-warm)] font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors"
                  placeholder="jane@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[var(--gold-antique)]/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--gold-antique)]/30 py-3 text-[var(--blush-warm)] font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors"
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
                <label className="block text-[var(--gold-antique)]/60 text-xs tracking-widest uppercase font-sans mb-3">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--gold-antique)]/30 py-3 text-[var(--blush-warm)] font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[var(--gold-antique)]/60 text-xs tracking-widest uppercase font-sans mb-3">
                Tell Us About Your Vision
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-[var(--gold-antique)]/30 py-3 text-[var(--blush-warm)] font-sans focus:border-[var(--gold-antique)] focus:outline-none transition-colors resize-none"
                placeholder="Share your ideas, guest count, preferred style..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-12 py-4 bg-[var(--gold-antique)] text-[var(--plum-deep)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--gold-pale)] transition-colors duration-300 mt-4"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Navbar from '@/components/navigation/Navbar'
import { CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function ConsultationPage() {
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
      }

      // Send email via EmailJS
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      // Also save to Google Sheet (fire and forget - CORS workaround)
      const SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymCKBlAvMPzx5os5sSXDz45_Iwazyf8qmlQPdOaQ1akjjEqSMde4b2Nc0SAtOZ8XEisw/exec'
      
      // Use no-cors mode for Google Apps Script
      fetch(SHEET_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
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
      }).catch(err => console.log('Sheet logging:', err))

      setSubmitStatus('success')
      setStatusMessage("Thank you! Your inquiry has been sent. We'll be in touch soon.")
      setFormData({ name: '', email: '', phoneNumber: '', eventType: '', date: '', location: '', guestSize: '', message: '', referredBy: '', termsAccepted: false })
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
      setStatusMessage('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF6F0] pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-[#CC2A7A] text-xs tracking-[0.35em] uppercase font-sans block mb-4 font-bold">
              Mother&apos;s Day Special
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1A2744] leading-tight mb-4 font-bold">
              Book Your Consultation
            </h1>
            <p className="font-sans text-[#1A2744] text-lg">
              Reserve your Mother&apos;s Day Sunset Package. Limited spots available.
            </p>
          </div>

          {/* Form */}
          <div className="bg-[#FFFDF9] border border-[#C9A96E]/30 p-8 md:p-12 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    <option value="mothers-day" className="bg-[#FAF6F0]">Mother&apos;s Day Special</option>
                    <option value="dinner" className="bg-[#FAF6F0]">Intimate Dinner</option>
                    <option value="brunch" className="bg-[#FAF6F0]">Brunch Gathering</option>
                    <option value="celebration" className="bg-[#FAF6F0]">Special Celebration</option>
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
                className="w-full px-8 py-4 bg-[#CC2A7A] text-white text-sm tracking-widest uppercase hover:bg-[#1A2744] transition-colors disabled:opacity-50 font-bold">
                {isSubmitting ? 'Sending...' : 'Book Your Consultation'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

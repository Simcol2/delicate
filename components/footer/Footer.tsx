'use client'

import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-[#2c2420] py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div className="text-[#de6050] font-serif text-lg tracking-wide">
          Delicate Flowers
        </div>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="text-[#a89189] text-sm">Newsletter:</span>
          {subscribed ? (
            <span className="text-green-400 text-sm">Thanks for subscribing!</span>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-transparent border-b border-[#de6050]/50 py-1 px-2 text-white text-sm focus:border-[#de6050] focus:outline-none w-40"
                required
              />
              <button
                type="submit"
                className="ml-2 text-[#de6050] text-xs uppercase tracking-wider hover:text-white transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a 
            href="/terms" 
            className="text-[#a89189] text-sm hover:text-[#de6050] transition-colors"
          >
            Terms of Service
          </a>
          <span className="text-[#6b5b52] text-sm">
            {currentYear} Delicate Flowers
          </span>
        </div>
      </div>
    </footer>
  )
}

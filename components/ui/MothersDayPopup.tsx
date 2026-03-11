'use client'

import { useState, useEffect, Suspense } from 'react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function MothersDayPopupContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if popup was shown today
    const lastShown = localStorage.getItem('mothersDayPopupLastShown')
    const today = new Date().toDateString()
    
    if (lastShown === today) {
      return // Already shown today
    }

    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
      localStorage.setItem('mothersDayPopupLastShown', today)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleBookConsult = () => {
    window.open('https://calendar.app.google/mEhKoq1ZgiX9uZUa8', '_blank')
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-[90vw] md:max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full text-[#1A2744] hover:text-[#CC2A7A] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Mother's Day Image - Scrollable if too tall */}
        <div className="relative w-full overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {imageError ? (
            <div className="aspect-[3/4] w-full bg-gradient-to-b from-[#CC2A7A] to-[#1A2744] flex flex-col items-center justify-center text-white p-8 text-center">
              <span className="font-serif text-3xl mb-2">Mother&apos;s Day Special</span>
              <span className="text-lg mb-4">The Sunset Package</span>
              <span className="font-serif text-5xl text-[#C9A96E]">$500</span>
              <span className="text-sm mt-4 opacity-80">Limited spots available</span>
            </div>
          ) : (
            <Image
              src="/images/Delicate Flower-7 (3).png"
              alt="Mother's Day Special"
              width={600}
              height={800}
              className="w-full h-auto object-contain"
              onError={() => setImageError(true)}
              priority
            />
          )}
        </div>

        {/* CTA Button */}
        <div className="p-4 bg-white shrink-0">
          <a
            href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-8 py-4 bg-[#CC2A7A] text-white font-sans text-sm tracking-widest uppercase hover:bg-[#1A2744] transition-colors font-bold"
          >
            Book Your Consultation
          </a>
        </div>
      </div>
    </div>
  )
}

export default function MothersDayPopup() {
  return (
    <Suspense fallback={null}>
      <MothersDayPopupContent />
    </Suspense>
  )
}

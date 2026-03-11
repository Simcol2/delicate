'use client'

import { useState, useEffect, Suspense } from 'react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

function MothersDayPopupContent() {
  const [isVisible, setIsVisible] = useState(false)
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
    setIsVisible(false)
    router.push('/consultation')
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full text-[#1A2744] hover:text-[#CC2A7A] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Mother's Day Image */}
        <div className="relative aspect-[3/4] w-full">
          <img
            src="/images/mothers-day-promo.png"
            alt="Mother's Day Special - The Sunset Package $500"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CTA Button */}
        <div className="p-4 bg-white">
          <button
            onClick={handleBookConsult}
            className="w-full px-8 py-4 bg-[#CC2A7A] text-white font-sans text-sm tracking-widest uppercase hover:bg-[#1A2744] transition-colors font-bold"
          >
            Book Your Consultation
          </button>
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

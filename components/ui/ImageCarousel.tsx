'use client'

import { useState, useEffect, useCallback } from 'react'

const images = [
  '/Photo Slides/Delicate Flowers photos/DSC06748.JPEG',
  '/Photo Slides/delicate flowers photos/DSC06749.JPEG',
  '/Photo Slides/delicate flowers photos/DSC06750.JPEG',
  '/Photo Slides/delicate flowers photos/DSC06751.JPEG',
  '/Photo Slides/delicate flowers photos/DSC06752.JPEG',
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const visibleCount = 3

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [])

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [isHovered, nextSlide])

  // Get visible images with wrap-around
  const getVisibleImages = () => {
    const visible = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % images.length
      visible.push(images[index])
    }
    return visible
  }

  const visibleImages = getVisibleImages()

  return (
    <div 
      className="w-full overflow-hidden py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="relative">
          {/* Carousel Container */}
          <div 
            className="flex gap-4 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${0}px)` }}
          >
            {visibleImages.map((src, index) => (
              <div
                key={`${src}-${currentIndex}-${index}`}
                className="group relative flex-shrink-0 overflow-hidden rounded-lg cursor-pointer"
                style={{ width: 'calc(33.333% - 11px)', aspectRatio: '4/3' }}
              >
                {/* Image */}
                <img
                  src={src}
                  alt={`Gallery image ${currentIndex + index + 1}`}
                  className="h-full w-full object-cover transition-all duration-500 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110"
                />
                
                {/* Grey Overlay */}
                <div className="absolute inset-0 bg-gray-500/30 transition-opacity duration-300 group-hover:opacity-0" />
                
                {/* Pop effect shadow on hover */}
                <div className="absolute inset-0 shadow-[0_0_0_0_rgba(0,0,0,0)] transition-shadow duration-300 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]" />
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[var(--gold-antique)] w-6' 
                    : 'bg-[var(--gold-antique)]/30 hover:bg-[var(--gold-antique)]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

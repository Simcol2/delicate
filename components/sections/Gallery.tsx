'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  { id: 1, title: 'Celebrations', image: '/Photo Slides/Celebrations/Delicate Flower-3-table setting1.png' },
  { id: 2, title: 'Floral Arrangements', image: '/P&P photos/IMG_0586.jpg' },
  { id: 3, title: 'Cocktails', image: '/Photo Slides/Cocktails/DSC06742.JPEG' },
  { id: 4, title: 'Outdoor Soiree', image: '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png' },
]

interface GalleryProps {
  onOpenContact: () => void
}

export default function Gallery({ onOpenContact }: GalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-scroll every 5 seconds on mobile
  useEffect(() => {
    if (!isMobile) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryItems.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isMobile])

  // Animate on load (desktop only)
  useEffect(() => {
    if (isMobile) return
    const ctx = gsap.context(() => {
      const items = document.querySelectorAll('.gallery-item')
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [isMobile])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryItems.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-32 lg:py-40 bg-cream"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between max-w-7xl mx-auto mb-16">
          <div>
            <span className="text-midnight text-sm tracking-[0.3em] uppercase font-sans block mb-4">
              Portfolio
            </span>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-midnight leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
              Recent
              <br />
              <span style={{ color: '#FF6F61' }}>Experiences</span>
            </h2>
          </div>
          <p className="font-sans text-text-mid text-lg max-w-md mt-6 lg:mt-0">
            Each gathering tells a unique story. Here&apos;s a glimpse into 
            the moments we&apos;ve helped create.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative max-w-md mx-auto">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-2xl text-[#faf6f0]">{item.title}</h3>
                  <p className="text-[#faf6f0]/70 text-sm mt-1">{index + 1} / {galleryItems.length}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[#faf6f0]/80 rounded-full text-[#1A2744] hover:bg-[#faf6f0]"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#faf6f0]/80 rounded-full text-[#1A2744] hover:bg-[#faf6f0]"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-midnight' : 'bg-stone'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid - 4 cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="gallery-item group relative overflow-hidden rounded-lg aspect-[4/5]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-2xl text-coral drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Experiences Button */}
        <div className="text-center mt-16">
          <a
            href="/experiences"
            className="inline-block px-10 py-4 border-2 border-midnight text-midnight font-sans text-sm tracking-widest uppercase hover:bg-midnight hover:text-cream transition-all duration-300"
          >
            View All Experiences
          </a>
        </div>
      </div>
    </section>
  )
}

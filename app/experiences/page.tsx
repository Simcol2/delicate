'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { gsap } from 'gsap'
import Navbar from '@/components/navigation/Navbar'

interface Experience {
  id: string
  name: string
  description: string
  image: string
  details: string
}

// 9 Experience cards with static data
const experiences: Experience[] = [
  {
    id: '1',
    name: 'Backyard BBQ',
    description: 'Rustic outdoor gatherings with smoked specialties',
    image: '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png',
    details: 'Our backyard BBQ experience brings rustic charm and smoky flavors together. Perfect for casual summer gatherings with friends and family.'
  },
  {
    id: '2',
    name: 'Christmas',
    description: 'Festive holiday tablescapes and celebrations',
    image: '/Photo Slides/Christmas/Delicate Flower-5-chrismtas.png',
    details: 'Transform your holiday dinner into a winter wonderland with our curated Christmas tablescapes featuring seasonal florals and elegant touches.'
  },
  {
    id: '3',
    name: 'Easter',
    description: 'Spring celebrations in full bloom',
    image: '/Photo Slides/Easter/Delicate Flower-3.png',
    details: 'Celebrate renewal and rebirth with our Easter table designs featuring soft pastels, spring florals, and fresh, vibrant arrangements.'
  },
  {
    id: '4',
    name: 'Game Night',
    description: 'Casual entertainment with elevated style',
    image: '/Photo Slides/Game Night/Delicate Flower-11.png',
    details: 'Even game night deserves beautiful styling. We create comfortable yet chic setups that make your casual gatherings feel special.'
  },
  {
    id: '5',
    name: 'Outdoor Soiree',
    description: 'Elegant al fresco dining under the stars',
    image: '/Photo Slides/Outdoor Soiree/Delicate Flower-9-outdoor.png',
    details: 'Dine under the stars with our elegant outdoor soiree setups. String lights, flowing fabrics, and nature-inspired centerpieces create magic.'
  },
  {
    id: '6',
    name: 'Thanksgiving',
    description: 'Warm harvest feasts with family',
    image: '/Photo Slides/Thanksgiving/Delicate Flower-7.png',
    details: 'Gather grateful hearts around a beautifully styled harvest table with rich autumn tones, natural elements, and cozy ambiance.'
  },
  {
    id: '7',
    name: 'Weddings',
    description: 'Intimate wedding celebrations and receptions',
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-2-table setting 2.png',
    details: 'From intimate ceremonies to celebratory receptions, we create wedding tablescapes that reflect your unique love story.'
  },
  {
    id: '8',
    name: 'Wine & Cheese',
    description: 'Sophisticated tasting evenings',
    image: '/Photo Slides/Game Night/Delicate Flower-12.png',
    details: 'Elevate your wine and cheese tastings with sophisticated styling that complements the refined flavors and creates an elegant atmosphere.'
  },
  {
    id: '9',
    name: 'Celebrations',
    description: 'Birthdays, anniversaries, and special moments',
    image: '/Photo Slides/Christmas/Delicate Flower-3-table setting1.png',
    details: 'Every milestone deserves to be celebrated in style. We create memorable settings for birthdays, anniversaries, and all of life\'s special moments.'
  }
]

export default function ExperiencesPage() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Animate cards on load
  useEffect(() => {
    const cards = document.querySelectorAll('.experience-card')
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      }
    )
  }, [])

  const openModal = (exp: Experience) => {
    setSelectedExperience(exp)
    setIsVisible(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => {
      setSelectedExperience(null)
      document.body.style.overflow = ''
    }, 300)
  }

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedExperience) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedExperience])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--white-pure)] pt-32 pb-20">
        <div className="w-full px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[var(--gold-antique)] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
              Our Work
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[var(--plum-deep)] leading-tight mb-6">
              Experiences
            </h1>
            <p className="font-sans text-[var(--navy-midnight)]/70 text-lg">
              Each gathering tells a unique story. Click on any experience to see more.
            </p>
          </div>

          {/* Experience Cards Grid - 9 cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                onClick={() => openModal(exp)}
                className="experience-card group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[var(--plum-deep)]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-sans text-sm tracking-widest uppercase border border-white px-6 py-3">
                      View Details
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-[var(--plum-deep)] mb-1">
                  {exp.name}
                </h3>
                <p className="font-sans text-[var(--navy-midnight)]/60 text-sm">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-16">
            <a
              href="/"
              className="inline-block px-10 py-4 border-2 border-[var(--plum-deep)] text-[var(--plum-deep)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-deep)] hover:text-[var(--gold-antique)] transition-all duration-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedExperience && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className={`relative bg-[#faf8f3] rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full text-[var(--plum-deep)]/60 hover:text-[var(--plum-deep)] hover:bg-white transition-all duration-200 shadow-sm"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Image */}
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description Box */}
              <div className="p-6 md:p-8">
                <span className="text-[var(--gold-antique)] text-xs tracking-[0.3em] uppercase font-sans font-medium block mb-2">
                  Experience
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[var(--plum-deep)] mb-4">
                  {selectedExperience.name}
                </h2>
                <p className="font-sans text-[var(--navy-midnight)]/80 text-base leading-relaxed mb-6">
                  {selectedExperience.details}
                </p>

                {/* Book Consultation Button */}
                <a
                  href="/#contact"
                  onClick={closeModal}
                  className="inline-block px-6 py-3 bg-[var(--plum-deep)] text-[var(--gold-antique)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-royal)] transition-colors duration-300"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

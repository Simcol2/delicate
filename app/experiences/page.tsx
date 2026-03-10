'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import Navbar from '@/components/navigation/Navbar'

interface PhotoFolder {
  id: string
  name: string
  coverImage: string
  photos: string[]
}

// 8 Photo folders based on the directories in public/Photo Slides
const photoFolders: PhotoFolder[] = [
  {
    id: '1',
    name: 'Celebrations',
    coverImage: '/Photo Slides/Celebrations/Delicate Flower-3-table setting1.png',
    photos: [
      '/Photo Slides/Celebrations/Delicate Flower-12.png',
      '/Photo Slides/Celebrations/Delicate Flower-14.png',
      '/Photo Slides/Celebrations/Delicate Flower-3-table setting1.png',
      '/Photo Slides/Celebrations/Delicate Flower-3.png',
      '/Photo Slides/Celebrations/Delicate Flower-5-chrismtas.png',
      '/Photo Slides/Celebrations/Delicate Flower-6-table3.png',
      '/Photo Slides/Celebrations/Delicate Flower-7.png',
      '/Photo Slides/Celebrations/IMG_5548.jpeg',
      '/Photo Slides/Celebrations/IMG_5714.HEIC',
      '/Photo Slides/Celebrations/IMG_5877.HEIC',
      '/Photo Slides/Celebrations/IMG_9435.HEIC',
    ]
  },
  {
    id: '2',
    name: 'Cocktails',
    coverImage: '/Photo Slides/Cocktails/Delicate Flower-4-drink.png',
    photos: [
      '/Photo Slides/Cocktails/Delicate Flower-4-drink.png',
    ]
  },
  {
    id: '3',
    name: 'Floral Arrangements',
    coverImage: '/Photo Slides/Floral Arrangements/Delicate Flower-13.png',
    photos: [
      '/Photo Slides/Floral Arrangements/Delicate Flower-13.png',
      '/Photo Slides/Floral Arrangements/IMG_8300.HEIC',
      '/Photo Slides/Floral Arrangements/IMG_9479.HEIC',
      '/Photo Slides/Floral Arrangements/IMG_9480.HEIC',
    ]
  },
  {
    id: '4',
    name: 'Game Night',
    coverImage: '/Photo Slides/Game Night/Delicate Flower-11.png',
    photos: [
      '/Photo Slides/Game Night/Delicate Flower-11.png',
      '/Photo Slides/Game Night/IMG_6440.HEIC',
      '/Photo Slides/Game Night/IMG_8981.HEIC',
    ]
  },
  {
    id: '5',
    name: 'Outdoor Soiree',
    coverImage: '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png',
    photos: [
      '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png',
      '/Photo Slides/Outdoor Soiree/Delicate Flower-9-outdoor.png',
    ]
  },
  {
    id: '6',
    name: 'The Smoker',
    coverImage: '/Photo Slides/The Smoker/Delicate Flower-10.png',
    photos: [
      '/Photo Slides/The Smoker/Delicate Flower-10.png',
    ]
  },
  {
    id: '7',
    name: 'Themed Events',
    coverImage: '/Photo Slides/Themed Events/Delicate Flower-5-chrismtas.png',
    photos: [
      '/Photo Slides/Themed Events/Delicate Flower-5-chrismtas.png',
    ]
  },
  {
    id: '8',
    name: 'Weddings',
    coverImage: '/Photo Slides/Weddings/Delicate Flower-4-drink.png',
    photos: [
      '/Photo Slides/Weddings/Delicate Flower-4-drink.png',
    ]
  },
]

export default function ExperiencesPage() {
  const [selectedFolder, setSelectedFolder] = useState<PhotoFolder | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Animate cards on load
  useEffect(() => {
    const cards = document.querySelectorAll('.photo-card')
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

  const openModal = (folder: PhotoFolder) => {
    setSelectedFolder(folder)
    setCurrentPhotoIndex(0)
    setIsVisible(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => {
      setSelectedFolder(null)
      setCurrentPhotoIndex(0)
      document.body.style.overflow = ''
    }, 300)
  }

  const nextPhoto = () => {
    if (selectedFolder) {
      setCurrentPhotoIndex((prev) => 
        (prev + 1) % selectedFolder.photos.length
      )
    }
  }

  const prevPhoto = () => {
    if (selectedFolder) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? selectedFolder.photos.length - 1 : prev - 1
      )
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFolder) return
      
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowRight') {
        nextPhoto()
      } else if (e.key === 'ArrowLeft') {
        prevPhoto()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedFolder])

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
              Each gathering tells a unique story. Click on any album to explore the photos.
            </p>
          </div>

          {/* Photo Cards Grid - 8 cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {photoFolders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => openModal(folder)}
                className="photo-card group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
                  <img
                    src={folder.coverImage}
                    alt={folder.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[var(--plum-deep)]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-sans text-sm tracking-widest uppercase border border-white px-6 py-3">
                      View Photos
                    </span>
                  </div>
                  {/* Photo count badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {folder.photos.length} {folder.photos.length === 1 ? 'photo' : 'photos'}
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-[var(--plum-deep)] mb-1">
                  {folder.name}
                </h3>
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

      {/* Modal with Photo Carousel */}
      {selectedFolder && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className={`relative bg-[#1a1a1a] rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-6">
              <h2 className="font-serif text-2xl md:text-3xl text-white">
                {selectedFolder.name}
              </h2>
              <p className="text-white/60 text-sm mt-1">
                {currentPhotoIndex + 1} / {selectedFolder.photos.length}
              </p>
            </div>

            {/* Photo Carousel */}
            <div className="relative flex items-center justify-center bg-black min-h-[60vh] max-h-[80vh]">
              {/* Previous Button */}
              {selectedFolder.photos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevPhoto()
                  }}
                  className="absolute left-4 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 hover:scale-110"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={32} />
                </button>
              )}

              {/* Photo */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={selectedFolder.photos[currentPhotoIndex]}
                  alt={`${selectedFolder.name} - Photo ${currentPhotoIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              {/* Next Button */}
              {selectedFolder.photos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextPhoto()
                  }}
                  className="absolute right-4 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 hover:scale-110"
                  aria-label="Next photo"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {selectedFolder.photos.length > 1 && (
              <div className="bg-[#1a1a1a] p-4">
                <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                  {selectedFolder.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden transition-all duration-200 ${
                        index === currentPhotoIndex 
                          ? 'ring-2 ring-[var(--gold-antique)] opacity-100' 
                          : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Book a Consultation Button */}
            <div className="bg-[#1a1a1a] p-4 pt-0 flex justify-center">
              <a
                href="/#contact"
                onClick={closeModal}
                className="inline-block px-8 py-3 bg-[var(--plum-deep)] text-[var(--gold-antique)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-royal)] transition-colors duration-300"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

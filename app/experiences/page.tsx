'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { gsap } from 'gsap'
import Navbar from '@/components/navigation/Navbar'
import ContactModal from '@/components/ui/ContactModal'
import { getImagesFromFolder } from '@/lib/firebase'

interface PhotoFolder {
  id: string
  name: string
  coverImage: string
  photos: string[]
}

// All 7 Photo folders
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
      '/Photo Slides/Celebrations/IMG_5714.jpg',
      '/Photo Slides/Celebrations/IMG_5877.jpg',
      '/Photo Slides/Celebrations/IMG_9435.jpg',
    ]
  },
  {
    id: '2',
    name: 'Cocktails',
    coverImage: '/Photo Slides/Cocktails/DSC06742.JPEG',
    photos: [
      '/Photo Slides/Cocktails/DSC06742.JPEG',
      '/Photo Slides/Cocktails/DSC06748.JPEG',
    ]
  },
  {
    id: '3',
    name: 'Floral Arrangements',
    coverImage: '/Photo Slides/Floral Arrangements/Delicate Flower-13.png',
    photos: [
      '/Photo Slides/Floral Arrangements/Delicate Flower-13.png',
      '/Photo Slides/Floral Arrangements/IMG_6169.jpg',
      '/Photo Slides/Floral Arrangements/IMG_8300.jpg',
      '/Photo Slides/Floral Arrangements/IMG_9442.jpg',
      '/Photo Slides/Floral Arrangements/IMG_9479.jpg',
      '/Photo Slides/Floral Arrangements/IMG_9480.jpg',
    ]
  },
  {
    id: '4',
    name: 'Outdoor Soiree',
    coverImage: '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png',
    photos: [
      '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png',
      '/Photo Slides/Outdoor Soiree/Delicate Flower-9-outdoor.png',
    ]
  },
  {
    id: '5',
    name: 'Themed Events',
    coverImage: '/Photo Slides/Celebrations/Delicate Flower-5-chrismtas.png',
    photos: [
      '/Photo Slides/Celebrations/Delicate Flower-5-chrismtas.png',
    ]
  },
  {
    id: '6',
    name: 'Weddings',
    coverImage: '/Photo Slides/Weddings/Delicate Flower-4-drink.png',
    photos: [
      '/Photo Slides/Weddings/Delicate Flower-4-drink.png',
    ]
  },
]

export default function ExperiencesPage() {
  const [folders, setFolders] = useState<PhotoFolder[]>(photoFolders)
  const [selectedFolder, setSelectedFolder] = useState<PhotoFolder | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [loadingFolders, setLoadingFolders] = useState<Set<string>>(new Set())
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

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

  const openModal = async (folder: PhotoFolder) => {
    // Try to load Firebase images for this folder
    if (!loadingFolders.has(folder.name)) {
      setLoadingFolders(prev => new Set(prev).add(folder.name))
      try {
        const firebaseImages = await getImagesFromFolder(folder.name)
        if (firebaseImages.length > 0) {
          // Merge Firebase images with local
          const firebaseUrls = firebaseImages.map(img => img.url)
          const updatedFolder = {
            ...folder,
            photos: [...firebaseUrls, ...folder.photos]
          }
          setFolders(prev => prev.map(f => f.id === folder.id ? updatedFolder : f))
          setSelectedFolder(updatedFolder)
        } else {
          setSelectedFolder(folder)
        }
      } catch (err) {
        setSelectedFolder(folder)
      }
      setLoadingFolders(prev => {
        const newSet = new Set(prev)
        newSet.delete(folder.name)
        return newSet
      })
    } else {
      setSelectedFolder(folder)
    }
    
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
      setCurrentPhotoIndex((prev) => (prev + 1) % selectedFolder.photos.length)
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
      if (e.key === 'Escape') closeModal()
      else if (e.key === 'ArrowRight') nextPhoto()
      else if (e.key === 'ArrowLeft') prevPhoto()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedFolder])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF6F0] pt-32 pb-20">
        <div className="w-full px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#CC2A7A] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
              Our Work
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#1A2744] leading-tight mb-6 font-bold">
              Experiences
            </h1>
            <p className="font-sans text-[#1A2744] text-lg">
              Each gathering tells a unique story. Click on any album to explore the photos.
            </p>
          </div>

          {/* Photo Cards Grid - 8 cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {folders.map((folder) => (
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
                  <div className="absolute inset-0 bg-[#CC2A7A]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-[#faf6f0] font-sans text-sm tracking-widest uppercase border border-[#faf6f0] px-6 py-3">
                      View Photos
                    </span>
                  </div>
                  {/* Photo count badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-[#faf6f0] text-xs px-2 py-1 rounded">
                    {folder.photos.length} {folder.photos.length === 1 ? 'photo' : 'photos'}
                  </div>
                  {loadingFolders.has(folder.name) && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="animate-spin h-6 w-6 text-[#faf6f0]" />
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-2xl text-[#1A2744] mb-1 font-bold">
                  {folder.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-16 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block px-10 py-4 bg-[#CC2A7A] text-[#faf6f0] font-sans text-sm tracking-widest uppercase hover:bg-[#1A2744] transition-all duration-300"
            >
              Book a Consultation
            </button>
            <a
              href="/"
              className="inline-block px-10 py-4 border-2 border-[#CC2A7A] text-[#8f0e04] font-sans text-sm tracking-widest uppercase hover:bg-[#CC2A7A] hover:text-[#faf6f0] transition-all duration-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      {/* Modal with Photo Carousel */}
      {selectedFolder && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          <div className={`relative bg-[#1A2744] rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-20 p-2 bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 rounded-full text-[#faf6f0]">
              <X size={24} />
            </button>

            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-6">
              <h2 className="font-serif text-2xl md:text-3xl text-[#faf6f0]">{selectedFolder.name}</h2>
              <p className="text-[#faf6f0]/60 text-sm mt-1">
                {currentPhotoIndex + 1} / {selectedFolder.photos.length}
              </p>
            </div>

            <div className="relative flex items-center justify-center bg-[#1a1a1a] min-h-[60vh] max-h-[80vh]">
              {selectedFolder.photos.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); prevPhoto() }} className="absolute left-4 z-20 p-3 bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 rounded-full text-[#faf6f0]">
                  <ChevronLeft size={32} />
                </button>
              )}

              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={selectedFolder.photos[currentPhotoIndex]}
                  alt={`${selectedFolder.name} - Photo ${currentPhotoIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              {selectedFolder.photos.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); nextPhoto() }} className="absolute right-4 z-20 p-3 bg-[#FAF6F0]/10 hover:bg-[#FAF6F0]/20 rounded-full text-[#faf6f0]">
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {selectedFolder.photos.length > 1 && (
              <div className="bg-[#1A2744] p-4">
                <div className="flex gap-2 overflow-x-auto pb-2 justify-center custom-scroll">
                  {selectedFolder.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden transition-all duration-200 ${
                        index === currentPhotoIndex 
                          ? 'ring-2 ring-[#C9A96E] opacity-100' 
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
            <div className="bg-[#1A2744] p-4 pt-0 flex justify-center">
              <a
                href="/#contact"
                onClick={closeModal}
                className="inline-block px-8 py-3 bg-[#CC2A7A] text-[#faf6f0] font-sans text-sm tracking-widest uppercase hover:bg-[#1A2744] transition-colors duration-300"
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

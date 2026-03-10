'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { gsap } from 'gsap'
import Navbar from '@/components/navigation/Navbar'
import { getImagesFromFolder, getAllFolders } from '@/lib/firebase'

interface PhotoFolder {
  id: string
  name: string
  coverImage: string
  photos: string[]
}

// Default folders - showing only 4 main categories
const DEFAULT_FOLDERS: PhotoFolder[] = [
  { id: '1', name: 'Celebrations', coverImage: '/Photo Slides/Celebrations/Delicate Flower-3-table setting1.png', photos: [] },
  { id: '2', name: 'Floral Arrangements', coverImage: '/Photo Slides/Floral Arrangements/Delicate Flower-13.png', photos: [] },
  { id: '3', name: 'Cocktails', coverImage: '/Photo Slides/Cocktails/DSC06742.JPEG', photos: [] },
  { id: '4', name: 'Outdoor Soiree', coverImage: '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png', photos: [] },
]

export default function ExperiencesPage() {
  const [folders, setFolders] = useState<PhotoFolder[]>(DEFAULT_FOLDERS)
  const [selectedFolder, setSelectedFolder] = useState<PhotoFolder | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load folders from Firebase on mount
  useEffect(() => {
    loadFoldersFromFirebase()
  }, [])

  const loadFoldersFromFirebase = async () => {
    setIsLoading(true)
    try {
      // Get all folders from Firebase
      const firebaseFolders = await getAllFolders()
      
      // Load images for each folder
      const updatedFolders = await Promise.all(
        DEFAULT_FOLDERS.map(async (folder) => {
          const firebaseImages = await getImagesFromFolder(folder.name)
          
          if (firebaseImages.length > 0) {
            // Use Firebase images if available
            return {
              ...folder,
              coverImage: firebaseImages[0].url,
              photos: firebaseImages.map(img => img.url)
            }
          }
          // Otherwise keep default local images
          return folder
        })
      )
      
      setFolders(updatedFolders)
    } catch (err) {
      console.error('Error loading from Firebase:', err)
      setError('Some images may not be up to date. Using local images.')
    }
    setIsLoading(false)
  }

  // Animate cards on load
  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [isLoading])

  const openModal = (folder: PhotoFolder) => {
    // If no Firebase photos, try to load them now
    if (folder.photos.length === 0) {
      loadFolderPhotos(folder)
    } else {
      setSelectedFolder(folder)
      setCurrentPhotoIndex(0)
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    }
  }

  const loadFolderPhotos = async (folder: PhotoFolder) => {
    setIsLoading(true)
    try {
      const images = await getImagesFromFolder(folder.name)
      if (images.length > 0) {
        const updatedFolder = {
          ...folder,
          photos: images.map(img => img.url)
        }
        setSelectedFolder(updatedFolder)
        setCurrentPhotoIndex(0)
        setIsVisible(true)
        document.body.style.overflow = 'hidden'
      } else {
        setError(`No photos found in ${folder.name}`)
      }
    } catch (err) {
      setError('Failed to load photos')
    }
    setIsLoading(false)
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
      <main className="min-h-screen bg-[#faf6f0] pt-32 pb-20">
        <div className="w-full px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#c9594a] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
              Our Work
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#2c2420] leading-tight mb-6">
              Experiences
            </h1>
            <p className="font-sans text-[#6b5b52] text-lg">
              Each gathering tells a unique story. Click on any album to explore the photos.
            </p>
          </div>

          {error && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm text-center">
              {error}
              <button onClick={() => setError(null)} className="ml-2 underline">Dismiss</button>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-16">
              <Loader2 className="animate-spin h-12 w-12 text-[#8f0e04] mx-auto mb-4" />
              <p className="text-[#6b5b52]">Loading experiences...</p>
            </div>
          ) : (
            <>
              {/* Photo Cards Grid */}
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
                      <div className="absolute inset-0 bg-[#8f0e04]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-[#faf6f0] font-sans text-sm tracking-widest uppercase border border-[#faf6f0] px-6 py-3">
                          View Photos
                        </span>
                      </div>
                      {folder.photos.length > 0 && (
                        <div className="absolute bottom-3 right-3 bg-black/60 text-[#faf6f0] text-xs px-2 py-1 rounded">
                          {folder.photos.length} {folder.photos.length === 1 ? 'photo' : 'photos'}
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl text-[#2c2420] mb-1">
                      {folder.name}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Back to Home */}
              <div className="text-center mt-16">
                <a
                  href="/"
                  className="inline-block px-10 py-4 border-2 border-[#8f0e04] text-[#8f0e04] font-sans text-sm tracking-widest uppercase hover:bg-[#8f0e04] hover:text-[#faf6f0] transition-all duration-300"
                >
                  Back to Home
                </a>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Modal with Photo Carousel */}
      {selectedFolder && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          <div className={`relative bg-[#2c2420] rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-20 p-2 bg-[#faf6f0]/10 hover:bg-[#faf6f0]/20 rounded-full text-[#faf6f0]">
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
                <button onClick={(e) => { e.stopPropagation(); prevPhoto() }} className="absolute left-4 z-20 p-3 bg-[#faf6f0]/10 hover:bg-[#faf6f0]/20 rounded-full text-[#faf6f0]">
                  <ChevronLeft size={32} />
                </button>
              )}

              <div className="relative w-full h-full flex items-center justify-center p-4">
                {selectedFolder.photos.length > 0 ? (
                  <img src={selectedFolder.photos[currentPhotoIndex]} alt={`${selectedFolder.name} - Photo ${currentPhotoIndex + 1}`} className="max-w-full max-h-[70vh] object-contain" />
                ) : (
                  <p className="text-[#faf6f0]/60">No photos in this album yet</p>
                )}
              </div>

              {selectedFolder.photos.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); nextPhoto() }} className="absolute right-4 z-20 p-3 bg-[#faf6f0]/10 hover:bg-[#faf6f0]/20 rounded-full text-[#faf6f0]">
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            {selectedFolder.photos.length > 1 && (
              <div className="bg-[#2c2420] p-4">
                <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                  {selectedFolder.photos.map((photo, index) => (
                    <button key={index} onClick={() => setCurrentPhotoIndex(index)} className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden transition-all duration-200 ${index === currentPhotoIndex ? 'ring-2 ring-[#c9a96e] opacity-100' : 'opacity-50 hover:opacity-80'}`}>
                      <img src={photo} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#2c2420] p-4 pt-0 flex justify-center">
              <a href="/#contact" onClick={closeModal} className="inline-block px-8 py-3 bg-[#8f0e04] text-[#faf6f0] font-sans text-sm tracking-widest uppercase hover:bg-[#c9594a]">
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

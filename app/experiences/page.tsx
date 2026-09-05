'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import ContactModal from '@/components/ui/ContactModal'
import { getImagesFromFolder } from '@/lib/firebase'

interface PhotoFolder {
  id: string
  name: string
  // Optional label shown to visitors when it differs from `name`, which
  // stays fixed since it also keys the Firebase Storage folder used by
  // the admin panel's uploads.
  displayName?: string
  coverImage: string
  photos: string[]
}

// Sparse warm-gold flecks, tiled as a page-wide overlay sitting between the
// cream background and the page content. The alpha gamma curve crushes most
// of the noise to fully transparent so only scattered bright specks survive,
// instead of a flat grey grain.
const TEXTURE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch' result='noise'/><feColorMatrix in='noise' type='matrix' values='0 0 0 0 0.76  0 0 0 0 0.60  0 0 0 0 0.32  0 0 0 1 0' result='gold'/><feComponentTransfer in='gold'><feFuncA type='gamma' amplitude='1' exponent='9' offset='0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
const TEXTURE_BACKGROUND = `url("data:image/svg+xml,${encodeURIComponent(TEXTURE_SVG)}")`

const photoFolders: PhotoFolder[] = [
  {
    id: '1',
    name: 'Celebrations',
    coverImage: '/Photo Slides/Celebrations/Delicate Flower-Celebrations-Centerpiece.jpg',
    photos: [
      '/Photo Slides/Celebrations/Delicate Flower-Celebrations-Centerpiece.jpg',
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
      '/Photo Slides/Celebrations/Delicate Flower-Celebrations-Lime Arrangement.jpg',
      '/Photo Slides/Celebrations/Delicate Flower-Celebrations-Gold Place Setting.jpg',
      '/Photo Slides/Celebrations/Delicate Flower-Celebrations-Waterfront Bouquet.jpg',
      '/Photo Slides/Celebrations/Delicate Flower-Celebrations-Garden Harvest 1.jpg',
      '/Photo Slides/Celebrations/Delicate Flower-Celebrations-Garden Harvest 2.jpg',
      '/Photo Slides/Celebrations/Delicate Flower-Celebrations-Amber Arrangement.jpg',
      '/Photo Slides/Celebrations/Delicate Flower-Celebrations-Punch Bowl.jpg',
    ]
  },
  {
    id: '2',
    name: 'Mocktails',
    displayName: 'Mocktails & Treats',
    coverImage: '/Photo Slides/Cocktails/Delicate Flower-Mocktails-Fruit Garnish Glasses.jpg',
    photos: [
      '/Photo Slides/Cocktails/Delicate Flower-Mocktails-Fruit Garnish Glasses.jpg',
      '/Photo Slides/Cocktails/Delicate Flower-Mocktails-Chocolate Cake Overhead.jpg',
      '/Photo Slides/Cocktails/Delicate Flower-Mocktails-Poolside Tea Table.jpg',
      '/Photo Slides/Cocktails/Delicate Flower-Mocktails-Chocolate Cake Side.jpg',
    ]
  },
  {
    id: '3',
    name: 'Floral Arrangements',
    coverImage: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Amber Arrangement.jpg',
    photos: [
      '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Amber Arrangement.jpg',
    ]
  },
  {
    id: '4',
    name: 'Outdoor Soiree',
    coverImage: '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png',
    photos: [
      '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png',
      '/Photo Slides/Outdoor Soiree/Delicate Flower-9-outdoor.png',
      '/Photo Slides/Outdoor Soiree/Delicate Flower-Outdoor Soiree-Berry Dessert.jpg',
      '/Photo Slides/Outdoor Soiree/Delicate Flower-Outdoor Soiree-Poolside Tea Table.jpg',
    ]
  },
  {
    id: '5',
    name: 'Themed Events',
    coverImage: '/Photo Slides/Celebrations/Delicate Flower-5-chrismtas.png',
    photos: [
      '/Photo Slides/Celebrations/Delicate Flower-5-chrismtas.png',
      '/Photo Slides/Themed Events/Delicate Flower-Themed Events-NYE Place Setting.jpg',
      '/Photo Slides/Themed Events/Delicate Flower-Themed Events-Patriotic Table.jpg',
    ]
  },
  {
    id: '6',
    name: 'Weddings',
    coverImage: '/Photo Slides/Weddings/Delicate Flower-Weddings-Flower Wall Closeup.jpg',
    photos: [
      '/Photo Slides/Weddings/Delicate Flower-Weddings-Flower Wall Closeup.jpg',
      '/Photo Slides/Weddings/Delicate Flower-Bridal-Bouquet.jpg',
      '/Photo Slides/Weddings/Delicate Flower-Wedding-Flower-Wall.jpg',
      '/Photo Slides/Weddings/Delicate Flower-Weddings-Flower Wall Topper.jpg',
      '/Photo Slides/Weddings/Delicate Flower-Weddings-Reception Centerpiece.jpg',
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const openModal = async (folder: PhotoFolder) => {
    if (!loadingFolders.has(folder.name)) {
      setLoadingFolders(prev => new Set(prev).add(folder.name))
      try {
        const firebaseImages = await getImagesFromFolder(folder.name)
        if (firebaseImages.length > 0) {
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
    <main className="min-h-screen bg-cream pt-32 lg:pt-40 pb-20 relative">
      {/* Layer 0 is the bg-cream above. Layer 1: page-wide texture overlay —
          sits above the cream but stays behind every photo and piece of content. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: TEXTURE_BACKGROUND,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          opacity: 0.85,
        }}
      />
      {/* Soft glossy sheen, same layer stack as the texture above the cream
          and behind all content. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.15) 48%, transparent 60%)',
          backgroundSize: '160% 160%',
          mixBlendMode: 'soft-light',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="section-label justify-center">Portfolio</p>
          <h1 className="section-title">
            A selection of <em className="text-rose">recent work.</em>
          </h1>
          <p className="font-sans text-text-mid text-lg mt-6">
            Each gathering tells a unique story. Click on any album to explore the photos.
          </p>
        </div>

        {/* Photo Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.map((folder, i) => (
            <div
              key={folder.id}
              onClick={() => openModal(folder)}
              className={`group cursor-pointer transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="relative mx-auto w-full max-w-[280px] aspect-[3/4] overflow-hidden mb-4 bg-ivory rounded-t-full">
                <img
                  src={folder.coverImage}
                  alt={folder.displayName ?? folder.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-cream font-sans text-xs tracking-[0.2em] uppercase border border-cream px-6 py-3">
                    View Photos
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-dark/60 text-cream text-xs px-3 py-1">
                  {folder.photos.length} {folder.photos.length === 1 ? 'photo' : 'photos'}
                </div>
                {loadingFolders.has(folder.name) && (
                  <div className="absolute inset-0 bg-dark/40 flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-cream" />
                  </div>
                )}
              </div>
              <div className="border-t border-midnight/10 pt-4 text-center">
                <h3 className="font-serif-sc text-2xl md:text-3xl font-semibold tracking-[0.06em] text-midnight">
                  {folder.displayName ?? folder.name}
                </h3>
                <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-coral mt-1.5">
                  View Gallery
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <span>Book a Consultation</span>
          </a>
          <a href="/" className="btn-text justify-center">
            Back to Home
          </a>
        </div>
      </div>

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
          <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm" />
          
          <div className={`relative bg-ivory max-w-5xl w-full max-h-[90dvh] overflow-hidden transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-20 p-2 bg-dark/10 hover:bg-dark/20 text-dark transition-colors">
              <X size={24} />
            </button>

            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-6">
              <h2 className="font-serif text-2xl md:text-3xl text-cream">{selectedFolder.displayName ?? selectedFolder.name}</h2>
              <p className="text-cream/60 text-sm mt-1">
                {currentPhotoIndex + 1} / {selectedFolder.photos.length}
              </p>
            </div>

            <div className="relative flex items-center justify-center bg-dark min-h-[60dvh] max-h-[80dvh]">
              {selectedFolder.photos.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); prevPhoto() }} className="absolute left-4 z-20 p-3 bg-cream/10 hover:bg-cream/20 text-cream transition-colors">
                  <ChevronLeft size={32} />
                </button>
              )}

              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={selectedFolder.photos[currentPhotoIndex]}
                  alt={`${selectedFolder.displayName ?? selectedFolder.name} - Photo ${currentPhotoIndex + 1}`}
                  className="max-w-full max-h-[70dvh] object-contain"
                />
              </div>

              {selectedFolder.photos.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); nextPhoto() }} className="absolute right-4 z-20 p-3 bg-cream/10 hover:bg-cream/20 text-cream transition-colors">
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {selectedFolder.photos.length > 1 && (
              <div className="bg-ivory p-4">
                <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                  {selectedFolder.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 overflow-hidden transition-all duration-200 ${
                        index === currentPhotoIndex 
                          ? 'ring-2 ring-midnight opacity-100' 
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

            {/* Book Button */}
            <div className="bg-ivory p-4 pt-0 flex justify-center">
              <a
                href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="btn-primary"
              >
                <span>Book a Consultation</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

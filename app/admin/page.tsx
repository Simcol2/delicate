'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { storage, uploadImage, getImagesFromFolder, deleteImage, auth } from '@/lib/firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import imageCompression from 'browser-image-compression'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { X, Upload, Trash2, GripVertical, Save, FolderPlus, Image as ImageIcon, AlertCircle, LogOut, Loader2, Cloud, HardDrive } from 'lucide-react'

interface PhotoItem {
  id: string
  name: string
  url: string
  fullPath: string
  title: string
  description: string
  source: 'firebase' | 'local'
}

// Actual folders - Themed Events and The Smoker are Firebase-only
const FOLDER_NAMES = [
  'Celebrations',
  'Cocktails',
  'Floral Arrangements',
  'Outdoor Soiree',
  'Weddings'
]

// Local images from public/Photo Slides (hardcoded for display)
const LOCAL_IMAGES: Record<string, {name: string, url: string}[]> = {
  'Celebrations': [
    { name: 'Delicate Flower-12.png', url: '/Photo Slides/Celebrations/Delicate Flower-12.png' },
    { name: 'Delicate Flower-14.png', url: '/Photo Slides/Celebrations/Delicate Flower-14.png' },
    { name: 'Delicate Flower-3-table setting1.png', url: '/Photo Slides/Celebrations/Delicate Flower-3-table setting1.png' },
    { name: 'Delicate Flower-3.png', url: '/Photo Slides/Celebrations/Delicate Flower-3.png' },
    { name: 'Delicate Flower-5-chrismtas.png', url: '/Photo Slides/Celebrations/Delicate Flower-5-chrismtas.png' },
    { name: 'Delicate Flower-6-table3.png', url: '/Photo Slides/Celebrations/Delicate Flower-6-table3.png' },
    { name: 'Delicate Flower-7.png', url: '/Photo Slides/Celebrations/Delicate Flower-7.png' },
    { name: 'IMG_5548.jpeg', url: '/Photo Slides/Celebrations/IMG_5548.jpeg' },
    { name: 'IMG_5714.jpg', url: '/Photo Slides/Celebrations/IMG_5714.jpg' },
    { name: 'IMG_5877.jpg', url: '/Photo Slides/Celebrations/IMG_5877.jpg' },
    { name: 'IMG_9435.jpg', url: '/Photo Slides/Celebrations/IMG_9435.jpg' },
  ],
  'Cocktails': [
    { name: 'DSC06742.JPEG', url: '/Photo Slides/Cocktails/DSC06742.JPEG' },
    { name: 'DSC06748.JPEG', url: '/Photo Slides/Cocktails/DSC06748.JPEG' },
  ],
  'Floral Arrangements': [
    { name: 'Delicate Flower-13.png', url: '/Photo Slides/Floral Arrangements/Delicate Flower-13.png' },
    { name: 'IMG_6169.jpg', url: '/Photo Slides/Floral Arrangements/IMG_6169.jpg' },
    { name: 'IMG_8300.jpg', url: '/Photo Slides/Floral Arrangements/IMG_8300.jpg' },
    { name: 'IMG_9442.jpg', url: '/Photo Slides/Floral Arrangements/IMG_9442.jpg' },
    { name: 'IMG_9479.jpg', url: '/Photo Slides/Floral Arrangements/IMG_9479.jpg' },
    { name: 'IMG_9480.jpg', url: '/Photo Slides/Floral Arrangements/IMG_9480.jpg' },
  ],
  'Outdoor Soiree': [
    { name: 'Delicate Flower-10.png', url: '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png' },
    { name: 'Delicate Flower-9-outdoor.png', url: '/Photo Slides/Outdoor Soiree/Delicate Flower-9-outdoor.png' },
  ],

  'Weddings': [
    { name: 'Delicate Flower-4-drink.png', url: '/Photo Slides/Weddings/Delicate Flower-4-drink.png' },
  ],
}

// Draggable Photo Component
function DraggablePhoto({ 
  photo, 
  index, 
  movePhoto, 
  updatePhoto, 
  deletePhoto 
}: { 
  photo: PhotoItem
  index: number
  movePhoto: (dragIndex: number, hoverIndex: number) => void
  updatePhoto: (id: string, updates: Partial<PhotoItem>) => void
  deletePhoto: (photo: PhotoItem) => void
}) {
  const [{ isDragging }, drag] = useDrag({
    type: 'PHOTO',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'PHOTO',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        movePhoto(item.index, index)
        item.index = index
      }
    },
  })

  const isLocal = photo.source === 'local'

  return (
    <div
      ref={(node: HTMLDivElement | null) => { drag(drop(node)) }}
      className={`bg-[#fffdf9] rounded-lg shadow-md overflow-hidden border border-[#e8d5b0] ${isDragging ? 'opacity-50' : 'opacity-100'} ${isLocal ? 'opacity-90' : ''}`}
    >
      <div className="relative aspect-[4/3]">
        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
        
        {/* Source Badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${
          isLocal ? 'bg-[#6b5b52] text-white' : 'bg-[#8f0e04] text-[#faf6f0]'
        }`}>
          {isLocal ? <HardDrive size={12} /> : <Cloud size={12} />}
          {isLocal ? 'Local' : 'Cloud'}
        </div>

        {!isLocal && (
          <button
            onClick={() => deletePhoto(photo)}
            className="absolute top-2 right-2 bg-[#8f0e04] text-[#faf6f0] p-1.5 rounded hover:bg-[#c9594a] transition-colors shadow"
          >
            <Trash2 size={16} />
          </button>
        )}
        
        {isLocal && (
          <div className="absolute top-2 right-2 bg-[#6b5b52] text-white px-2 py-1 rounded text-xs">
            Read-only
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="text-xs font-sans text-[#6b5b52] uppercase tracking-wider">Title</label>
          <input
            type="text"
            value={photo.title}
            onChange={(e) => !isLocal && updatePhoto(photo.id, { title: e.target.value })}
            disabled={isLocal}
            className={`w-full mt-1 px-3 py-2 bg-[#faf6f0] border border-[#e8d5b0] rounded text-[#2c2420] text-sm ${
              isLocal ? 'cursor-not-allowed opacity-70' : 'focus:outline-none focus:border-[#c9594a]'
            }`}
            placeholder="Photo title"
          />
        </div>
        {isLocal && (
          <p className="text-xs text-[#a89189] italic">
            Local images can&apos;t be edited here. Delete from the codebase directly.
          </p>
        )}
      </div>
    </div>
  )
}

// Login Component
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      await signInWithEmailAndPassword(auth, email, password)
      onLogin()
    } catch (err: any) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[#2c2420] mb-2">Admin Portal</h1>
          <p className="text-[#6b5b52] text-sm">Sign in to manage your experiences</p>
        </div>

        <div className="bg-[#fffdf9] p-8 border border-[#e8d5b0] shadow-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-[#6b5b52] uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#faf6f0] border border-[#e8d5b0] text-[#2c2420] focus:outline-none focus:border-[#c9594a]"
                placeholder="hello@delicateflowers.co"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#6b5b52] uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#faf6f0] border border-[#e8d5b0] text-[#2c2420] focus:outline-none focus:border-[#c9594a]"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#8f0e04] text-[#faf6f0] font-sans text-sm tracking-widest uppercase hover:bg-[#c9594a] transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#a89189] mt-6">
          <a href="/" className="text-[#c9594a] hover:underline">← Back to website</a>
        </p>
      </div>
    </div>
  )
}

// Main Dashboard Component
function AdminDashboard() {
  const router = useRouter()
  const [folders] = useState<string[]>(FOLDER_NAMES)
  const [selectedFolder, setSelectedFolder] = useState<string>('')
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const [firebaseCount, setFirebaseCount] = useState(0)
  const [localCount, setLocalCount] = useState(0)

  // Load photos when folder selected
  useEffect(() => {
    if (selectedFolder) {
      loadPhotos(selectedFolder)
    }
  }, [selectedFolder])

  const loadPhotos = async (folderName: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Load Firebase images
      const firebaseImages = await getImagesFromFolder(folderName)
      const firebasePhotos: PhotoItem[] = firebaseImages.map((img, index) => ({
        id: `firebase-${folderName}-${index}-${Date.now()}`,
        name: img.name,
        url: img.url,
        fullPath: img.fullPath,
        title: img.name.split('.')[0].replace(/-/g, ' '),
        description: '',
        source: 'firebase'
      }))

      // Load local images
      const localImages = LOCAL_IMAGES[folderName] || []
      const localPhotos: PhotoItem[] = localImages.map((img, index) => ({
        id: `local-${folderName}-${index}`,
        name: img.name,
        url: img.url,
        fullPath: img.url,
        title: img.name.split('.')[0].replace(/-/g, ' '),
        description: '',
        source: 'local'
      }))

      // Combine - Firebase first, then local
      const combinedPhotos = [...firebasePhotos, ...localPhotos]
      setPhotos(combinedPhotos)
      setFirebaseCount(firebasePhotos.length)
      setLocalCount(localPhotos.length)
    } catch (error) {
      console.error('Error loading photos:', error)
      setError('Failed to load photos. Please check your connection.')
    }
    
    setIsLoading(false)
    setHasChanges(false)
  }

  // Convert HEIC/HEIF to JPEG (dynamically import heic2any for client-side only)
  const convertHeicToJpg = async (file: File): Promise<File> => {
    const isHeic = file.type === 'image/heic' || 
                   file.type === 'image/heif' ||
                   file.name.toLowerCase().endsWith('.heic') ||
                   file.name.toLowerCase().endsWith('.heif')
    
    if (!isHeic) return file

    try {
      setUploadProgress(prev => prev + ' (converting HEIC...)')
      // Dynamic import - only runs on client
      const heic2any = (await import('heic2any')).default
      
      const blob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.9
      })
      
      // Create new file from blob
      const newFileName = file.name.replace(/\.heic$/i, '.jpg').replace(/\.heif$/i, '.jpg')
      return new File([blob as Blob], newFileName, { type: 'image/jpeg' })
    } catch (error) {
      console.error('HEIC conversion error:', error)
      throw new Error('Failed to convert HEIC image. Please convert manually and try again.')
    }
  }

  const compressImage = async (file: File): Promise<File> => {
    if (file.size < 500 * 1024) return file

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/jpeg',
      initialQuality: 0.8
    }
    
    try {
      return await imageCompression(file, options)
    } catch (error) {
      console.error('Compression error:', error)
      return file
    }
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    if (!selectedFolder) {
      setError('Please select a folder first')
      return
    }

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/') || 
      file.type === 'image/heic' || 
      file.type === 'image/heif' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif')
    )
    if (files.length === 0) {
      setError('Please drop image files only')
      return
    }

    await uploadFiles(files)
  }, [selectedFolder])

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true)
    setError(null)
    setUploadProgress(`Uploading 1/${files.length}...`)
    
    let successCount = 0
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setUploadProgress(`Uploading ${i + 1}/${files.length}: ${file.name}`)
      
      try {
        // First convert HEIC if needed, then compress
        const converted = await convertHeicToJpg(file)
        const compressed = await compressImage(converted)
        const timestamp = Date.now()
        const safeName = compressed.name.replace(/[^a-zA-Z0-9.-]/g, '-')
        const filename = `${timestamp}-${safeName}`
        const url = await uploadImage(compressed, selectedFolder, filename)
        
        const newPhoto: PhotoItem = {
          id: `firebase-${selectedFolder}-${photos.length + i}-${timestamp}`,
          name: filename,
          url,
          fullPath: `experiences/${selectedFolder}/${filename}`,
          title: file.name.split('.')[0].replace(/-/g, ' '),
          description: '',
          source: 'firebase'
        }
        
        setPhotos(prev => [...prev, newPhoto])
        successCount++
      } catch (error: any) {
        console.error('Upload error:', error)
        if (error.code === 'storage/unauthorized') {
          setError('Permission denied. Please check Firebase Storage rules.')
        } else {
          setError(`Failed to upload ${file.name}: ${error.message}`)
        }
      }
    }
    
    setIsUploading(false)
    setUploadProgress('')
    
    if (successCount > 0) {
      setHasChanges(true)
      setFirebaseCount(prev => prev + successCount)
      if (successCount === files.length) setError(null)
    }
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    await uploadFiles(files)
    e.target.value = ''
  }

  const movePhoto = (dragIndex: number, hoverIndex: number) => {
    const draggedPhoto = photos[dragIndex]
    // Only allow reordering Firebase photos
    if (draggedPhoto.source === 'local') return
    
    const newPhotos = [...photos]
    newPhotos.splice(dragIndex, 1)
    newPhotos.splice(hoverIndex, 0, draggedPhoto)
    setPhotos(newPhotos)
    setHasChanges(true)
  }

  const updatePhoto = (id: string, updates: Partial<PhotoItem>) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    setHasChanges(true)
  }

  const deletePhoto = async (photo: PhotoItem) => {
    if (photo.source === 'local') {
      setError('Local images cannot be deleted from the admin panel. Remove them from the codebase.')
      return
    }

    if (!confirm('Are you sure you want to delete this photo?')) return
    
    try {
      await deleteImage(photo.fullPath)
      setPhotos(prev => prev.filter(p => p.id !== photo.id))
      setFirebaseCount(prev => prev - 1)
      setHasChanges(true)
    } catch (error) {
      console.error('Error deleting:', error)
      setError('Failed to delete photo')
    }
  }

  const saveChanges = async () => {
    setIsSaving(true)
    setError(null)
    
    try {
      localStorage.setItem(`folder-${selectedFolder}-metadata`, JSON.stringify(photos.map(p => ({
        name: p.name,
        title: p.title,
        description: p.description
      }))))
      
      alert('Changes saved!')
      setHasChanges(false)
    } catch (error) {
      console.error('Error saving:', error)
      setError('Failed to save changes')
    }
    
    setIsSaving(false)
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#faf6f0]">
        {/* Header */}
        <header className="bg-[#8f0e04] text-[#faf6f0] py-6 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl">Admin Dashboard</h1>
              <p className="text-[#faf6f0]/70 text-sm mt-1">Manage your experiences</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-sm border border-[#faf6f0]/30 px-4 py-2 hover:bg-[#faf6f0]/10 transition-colors">
                View Site
              </a>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm border border-[#faf6f0]/30 px-4 py-2 hover:bg-[#faf6f0]/10 transition-colors">
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto"><X size={16} /></button>
            </div>
          )}

          {/* Folder Selection */}
          <div className="mb-8">
            <label className="text-sm font-sans text-[#6b5b52] uppercase tracking-wider block mb-3">
              Select Experience Folder
            </label>
            <div className="flex flex-wrap gap-3">
              {folders.map((folder) => (
                <button
                  key={folder}
                  onClick={() => setSelectedFolder(folder)}
                  className={`px-4 py-2 rounded-lg font-sans text-sm transition-all border ${
                    selectedFolder === folder
                      ? 'bg-[#8f0e04] text-[#faf6f0] border-[#8f0e04]'
                      : 'bg-[#fffdf9] border-[#e8d5b0] text-[#2c2420] hover:border-[#c9594a]'
                  }`}
                >
                  {folder}
                </button>
              ))}
            </div>
          </div>

          {selectedFolder && (
            <>
              {/* Stats */}
              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Cloud size={16} className="text-[#8f0e04]" />
                  <span className="text-[#6b5b52]">{firebaseCount} Firebase</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HardDrive size={16} className="text-[#6b5b52]" />
                  <span className="text-[#6b5b52]">{localCount} Local</span>
                </div>
              </div>

              {/* Upload Area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all mb-8 ${
                  dragOver 
                    ? 'border-[#c9a96e] bg-[#c9a96e]/5' 
                    : 'border-[#e8d5b0]'
                } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <Upload size={48} className="mx-auto mb-4 text-[#c9594a]" />
                
                {isUploading ? (
                  <div>
                    <Loader2 className="animate-spin h-8 w-8 text-[#8f0e04] mx-auto mb-2" />
                    <p className="text-[#2c2420]">{uploadProgress}</p>
                  </div>
                ) : (
                  <>
                    <p className="font-sans text-[#2c2420] mb-2">Drag & drop images here, or click to select</p>
                    <p className="text-sm text-[#6b5b52]">Supports JPG, PNG, GIF, WEBP, and HEIC (auto-converted to JPG)</p>
                  </>
                )}
                
                <input type="file" multiple accept="image/*,.heic,.heif" onChange={handleFileInput} disabled={isUploading} className="hidden" id="file-input" />
                <label htmlFor="file-input" className={`inline-block mt-4 px-6 py-2 bg-[#8f0e04] text-[#faf6f0] rounded cursor-pointer transition-colors ${isUploading ? 'opacity-50' : 'hover:bg-[#c9594a]'}`}>
                  {isUploading ? 'Uploading...' : 'Select Files'}
                </label>
              </div>

              {/* Photos Grid */}
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="animate-spin h-12 w-12 text-[#8f0e04] mx-auto mb-4" />
                  <p className="text-[#6b5b52]">Loading photos...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl text-[#2c2420]">Photos ({photos.length})</h2>
                    <p className="text-sm text-[#6b5b52]">Drag to reorder (Firebase only)</p>
                  </div>

                  {photos.length === 0 ? (
                    <div className="text-center py-16 bg-[#fffdf9] rounded-xl border-2 border-dashed border-[#e8d5b0]">
                      <ImageIcon size={48} className="mx-auto mb-4 text-[#c9a96e]" />
                      <p className="text-[#6b5b52]">No photos yet. Upload some!</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {photos.map((photo, index) => (
                        <DraggablePhoto
                          key={photo.id}
                          photo={photo}
                          index={index}
                          movePhoto={movePhoto}
                          updatePhoto={updatePhoto}
                          deletePhoto={deletePhoto}
                        />
                      ))}
                    </div>
                  )}

                  {/* Save Button */}
                  {hasChanges && (
                    <div className="fixed bottom-8 right-8">
                      <button
                        onClick={saveChanges}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#c9a96e] text-[#2c2420] rounded-lg shadow-lg hover:bg-[#e8d5b0] transition-colors disabled:opacity-50 font-medium"
                      >
                        <Save size={20} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {!selectedFolder && (
            <div className="text-center py-16">
              <FolderPlus size={64} className="mx-auto mb-4 text-[#c9a96e]" />
              <p className="text-[#6b5b52] text-lg">Select a folder above to manage photos</p>
              <p className="text-[#a89189] text-sm mt-2">Cloud icon = Firebase (editable) | Hard drive icon = Local (read-only)</p>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  )
}

// Main Export with Auth Check
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
    })
    return () => unsubscribe()
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-[#8f0e04]" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard />
}

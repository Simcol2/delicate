'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { storage, uploadImage, getImagesFromFolder, deleteImage, auth } from '@/lib/firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import imageCompression from 'browser-image-compression'
import heic2any from 'heic2any'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { X, Upload, Trash2, GripVertical, Save, FolderPlus, Image as ImageIcon, AlertCircle, LogOut, Loader2 } from 'lucide-react'

interface PhotoItem {
  id: string
  name: string
  url: string
  fullPath: string
  title: string
  description: string
}

// Actual folders from public/Photo Slides
const FOLDER_NAMES = [
  'Celebrations',
  'Cocktails',
  'Floral Arrangements',
  'Game Night',
  'Outdoor Soiree',
  'The Smoker',
  'Themed Events',
  'Weddings'
]

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

  return (
    <div
      ref={(node: HTMLDivElement | null) => { drag(drop(node)) }}
      className={`bg-[#fffdf9] rounded-lg shadow-md overflow-hidden border border-[#e8d5b0] ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="relative aspect-[4/3]">
        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 cursor-move bg-[#faf6f0]/90 p-1.5 rounded shadow">
          <GripVertical size={18} className="text-[#8f0e04]" />
        </div>
        <button
          onClick={() => deletePhoto(photo)}
          className="absolute top-2 right-2 bg-[#8f0e04] text-[#faf6f0] p-1.5 rounded hover:bg-[#c9594a] transition-colors shadow"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="text-xs font-sans text-[#6b5b52] uppercase tracking-wider">Title</label>
          <input
            type="text"
            value={photo.title}
            onChange={(e) => updatePhoto(photo.id, { title: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-[#faf6f0] border border-[#e8d5b0] rounded text-[#2c2420] focus:outline-none focus:border-[#c9594a] text-sm"
            placeholder="Photo title"
          />
        </div>
        <div>
          <label className="text-xs font-sans text-[#6b5b52] uppercase tracking-wider">Description</label>
          <textarea
            value={photo.description}
            onChange={(e) => updatePhoto(photo.id, { description: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-[#faf6f0] border border-[#e8d5b0] rounded text-[#2c2420] focus:outline-none focus:border-[#c9594a] resize-none text-sm"
            rows={2}
            placeholder="Brief description"
          />
        </div>
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
      const images = await getImagesFromFolder(folderName)
      const photoItems: PhotoItem[] = images.map((img, index) => ({
        id: `${folderName}-${index}-${Date.now()}`,
        name: img.name,
        url: img.url,
        fullPath: img.fullPath,
        title: img.name.split('.')[0].replace(/-/g, ' '),
        description: ''
      }))
      setPhotos(photoItems)
    } catch (error) {
      console.error('Error loading photos:', error)
      setError('Failed to load photos. Please check your connection.')
    }
    setIsLoading(false)
    setHasChanges(false)
  }

  // Convert HEIC/HEIF to JPEG
  const convertHeicToJpg = async (file: File): Promise<File> => {
    const isHeic = file.type === 'image/heic' || 
                   file.type === 'image/heif' ||
                   file.name.toLowerCase().endsWith('.heic') ||
                   file.name.toLowerCase().endsWith('.heif')
    
    if (!isHeic) return file

    try {
      setUploadProgress(prev => prev + ' (converting HEIC...)')
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
          id: `${selectedFolder}-${photos.length + i}-${timestamp}`,
          name: filename,
          url,
          fullPath: `experiences/${selectedFolder}/${filename}`,
          title: file.name.split('.')[0].replace(/-/g, ' '),
          description: ''
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
    if (!confirm('Are you sure you want to delete this photo?')) return
    
    try {
      await deleteImage(photo.fullPath)
      setPhotos(prev => prev.filter(p => p.id !== photo.id))
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
      
      alert('Changes saved! Images are already in Firebase.')
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
                    <p className="text-sm text-[#6b5b52]">Drag to reorder</p>
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

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-[#8f0e04]" />
      </div>
    )
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  // Show dashboard
  return <AdminDashboard />
}

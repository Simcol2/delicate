'use client'

import { useState, useEffect, useCallback } from 'react'
import { storage, uploadImage, getImagesFromFolder, deleteImage } from '@/lib/firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import imageCompression from 'browser-image-compression'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { X, Upload, Trash2, GripVertical, Save, FolderPlus, Image as ImageIcon, AlertCircle } from 'lucide-react'

interface PhotoItem {
  id: string
  name: string
  url: string
  fullPath: string
  title: string
  description: string
}

const FOLDER_NAMES = [
  'Backyard BBQ',
  'Christmas', 
  'Easter',
  'Game Night',
  'Outdoor Soiree',
  'Thanksgiving',
  'Weddings',
  'Wine & Cheese'
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
      className={`bg-white rounded-lg shadow-md overflow-hidden ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="relative aspect-[4/3]">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 cursor-move bg-white/80 p-1 rounded">
          <GripVertical size={20} className="text-[var(--plum-deep)]" />
        </div>
        <button
          onClick={() => deletePhoto(photo)}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="text-xs font-sans text-[var(--plum-deep)]/60 uppercase tracking-wider">Title</label>
          <input
            type="text"
            value={photo.title}
            onChange={(e) => updatePhoto(photo.id, { title: e.target.value })}
            className="w-full mt-1 px-3 py-2 border border-[var(--plum-deep)]/20 rounded focus:outline-none focus:border-[var(--gold-antique)]"
            placeholder="Photo title"
          />
        </div>
        <div>
          <label className="text-xs font-sans text-[var(--plum-deep)]/60 uppercase tracking-wider">Description</label>
          <textarea
            value={photo.description}
            onChange={(e) => updatePhoto(photo.id, { description: e.target.value })}
            className="w-full mt-1 px-3 py-2 border border-[var(--plum-deep)]/20 rounded focus:outline-none focus:border-[var(--gold-antique)] resize-none"
            rows={2}
            placeholder="Brief description"
          />
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [folders, setFolders] = useState<string[]>(FOLDER_NAMES)
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

  const compressImage = async (file: File): Promise<File> => {
    // Skip compression for small files
    if (file.size < 500 * 1024) {
      return file
    }

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/jpeg',
      initialQuality: 0.8
    }
    
    try {
      const compressedFile = await imageCompression(file, options)
      return compressedFile
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
      file.type.startsWith('image/')
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
        // Compress image
        const compressed = await compressImage(file)
        
        // Create filename
        const timestamp = Date.now()
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-')
        const filename = `${timestamp}-${safeName}`
        
        // Upload to Firebase
        const url = await uploadImage(compressed, selectedFolder, filename)
        
        // Add to local state
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
      if (successCount === files.length) {
        setError(null) // Clear error on full success
      }
    }
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    await uploadFiles(files)
    // Reset input
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
      // Save metadata to localStorage (or you could save to Firestore)
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[var(--white-pure)]">
        {/* Header */}
        <header className="bg-[var(--plum-deep)] text-white py-6 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl">Admin Dashboard</h1>
              <p className="text-white/60 text-sm mt-1">Manage your experiences</p>
            </div>
            <a 
              href="/" 
              className="text-sm border border-white/30 px-4 py-2 rounded hover:bg-white/10 transition-colors"
            >
              View Site
            </a>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto">
                <X size={16} />
              </button>
            </div>
          )}

          {/* Folder Selection */}
          <div className="mb-8">
            <label className="text-sm font-sans text-[var(--plum-deep)]/60 uppercase tracking-wider block mb-3">
              Select Experience Folder
            </label>
            <div className="flex flex-wrap gap-3">
              {folders.map((folder) => (
                <button
                  key={folder}
                  onClick={() => setSelectedFolder(folder)}
                  className={`px-4 py-2 rounded-lg font-sans text-sm transition-all ${
                    selectedFolder === folder
                      ? 'bg-[var(--plum-deep)] text-white'
                      : 'bg-white border border-[var(--plum-deep)]/20 text-[var(--plum-deep)] hover:border-[var(--gold-antique)]'
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
                    ? 'border-[var(--gold-antique)] bg-[var(--gold-antique)]/5' 
                    : 'border-[var(--plum-deep)]/20'
                } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <Upload size={48} className="mx-auto mb-4 text-[var(--plum-deep)]/40" />
                
                {isUploading ? (
                  <div>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--plum-deep)] mx-auto mb-2"></div>
                    <p className="text-[var(--plum-deep)]">{uploadProgress}</p>
                  </div>
                ) : (
                  <>
                    <p className="font-sans text-[var(--plum-deep)] mb-2">
                      Drag & drop images here, or click to select
                    </p>
                    <p className="text-sm text-[var(--plum-deep)]/50">
                      Images will be automatically compressed before upload
                    </p>
                  </>
                )}
                
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  disabled={isUploading}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className={`inline-block mt-4 px-6 py-2 bg-[var(--plum-deep)] text-white rounded cursor-pointer transition-colors ${
                    isUploading ? 'opacity-50' : 'hover:bg-[var(--plum-royal)]'
                  }`}
                >
                  {isUploading ? 'Uploading...' : 'Select Files'}
                </label>
              </div>

              {/* Photos Grid */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--plum-deep)] mx-auto"></div>
                  <p className="mt-4 text-[var(--plum-deep)]/60">Loading photos...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl text-[var(--plum-deep)]">
                      Photos ({photos.length})
                    </h2>
                    <p className="text-sm text-[var(--plum-deep)]/60">
                      Drag to reorder
                    </p>
                  </div>

                  {photos.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-[var(--plum-deep)]/20">
                      <ImageIcon size={48} className="mx-auto mb-4 text-[var(--plum-deep)]/20" />
                      <p className="text-[var(--plum-deep)]/60">No photos yet. Upload some!</p>
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
                        className="flex items-center gap-2 px-6 py-3 bg-[var(--gold-antique)] text-[var(--plum-deep)] rounded-lg shadow-lg hover:bg-[var(--gold-pale)] transition-colors disabled:opacity-50"
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
              <FolderPlus size={64} className="mx-auto mb-4 text-[var(--plum-deep)]/20" />
              <p className="text-[var(--plum-deep)]/60 text-lg">
                Select a folder above to manage photos
              </p>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  )
}

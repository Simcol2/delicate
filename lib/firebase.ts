import { initializeApp, getApps, getApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD4MQ7rLPoX5qk0EV4MWQ3VFuAVkMKZQsY",
  authDomain: "petals-5913d.firebaseapp.com",
  projectId: "petals-5913d",
  storageBucket: "petals-5913d.firebasestorage.app",
  messagingSenderId: "703000103151",
  appId: "1:703000103151:web:76788ac8f4f67ef908f31a",
  measurementId: "G-8X0CFX2HYZ"
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Analytics only runs on client side
export const getFirebaseAnalytics = () => {
  if (typeof window !== 'undefined') {
    return getAnalytics(app)
  }
  return null
}

// Upload image to Firebase Storage
export async function uploadImage(file: File, folder: string, filename: string) {
  const storageRef = ref(storage, `experiences/${folder}/${filename}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

// Get all images from a folder
export async function getImagesFromFolder(folder: string) {
  const folderRef = ref(storage, `experiences/${folder}`)
  try {
    const result = await listAll(folderRef)
    const items = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item)
        return {
          name: item.name,
          url,
          fullPath: item.fullPath
        }
      })
    )
    return items
  } catch (error) {
    console.error('Error fetching images:', error)
    return []
  }
}

// Delete an image
export async function deleteImage(fullPath: string) {
  const imageRef = ref(storage, fullPath)
  await deleteObject(imageRef)
}

// Get all experience folders
export async function getAllFolders() {
  const experiencesRef = ref(storage, 'experiences')
  try {
    const result = await listAll(experiencesRef)
    return result.prefixes.map(prefix => prefix.name)
  } catch (error) {
    console.error('Error fetching folders:', error)
    return []
  }
}

'use client'

import { useEffect } from 'react'

export default function PWARegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Unregister any old service workers first
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          console.log('Unregistering old SW:', registration)
          registration.unregister()
        })
      })
      
      // Register new service worker with cache-busting
      navigator.serviceWorker
        .register('/sw.js?v=2')
        .then((registration) => {
          console.log('SW registered:', registration)
          
          // Force reload when new SW is available
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                  console.log('New SW activated, reloading...')
                  window.location.reload()
                }
              })
            }
          })
        })
        .catch((error) => {
          console.log('SW registration failed:', error)
        })
    }
  }, [])

  return null
}

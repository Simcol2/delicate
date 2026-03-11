'use client'

import { useState } from 'react'
import Navbar from '@/components/navigation/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Gallery from '@/components/sections/Gallery'
import DesignerModal from '@/components/ui/DesignerModal'
import ContactModal from '@/components/ui/ContactModal'

export default function Page() {
  const [isDesignerModalOpen, setIsDesignerModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main>
        {/* Shared background wrapper for Hero + About + Services */}
        <div className="relative">
          {/* Background image that spans all three sections */}
          <div 
            className="fixed inset-0 w-full h-full -z-10 sm:bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/Gemini_Generated_Image_7pemq97pemq97pem.png)',
            }}
          />
          
          <Hero 
            onOpenDesigner={() => setIsDesignerModalOpen(true)} 
            onOpenContact={() => setIsContactModalOpen(true)}
          />
          <About />
          <Services onOpenContact={() => setIsContactModalOpen(true)} />
        </div>
        
        <Gallery onOpenContact={() => setIsContactModalOpen(true)} />
      </main>

      {/* Meet the Designer Modal */}
      <DesignerModal 
        isOpen={isDesignerModalOpen} 
        onClose={() => setIsDesignerModalOpen(false)} 
      />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  )
}

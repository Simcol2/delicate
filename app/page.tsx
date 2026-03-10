'use client'

import { useState } from 'react'
import Navbar from '@/components/navigation/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'
import DesignerModal from '@/components/ui/DesignerModal'

export default function Page() {
  const [isDesignerModalOpen, setIsDesignerModalOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main>
        {/* Shared background wrapper for Hero + About + Services */}
        <div className="relative">
          {/* Background image that spans all three sections */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url(/images/Gemini_Generated_Image_ffk17uffk17uffk1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundAttachment: 'fixed',
            }}
          />
          
          <Hero onOpenDesigner={() => setIsDesignerModalOpen(true)} />
          <About />
          <Services />
        </div>
        
        <Gallery />
        <Contact />
      </main>

      {/* Meet the Designer Modal */}
      <DesignerModal 
        isOpen={isDesignerModalOpen} 
        onClose={() => setIsDesignerModalOpen(false)} 
      />
    </>
  )
}

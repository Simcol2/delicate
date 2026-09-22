'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navigation/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Gallery from '@/components/sections/Gallery'
import DesignerModal from '@/components/ui/DesignerModal'
import ContactModal from '@/components/ui/ContactModal'
import Footer from '@/components/footer/Footer'

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
              backgroundImage: 'url(/images/hero-bg-optimized.jpg)',
            }}
          />

          <Hero
            onOpenDesigner={() => setIsDesignerModalOpen(true)}
            onOpenContact={() => setIsContactModalOpen(true)}
          />

          {/* Decorative birds divider */}
          <div className="relative z-20 bg-[#F8F3E9] flex justify-center items-center py-7 lg:py-10">
            <img
              src="/images/3-birds.png"
              alt="Decorative gold birds"
              className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[175px] h-auto object-contain"
            />
          </div>

          <About />

          <Services
            onOpenContact={() => setIsContactModalOpen(true)}
          />
        </div>

        <Gallery
          onOpenContact={() => setIsContactModalOpen(true)}
        />
      </main>

      <Footer />

      <DesignerModal
        isOpen={isDesignerModalOpen}
        onClose={() => setIsDesignerModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  )
}

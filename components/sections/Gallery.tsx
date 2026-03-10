'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Only 3 gallery items displayed on homepage
const galleryItems = [
  { id: 1, title: 'Sunset Soiree', image: '/Photo Slides/Outdoor Soiree/Delicate Flower-10.png' },
  { id: 2, title: 'Christmas Eve', image: '/Photo Slides/Christmas/Delicate Flower-5-chrismtas.png' },
  { id: 3, title: 'Game Night', image: '/Photo Slides/Game Night/Delicate Flower-11.png' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.children
      if (!items) return

      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-32 lg:py-40 bg-[#fffdf9]"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between max-w-7xl mx-auto mb-16">
          <div>
            <span className="text-[#c9594a] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
              Portfolio
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[#2c2420] leading-tight">
              Recent
              <br />
              <span className="text-[#c9594a]">Experiences</span>
            </h2>
          </div>
          <p className="font-sans text-[#6b5b52] text-lg max-w-md mt-6 lg:mt-0">
            Each gathering tells a unique story. Here&apos;s a glimpse into 
            the moments we&apos;ve helped create.
          </p>
        </div>

        {/* Gallery Grid - Only 3 cards in one row */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg aspect-[4/5]"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#8f0e04]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-2xl text-[#faf6f0]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Experiences Button */}
        <div className="text-center mt-16">
          <a
            href="/experiences"
            className="inline-block px-10 py-4 border-2 border-[#8f0e04] text-[#8f0e04] font-sans text-sm tracking-widest uppercase hover:bg-[#8f0e04] hover:text-[#faf6f0] transition-all duration-300"
          >
            View Experiences
          </a>
        </div>
      </div>
    </section>
  )
}

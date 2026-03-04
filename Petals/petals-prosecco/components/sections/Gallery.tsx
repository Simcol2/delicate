'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  { id: 1, title: 'Desert Sunset Dinner', category: 'Intimate Gathering' },
  { id: 2, title: 'Spring Brunch', category: 'Daytime Event' },
  { id: 3, title: 'Anniversary Celebration', category: 'Private Dinner' },
  { id: 4, title: 'Wine & Roses', category: 'Wine Tasting' },
  { id: 5, title: 'Golden Hour Soirée', category: 'Evening Event' },
  { id: 6, title: 'Garden Party', category: 'Outdoor Dining' },
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
      className="py-32 lg:py-40 bg-[var(--white-pure)]"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between max-w-7xl mx-auto mb-16">
          <div>
            <span className="text-[var(--gold-antique)] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
              Portfolio
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[var(--navy-midnight)] leading-tight">
              Recent
              <br />
              <span className="text-[var(--gold-antique)]">Experiences</span>
            </h2>
          </div>
          <p className="font-sans text-[var(--navy-midnight)]/70 text-lg max-w-md mt-6 lg:mt-0">
            Each gathering tells a unique story. Here's a glimpse into 
            the moments we've helped create.
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden ${
                index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              } ${index === 2 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
            >
              <div className={`aspect-[4/5] bg-[var(--plum-royal)]/10 relative overflow-hidden ${
                index === 2 ? 'lg:aspect-auto lg:h-full' : ''
              }`}>
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-[var(--plum-royal)]/30 font-serif text-xl">
                  {item.title}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-[var(--plum-deep)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[var(--gold-antique)] text-xs tracking-[0.3em] uppercase font-sans mb-2">
                      {item.category}
                    </p>
                    <h3 className="font-serif text-2xl text-[var(--blush-warm)]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-16">
          <button className="px-10 py-4 border border-[var(--navy-midnight)] text-[var(--navy-midnight)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--navy-midnight)] hover:text-[var(--white-pure)] transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}

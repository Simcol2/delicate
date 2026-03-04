'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)

      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      })

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Add hover detection for interactive elements
    const handleElementHover = () => setIsHovering(true)
    const handleElementLeave = () => setIsHovering(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Attach hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover)
      el.addEventListener('mouseleave', handleElementLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [])

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border border-[var(--gold-antique)] transition-all duration-300 ${
            isHovering ? 'w-16 h-16 border-opacity-100' : 'w-10 h-10 border-opacity-50'
          }`}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-[var(--gold-antique)] transition-all duration-300 ${
            isHovering ? 'w-1 h-1 opacity-0' : 'w-2 h-2 opacity-100'
          }`}
        />
      </div>
    </>
  )
}

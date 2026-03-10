'use client'

import { useRef, useState, ReactNode } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export default function MagneticButton({ children, className = '', onClick, href }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const button = buttonRef.current
    if (!button) return

    setIsHovered(false)
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const commonProps = {
    ref: buttonRef as any,
    className: `magnetic-button ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onClick,
  }

  if (href) {
    return (
      <a href={href} {...commonProps}>
        <span className={`block transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
          {children}
        </span>
      </a>
    )
  }

  return (
    <button {...commonProps}>
      <span className={`block transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
        {children}
      </span>
    </button>
  )
}

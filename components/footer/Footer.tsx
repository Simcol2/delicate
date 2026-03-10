'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#2c2420] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div className="text-[var(--gold-antique)] font-serif text-xl tracking-wide">
          Delicate Flowers
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a 
            href="/terms" 
            className="text-[#a89189] text-sm hover:text-[var(--gold-antique)] transition-colors duration-200"
          >
            Terms of Service
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[#6b5b52] text-sm">
          {currentYear} Delicate Flowers. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

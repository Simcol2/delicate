import Navbar from '@/components/navigation/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        {/* Shared background wrapper for Hero + About */}
        <div className="relative">
          {/* Background image that spans both sections */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url(/images/Gemini_Generated_Image_s25wmts25wmts25w.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundAttachment: 'fixed',
            }}
          />
          
          <Hero />
          <About />
        </div>
        
        <Services />
        <Gallery />
        <Contact />
      </main>
    </>
  )
}

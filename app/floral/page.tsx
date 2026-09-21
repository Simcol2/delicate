import Link from 'next/link'
import { Metadata } from 'next'
import { Navbar } from '@/components/navigation/Navbar'
import Footer from '@/components/footer/Footer'
import { ShoppingCart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fresh Bouquets & Floral Arrangements | Delicate Flowers',
  description: 'Shop our collection of hand-arranged fresh flower bouquets. Premium floral arrangements for every occasion - weddings, celebrations, and more. Free delivery available.',
  keywords: 'fresh flowers, bouquets, floral arrangements, wedding flowers, celebration flowers, delivery',
  openGraph: {
    title: 'Fresh Bouquets & Floral Arrangements | Delicate Flowers',
    description: 'Shop our collection of hand-arranged fresh flower bouquets.',
    type: 'website',
  },
}

export interface Bouquet {
  id: string
  name: string
  description: string
  category: string
  price: number
  image: string
  available: number
}

export const bouquets: Bouquet[] = [
  {
    id: 'blush-romance',
    name: 'Blush Romance',
    description: 'Soft pink peonies and garden roses with delicate greenery. Perfect for romantic occasions.',
    category: 'ARRANGEMENT',
    price: 85,
    available: 3,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Blush Peony Rose.jpg'
  },
  {
    id: 'garden-harvest',
    name: 'Garden Harvest',
    description: 'Vibrant mixed florals with sunflowers, gerberas, and roses. A celebration in bloom.',
    category: 'ARRANGEMENT',
    price: 75,
    available: 2,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Sunflower Gerbera.jpg'
  },
  {
    id: 'jeweled-elegance',
    name: 'Jeweled Elegance',
    description: 'Rich jewel tones in an elegant vase arrangement. Sophisticated and timeless.',
    category: 'ARRANGEMENT',
    price: 95,
    available: 1,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Jeweled Goblet Vases.jpg'
  },
  {
    id: 'citrus-bliss',
    name: 'Citrus Bliss',
    description: 'Warm citrus and gold tones with premium roses. Brightens any space beautifully.',
    category: 'ARRANGEMENT',
    price: 80,
    available: 4,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Lime Citrus Roses.jpg'
  },
  {
    id: 'rose-cascade',
    name: 'Rose Cascade',
    description: 'Cascading arrangement of premium red roses. A classic expression of elegance.',
    category: 'ARRANGEMENT',
    price: 90,
    available: 2,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Red Rose Cluster.jpg'
  },
  {
    id: 'silver-hydrangea',
    name: 'Silver Hydrangea',
    description: 'Elegant blue hydrangea in a modern silver vase. Contemporary and striking.',
    category: 'ARRANGEMENT',
    price: 70,
    available: 5,
    image: '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Silver Vase Hydrangea.jpg'
  }
]

export default function FloralPage() {

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header Bar */}
      <div className="bg-[#1B5E4F] text-center py-3 mt-20">
        <p className="text-white font-sans text-xs tracking-[0.2em] uppercase">
          Fresh Bouquets For Every Occasion
        </p>
      </div>

      {/* Page Title */}
      <div className="bg-white px-6 py-12">
        <h1 className="font-serif-sc text-5xl md:text-6xl text-[#1B5E4F] text-center tracking-[0.08em]">
          Bouquets
        </h1>
        <p className="text-center text-[#666] font-sans text-sm mt-4 max-w-2xl mx-auto">
          Hand-arranged fresh flower bouquets for every occasion. Each arrangement is carefully crafted to perfection.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-20">
        {/* Bouquets Grid - 2x2 or 2 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {bouquets.map((bouquet) => (
            <Link
              key={bouquet.id}
              href={`/floral/${bouquet.id}`}
              className="group"
            >
              <div className="bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl shadow-md hover:scale-105 cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={bouquet.image}
                    alt={bouquet.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[#999] font-sans text-xs tracking-[0.15em] uppercase mb-2">
                    {bouquet.category}
                  </p>
                  <h3 className="font-serif text-3xl text-[#1B5E4F] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {bouquet.name}
                  </h3>
                  <p className="text-[#666] font-sans text-sm mb-4 flex-1">
                    {bouquet.available} available
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <p className="text-[#D4AF37] font-sans text-sm font-semibold tracking-[0.1em]">
                      ${bouquet.price}
                    </p>
                    <span className="text-[#1B5E4F] font-sans text-xs font-semibold tracking-[0.1em] uppercase group-hover:text-[#D4AF37] transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>


      <Footer />
    </main>
  )
}

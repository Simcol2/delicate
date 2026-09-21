export interface Bouquet {
  id: string
  name: string
  shortDescription: string
  description: string
  category: string
  price: number
  image: string
  available: number
  squareCatalogItemId?: string
  squareVariationId?: string
}

export const bouquets: Bouquet[] = [
  {
    id: 'blush-romance',
    name: 'Blush Romance',
    shortDescription:
      'Soft garden roses, lush peonies and seasonal greenery in a romantic, modern arrangement.',
    description:
      'Soft pink peonies and garden roses layered with delicate seasonal greenery. An elegant floral arrangement designed for dinner tables, intimate celebrations, gifting and special occasions.',
    category: 'ARRANGEMENT',
    price: 85,
    available: 3,
    image:
      '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Blush Peony Rose.jpg',
    squareCatalogItemId: '',
    squareVariationId: '',
  },
  {
    id: 'garden-harvest',
    name: 'Garden Harvest',
    shortDescription:
      'A vibrant mix of seasonal blooms inspired by the natural beauty of the desert.',
    description:
      'A vibrant seasonal arrangement featuring sunflowers, gerberas, roses and lush greenery. Warm, expressive and designed to bring colour to the table.',
    category: 'ARRANGEMENT',
    price: 75,
    available: 2,
    image:
      '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Sunflower Gerbera.jpg',
    squareCatalogItemId: '',
    squareVariationId: '',
  },
  {
    id: 'jeweled-elegance',
    name: 'Jeweled Elegance',
    shortDescription:
      'Rich jewel tones arranged with a sophisticated, collected feel.',
    description:
      'Rich jewel-toned florals arranged in an elegant vessel for a dramatic, sophisticated statement.',
    category: 'ARRANGEMENT',
    price: 95,
    available: 1,
    image:
      '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Jeweled Goblet Vases.jpg',
    squareCatalogItemId: '',
    squareVariationId: '',
  },
  {
    id: 'citrus-bliss',
    name: 'Citrus Bliss',
    shortDescription:
      'Warm citrus and golden tones with premium roses and seasonal texture.',
    description:
      'Warm citrus, gold and garden tones come together in a bright arrangement designed for entertaining and celebration.',
    category: 'ARRANGEMENT',
    price: 80,
    available: 4,
    image:
      '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Lime Citrus Roses.jpg',
    squareCatalogItemId: '',
    squareVariationId: '',
  },
  {
    id: 'rose-cascade',
    name: 'Rose Cascade',
    shortDescription:
      'A sculptural arrangement of premium red roses with timeless drama.',
    description:
      'A dramatic arrangement of premium red roses designed as a modern interpretation of a classic floral statement.',
    category: 'ARRANGEMENT',
    price: 90,
    available: 2,
    image:
      '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Red Rose Cluster.jpg',
    squareCatalogItemId: '',
    squareVariationId: '',
  },
  {
    id: 'silver-hydrangea',
    name: 'Silver Hydrangea',
    shortDescription:
      'Timeless hydrangea and textural greenery for a refined modern statement.',
    description:
      'Elegant hydrangea arranged with textural greenery in a modern silver vessel. Sophisticated, clean and designed to sit beautifully within a styled table or interior.',
    category: 'ARRANGEMENT',
    price: 70,
    available: 5,
    image:
      '/Photo Slides/Floral Arrangements/Delicate Flower-Floral Arrangements-Silver Vase Hydrangea.jpg',
    squareCatalogItemId: '',
    squareVariationId: '',
  },
]

export function getBouquetById(id: string) {
  return bouquets.find((bouquet) => bouquet.id === id)
}

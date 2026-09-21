import type { MetadataRoute } from 'next'
import { bouquets } from '@/lib/floral'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://delicateflowers.co'

  const floralPages = bouquets.map((bouquet) => ({
    url: `${baseUrl}/floral/${bouquet.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/floral`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...floralPages,
  ]
}

import type { MetadataRoute } from 'next'
import { bouquets } from '@/lib/floral'
import { SITE_URL, SITEMAP_ROUTES } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages = SITEMAP_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const floralPages = bouquets.map((bouquet) => ({
    url: `${SITE_URL}/floral/${bouquet.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...corePages, ...floralPages]
}

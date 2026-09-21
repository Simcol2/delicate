export interface FloralVariation {
  id: string
  name: string
  price: number | null
  priceAmount: number | null
  currency: string
}

export interface FloralCatalogItem {
  id: string
  name: string
  description: string
  descriptionHtml: string
  image: string | null
  imageAlt: string
  category: {
    id: string
    name: string
  }
  variations: FloralVariation[]
}

export interface FloralCatalog {
  category: {
    id: string
    name: string
  }
  items: FloralCatalogItem[]
}

export function slugifyFloralName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function floralProductHref(
  item: Pick<FloralCatalogItem, 'id' | 'name'>
) {
  return `/floral/${slugifyFloralName(item.name)}--${encodeURIComponent(item.id)}`
}

export function squareIdFromRouteParam(routeParam: string) {
  const parts = decodeURIComponent(routeParam).split('--')
  return parts[parts.length - 1]
}

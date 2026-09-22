import 'server-only'

import type {
  FloralCatalog,
  FloralCatalogItem,
  FloralVariation,
} from '@/lib/floralCatalogShared'

export type {
  FloralCatalog,
  FloralCatalogItem,
  FloralVariation,
} from '@/lib/floralCatalogShared'

export {
  floralProductHref,
  slugifyFloralName,
  squareIdFromRouteParam,
} from '@/lib/floralCatalogShared'

const SQUARE_API_URL = 'https://connect.squareup.com/v2'
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID
const SQUARE_VERSION = '2026-09-16'

type RawSquareObject = {
  type?: string
  id: string
  is_deleted?: boolean
  present_at_all_locations?: boolean
  present_at_location_ids?: string[]
  absent_at_location_ids?: string[]
  image_data?: {
    name?: string
    url?: string
    caption?: string
  }
  category_data?: {
    name?: string
    category_type?: string
  }
  item_data?: {
    name?: string
    description?: string
    description_html?: string
    image_ids?: string[]
    categories?: Array<{ id: string }>
    variations?: Array<{
      id: string
      item_variation_data?: {
        name?: string
        image_ids?: string[]
        price_money?: {
          amount?: number
          currency?: string
        }
      }
    }>
  }
}

function squareHeaders() {
  if (!SQUARE_ACCESS_TOKEN) {
    throw new Error('Missing SQUARE_ACCESS_TOKEN.')
  }

  return {
    'Square-Version': SQUARE_VERSION,
    Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

function htmlToPlainText(html?: string) {
  if (!html) return ''

  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .trim()
}

function isAvailableAtLocation(object: RawSquareObject) {
  if (!SQUARE_LOCATION_ID) return true

  if (object.present_at_all_locations) {
    return !(object.absent_at_location_ids || []).includes(SQUARE_LOCATION_ID)
  }

  const present = object.present_at_location_ids || []
  return present.length === 0 || present.includes(SQUARE_LOCATION_ID)
}

async function findCategory(categoryName: string) {
  let cursor: string | undefined
  const target = categoryName.trim().toLowerCase()

  do {
    const url = new URL(`${SQUARE_API_URL}/catalog/list`)
    url.searchParams.set('types', 'CATEGORY')

    if (cursor) {
      url.searchParams.set('cursor', cursor)
    }

    const response = await fetch(url.toString(), {
      headers: squareHeaders(),
      cache: 'no-store',
    })

    if (!response.ok) {
      const details = await response.text()
      throw new Error(
        `Square category request failed (${response.status}): ${details}`
      )
    }

    const data = await response.json()
    const categories: RawSquareObject[] = data.objects || []

    const match = categories.find((category) => {
      const name = category.category_data?.name?.trim().toLowerCase()
      const type = category.category_data?.category_type

      return (
        !category.is_deleted &&
        name === target &&
        (!type || type === 'REGULAR_CATEGORY')
      )
    })

    if (match) return match

    cursor = data.cursor
  } while (cursor)

  return null
}

async function searchItems(categoryId: string) {
  const items: RawSquareObject[] = []
  let cursor: string | undefined

  do {
    const response = await fetch(
      `${SQUARE_API_URL}/catalog/search-catalog-items`,
      {
        method: 'POST',
        headers: squareHeaders(),
        cache: 'no-store',
        body: JSON.stringify({
          category_ids: [categoryId],
          enabled_location_ids: SQUARE_LOCATION_ID
            ? [SQUARE_LOCATION_ID]
            : undefined,
          archived_state: 'ARCHIVED_STATE_NOT_ARCHIVED',
          sort_order: 'ASC',
          limit: 100,
          ...(cursor ? { cursor } : {}),
        }),
      }
    )

    if (!response.ok) {
      const details = await response.text()
      throw new Error(
        `Square item request failed (${response.status}): ${details}`
      )
    }

    const data = await response.json()

    for (const item of data.items || []) {
      if (
        item.type === 'ITEM' &&
        !item.is_deleted &&
        isAvailableAtLocation(item)
      ) {
        items.push(item)
      }
    }

    cursor = data.cursor
  } while (cursor)

  return items
}

async function loadImages(imageIds: string[]) {
  const uniqueIds = [...new Set(imageIds)].filter(Boolean)

  if (uniqueIds.length === 0) {
    return new Map<string, { url: string; caption?: string }>()
  }

  const imageMap = new Map<string, { url: string; caption?: string }>()

  for (let index = 0; index < uniqueIds.length; index += 100) {
    const batch = uniqueIds.slice(index, index + 100)

    const response = await fetch(`${SQUARE_API_URL}/catalog/batch-retrieve`, {
      method: 'POST',
      headers: squareHeaders(),
      cache: 'no-store',
      body: JSON.stringify({
        object_ids: batch,
        include_related_objects: false,
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      throw new Error(
        `Square image request failed (${response.status}): ${details}`
      )
    }

    const data = await response.json()
    const objects: RawSquareObject[] = data.objects || []

    for (const object of objects) {
      if (object.type === 'IMAGE' && object.image_data?.url) {
        imageMap.set(object.id, {
          url: object.image_data.url,
          caption: object.image_data.caption,
        })
      }
    }
  }

  return imageMap
}

async function buildCatalog(
  categoryName: string
): Promise<FloralCatalog> {
  if (!SQUARE_ACCESS_TOKEN) {
    throw new Error('Square API is not configured. Missing SQUARE_ACCESS_TOKEN.')
  }

  const category = await findCategory(categoryName)

  if (!category) {
    return {
      category: {
        id: '',
        name: categoryName,
      },
      items: [],
    }
  }

  const rawItems = await searchItems(category.id)

  const allImageIds = rawItems.flatMap((item) => {
    const itemIds = item.item_data?.image_ids || []
    const variationIds =
      item.item_data?.variations?.flatMap(
        (variation) => variation.item_variation_data?.image_ids || []
      ) || []

    return [...itemIds, ...variationIds]
  })

  const imageMap = await loadImages(allImageIds)

  const items: FloralCatalogItem[] = rawItems.map((item) => {
    const data = item.item_data || {}

    const descriptionHtml = data.description_html || ''
    const description =
      data.description?.trim() || htmlToPlainText(descriptionHtml)

    const itemImageIds = data.image_ids || []
    const firstVariationImageIds =
      data.variations?.flatMap(
        (variation) => variation.item_variation_data?.image_ids || []
      ) || []

    const primaryImageId =
      itemImageIds.find((id) => imageMap.has(id)) ||
      firstVariationImageIds.find((id) => imageMap.has(id))

    const imageData = primaryImageId
      ? imageMap.get(primaryImageId)
      : undefined

    const variations: FloralVariation[] = (data.variations || []).map(
      (variation) => {
        const variationData = variation.item_variation_data || {}
        const priceMoney = variationData.price_money || {}

        return {
          id: variation.id,
          name: variationData.name || 'Regular',
          price:
            typeof priceMoney.amount === 'number'
              ? priceMoney.amount / 100
              : null,
          priceAmount: priceMoney.amount ?? null,
          currency: priceMoney.currency || 'USD',
        }
      }
    )

    return {
      id: item.id,
      name: data.name || '',
      description,
      descriptionHtml,
      image: imageData?.url || null,
      imageAlt: imageData?.caption || data.name || 'Floral arrangement',
      category: {
        id: category.id,
        name: category.category_data?.name || categoryName,
      },
      variations,
    }
  })

  return {
    category: {
      id: category.id,
      name: category.category_data?.name || categoryName,
    },
    items,
  }
}

export async function getFloralCatalog() {
  return buildCatalog('floral')
}

export async function getFeaturedCatalog() {
  return buildCatalog('features')
}

export async function getFloralItemById(id: string) {
  const floral = await getFloralCatalog()
  const floralMatch = floral.items.find((item) => item.id === id)

  if (floralMatch) return floralMatch

  // Allows a featured item to still open correctly even if it was only
  // assigned to the Square "features" category.
  const features = await getFeaturedCatalog()
  return features.items.find((item) => item.id === id) || null
}

import { NextResponse } from 'next/server'

const SQUARE_API_URL = 'https://connect.squareup.com/v2'
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID
const SQUARE_VERSION = '2026-09-16'
const TARGET_CATEGORY = 'floral'

type SquareObject = {
  type?: string
  id: string
  is_deleted?: boolean
  present_at_all_locations?: boolean
  present_at_location_ids?: string[]
  absent_at_location_ids?: string[]
  category_data?: {
    name?: string
    category_type?: string
  }
  item_data?: {
    name?: string
    description?: string
    description_html?: string
    categories?: Array<{ id: string }>
    variations?: Array<{
      id: string
      item_variation_data?: {
        name?: string
        price_money?: {
          amount?: number
          currency?: string
        }
      }
    }>
  }
}

function squareHeaders() {
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
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .trim()
}

function isAvailableAtLocation(object: SquareObject) {
  if (!SQUARE_LOCATION_ID) return true

  if (object.present_at_all_locations) {
    return !(object.absent_at_location_ids || []).includes(SQUARE_LOCATION_ID)
  }

  const present = object.present_at_location_ids || []
  return present.length === 0 || present.includes(SQUARE_LOCATION_ID)
}

async function findFloralCategory() {
  let cursor: string | undefined

  do {
    const url = new URL(`${SQUARE_API_URL}/catalog/list`)
    url.searchParams.set('types', 'CATEGORY')
    if (cursor) url.searchParams.set('cursor', cursor)

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
    const categories: SquareObject[] = data.objects || []

    const match = categories.find((category) => {
      const name = category.category_data?.name?.trim().toLowerCase()
      const type = category.category_data?.category_type

      return (
        !category.is_deleted &&
        name === TARGET_CATEGORY.toLowerCase() &&
        (!type || type === 'REGULAR_CATEGORY')
      )
    })

    if (match) return match

    cursor = data.cursor
  } while (cursor)

  return null
}

async function getItemsForCategory(categoryId: string) {
  const items: SquareObject[] = []
  let cursor: string | undefined

  do {
    const response = await fetch(`${SQUARE_API_URL}/catalog/search-catalog-items`, {
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
    })

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

export async function GET() {
  try {
    if (!SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          error: 'Square API is not configured.',
          details: 'Missing SQUARE_ACCESS_TOKEN.',
        },
        { status: 500 }
      )
    }

    const category = await findFloralCategory()

    if (!category) {
      return NextResponse.json(
        {
          error: 'Square category not found.',
          details:
            'Create a Square catalog category named "floral" and assign the floral products you want displayed on the website to that category.',
          category: TARGET_CATEGORY,
          items: [],
        },
        { status: 404 }
      )
    }

    const squareItems = await getItemsForCategory(category.id)

    const items = squareItems.map((item) => {
      const data = item.item_data || {}

      const descriptionHtml = data.description_html || ''
      const description =
        data.description?.trim() || htmlToPlainText(descriptionHtml)

      const variations = (data.variations || []).map((variation) => {
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
      })

      return {
        id: item.id,
        name: data.name || '',
        description,
        descriptionHtml,
        category: {
          id: category.id,
          name: category.category_data?.name || TARGET_CATEGORY,
        },
        variations,
      }
    })

    return NextResponse.json({
      category: {
        id: category.id,
        name: category.category_data?.name || TARGET_CATEGORY,
      },
      count: items.length,
      items,
    })
  } catch (error) {
    console.error('Square catalog API error:', error)

    return NextResponse.json(
      {
        error: 'Failed to load Square floral catalog.',
        details:
          error instanceof Error ? error.message : 'Unknown Square API error',
      },
      { status: 500 }
    )
  }
}

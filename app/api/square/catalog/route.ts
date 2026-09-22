import { NextResponse } from 'next/server'
import crypto from 'crypto'

const SQUARE_API_URL = 'https://connect.squareup.com/v2'
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID
const SQUARE_VERSION = '2026-09-16'

export async function POST(request: Request) {
  try {
    const { customerId, lineItems } = await request.json()

    if (
      !customerId ||
      !Array.isArray(lineItems) ||
      lineItems.length === 0
    ) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: 'customerId and at least one line item are required.',
        },
        { status: 400 }
      )
    }

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      return NextResponse.json(
        {
          error: 'Square API not configured',
          details:
            'SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID must be configured.',
        },
        { status: 500 }
      )
    }

    const squareLineItems = lineItems.map((item: any) => {
      const quantity = String(item.quantity || '1')

      // Real Square catalog product.
      // Let Square populate the product name and catalog price from the variation.
      if (item.squareVariationId) {
        return {
          quantity,
          catalog_object_id: item.squareVariationId,
        }
      }

      // Fallback for an ad hoc item if no Square variation ID is available.
      if (
        !item.name ||
        !item.basePriceMoney ||
        typeof item.basePriceMoney.amount !== 'number'
      ) {
        throw new Error(
          `Line item "${item.name || 'Unnamed item'}" is missing a Square variation ID or valid price.`
        )
      }

      return {
        name: item.name,
        quantity,
        base_price_money: {
          amount: item.basePriceMoney.amount,
          currency: item.basePriceMoney.currency || 'USD',
        },
        note: 'Floral arrangement',
      }
    })

    const orderResponse = await fetch(`${SQUARE_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Square-Version': SQUARE_VERSION,
        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        order: {
          location_id: SQUARE_LOCATION_ID,
          customer_id: customerId,
          line_items: squareLineItems,
          reference_id: `FLORAL_${Date.now()}`,
          note: 'Delicate Flowers online floral shop order',
        },
      }),
    })

    const responseData = await orderResponse.json().catch(() => null)

    if (!orderResponse.ok) {
      const squareDetails =
        responseData?.errors
          ?.map((error: any) => error.detail || error.code)
          .filter(Boolean)
          .join(' | ') || `Square returned HTTP ${orderResponse.status}`

      console.error(
        'Square order creation error:',
        orderResponse.status,
        responseData
      )

      return NextResponse.json(
        {
          error: 'Failed to create order',
          details: squareDetails,
          squareErrors: responseData?.errors || [],
        },
        { status: orderResponse.status }
      )
    }

    return NextResponse.json({
      orderId: responseData.order.id,
      totalMoney: responseData.order.total_money,
      message: 'Order created successfully',
    })
  } catch (error: any) {
    console.error('Square orders API error:', error)

    return NextResponse.json(
      {
        error: 'Failed to create order',
        details: error?.message || 'Unknown order error',
      },
      { status: 500 }
    )
  }
}

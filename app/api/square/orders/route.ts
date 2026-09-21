import { NextResponse } from 'next/server'

const SQUARE_API_URL = 'https://connect.squareup.com/v2'
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID

export async function POST(request: Request) {
  try {
    const { customerId, lineItems, total } = await request.json()

    if (!customerId || !lineItems || !total) {
      return NextResponse.json(
        { error: 'Missing required fields: customerId, lineItems, total' },
        { status: 400 }
      )
    }

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      return NextResponse.json(
        { error: 'Square API not configured' },
        { status: 500 }
      )
    }

    // Create order in Square
    const orderResponse = await fetch(`${SQUARE_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location_id: SQUARE_LOCATION_ID,
        customer_id: customerId,
        line_items: lineItems.map((item: any) => {
          const lineItem: any = {
            name: item.name,
            quantity: item.quantity,
            base_price_money: item.basePriceMoney,
            note: 'Floral arrangement'
          }
          if (item.squareVariationId) {
            lineItem.catalog_object_id = item.squareVariationId
          }
          return lineItem
        }),
        reference_id: `ORDER_${Date.now()}`,
        note: 'Online floral shop order'
      })
    })

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text()
      console.error('Square order creation error:', orderResponse.status, errorText)
      throw new Error(`Failed to create order: ${orderResponse.status}`)
    }

    const orderData = await orderResponse.json()
    console.log('Order created in Square:', orderData.order.id)

    return NextResponse.json({
      orderId: orderData.order.id,
      totalMoney: orderData.order.total_money,
      message: 'Order created successfully'
    })

  } catch (error: any) {
    console.error('Square orders API error:', error)
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'

const SQUARE_API_URL = 'https://connect.squareup.com/v2'
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const customerEmail = searchParams.get('email')

    console.log('Request email:', customerEmail)
    console.log('Token exists:', !!SQUARE_ACCESS_TOKEN)
    console.log('Token length:', SQUARE_ACCESS_TOKEN?.length)

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Customer email is required' },
        { status: 400 }
      )
    }

    if (!SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Square API not configured' },
        { status: 500 }
      )
    }

    // Search for customer by email
    const customerResponse = await fetch(`${SQUARE_API_URL}/customers/search`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          filter: {
            email_address: {
              exact: customerEmail
            }
          }
        }
      })
    })

    if (!customerResponse.ok) {
      const errorText = await customerResponse.text()
      console.error('Square customer search error:', customerResponse.status, errorText)
      throw new Error(`Failed to fetch customer from Square: ${customerResponse.status}`)
    }

    const customerData = await customerResponse.json()
    console.log('Customer search result:', customerData.customers ? `Found ${customerData.customers.length} customers` : 'No customers found')

    if (!customerData.customers || customerData.customers.length === 0) {
      console.log('No customer found with email:', customerEmail)
      return NextResponse.json({ invoices: [] })
    }

    const customerId = customerData.customers[0].id

    // Fetch invoices for this customer
    const invoicesResponse = await fetch(`${SQUARE_API_URL}/invoices?customer_id=${customerId}&location_id=${SQUARE_LOCATION_ID}`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    })

    if (!invoicesResponse.ok) {
      const errorText = await invoicesResponse.text()
      console.error('Square invoices error:', invoicesResponse.status, errorText)
      throw new Error(`Failed to fetch invoices from Square: ${invoicesResponse.status}`)
    }

    const invoicesData = await invoicesResponse.json()

    // Format invoices for frontend
    const formattedInvoices = invoicesData.invoices?.map((invoice: any) => ({
      id: invoice.id,
      invoiceNumber: invoice.invoice_number || invoice.id,
      amount: (invoice.payment_requests?.[0]?.computed_amount_money?.amount || 0) / 100,
      status: invoice.status === 'PAID' ? 'PAID' : 'UNPAID',
      dueDate: invoice.payment_requests?.[0]?.due_date,
      description: invoice.order_id ? 'Event Services' : 'Delicate Flowers Services',
      squareUrl: invoice.public_url || '#'
    })) || []

    return NextResponse.json({ invoices: formattedInvoices })

  } catch (error: any) {
    console.error('Square API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoices', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { orderId, customerId, email } = await request.json()

    if (!orderId || !customerId) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId, customerId' },
        { status: 400 }
      )
    }

    if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
      return NextResponse.json(
        { error: 'Square API not configured' },
        { status: 500 }
      )
    }

    // Create invoice from order
    const invoiceResponse = await fetch(`${SQUARE_API_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invoice: {
          location_id: SQUARE_LOCATION_ID,
          customer_id: customerId,
          order_id: orderId,
          payment_requests: [
            {
              request_type: 'BALANCE',
              due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              automatic_payment_source: 'CARD_ON_FILE'
            }
          ],
          delivery_method: 'EMAIL',
          email_address: email,
          note: 'Floral arrangement order. Thank you for your purchase!'
        }
      })
    })

    if (!invoiceResponse.ok) {
      const errorText = await invoiceResponse.text()
      console.error('Square invoice creation error:', invoiceResponse.status, errorText)
      throw new Error(`Failed to create invoice: ${invoiceResponse.status}`)
    }

    const invoiceData = await invoiceResponse.json()
    console.log('Invoice created in Square:', invoiceData.invoice.id)

    // Publish invoice to send to customer
    const publishResponse = await fetch(`${SQUARE_API_URL}/invoices/${invoiceData.invoice.id}/publish`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: invoiceData.invoice.version
      })
    })

    if (!publishResponse.ok) {
      const errorText = await publishResponse.text()
      console.error('Square invoice publish error:', publishResponse.status, errorText)
      throw new Error(`Failed to publish invoice: ${publishResponse.status}`)
    }

    const publishedData = await publishResponse.json()
    console.log('Invoice published:', publishedData.invoice.id)

    return NextResponse.json({
      invoiceId: publishedData.invoice.id,
      paymentLink: publishedData.invoice.public_url,
      message: 'Invoice created and sent to customer'
    })

  } catch (error: any) {
    console.error('Square invoices POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice', details: error.message },
      { status: 500 }
    )
  }
}

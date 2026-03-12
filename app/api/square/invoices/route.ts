import { NextResponse } from 'next/server'

const SQUARE_API_URL = 'https://connect.squareup.com/v2'
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN

export async function GET(request: Request) {
  try {
    console.log('Square API Environment:', SQUARE_ENVIRONMENT)
    console.log('Square API URL:', SQUARE_API_URL)
    console.log('Token exists:', !!SQUARE_ACCESS_TOKEN)
    
    const { searchParams } = new URL(request.url)
    const customerEmail = searchParams.get('email')

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
    
    if (!customerData.customers || customerData.customers.length === 0) {
      return NextResponse.json({ invoices: [] })
    }

    const customerId = customerData.customers[0].id

    // Fetch invoices for this customer
    const invoicesResponse = await fetch(`${SQUARE_API_URL}/invoices?customer_id=${customerId}`, {
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

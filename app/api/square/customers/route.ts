import { NextResponse } from 'next/server'

const SQUARE_API_URL = 'https://connect.squareup.com/v2'
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN

export async function POST(request: Request) {
  try {
    const { email, givenName, familyName, phoneNumber } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Square API not configured' },
        { status: 500 }
      )
    }

    // First, search if customer already exists
    const searchResponse = await fetch(`${SQUARE_API_URL}/customers/search`, {
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
              exact: email
            }
          }
        }
      })
    })

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text()
      console.error('Square customer search error:', searchResponse.status, errorText)
      throw new Error(`Failed to search customer: ${searchResponse.status}`)
    }

    const searchData = await searchResponse.json()
    
    // If customer already exists, return their ID
    if (searchData.customers && searchData.customers.length > 0) {
      console.log('Customer already exists in Square:', searchData.customers[0].id)
      return NextResponse.json({ 
        customerId: searchData.customers[0].id,
        created: false,
        message: 'Customer already exists'
      })
    }

    // Create new customer in Square
    const createResponse = await fetch(`${SQUARE_API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        given_name: givenName || email.split('@')[0],
        family_name: familyName || '',
        phone_number: phoneNumber || '',
        note: 'Created via Client Portal signup'
      })
    })

    if (!createResponse.ok) {
      const errorText = await createResponse.text()
      console.error('Square customer creation error:', createResponse.status, errorText)
      throw new Error(`Failed to create customer: ${createResponse.status}`)
    }

    const createData = await createResponse.json()
    console.log('Customer created in Square:', createData.customer.id)

    return NextResponse.json({ 
      customerId: createData.customer.id,
      created: true,
      message: 'Customer created successfully'
    })

  } catch (error: any) {
    console.error('Square customer API error:', error)
    return NextResponse.json(
      { error: 'Failed to create customer', details: error.message },
      { status: 500 }
    )
  }
}

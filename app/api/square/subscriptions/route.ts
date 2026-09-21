import { NextRequest, NextResponse } from 'next/server'

const SQUARE_API_URL = 'https://connect.squareup.com/v2'
const SQUARE_VERSION = '2026-09-16'

export const dynamic = 'force-dynamic'

async function squareFetch(path: string, options: RequestInit = {}) {
  const token = process.env.SQUARE_ACCESS_TOKEN

  if (!token) {
    throw new Error('SQUARE_ACCESS_TOKEN is missing')
  }

  return fetch(`${SQUARE_API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Square-Version': SQUARE_VERSION,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    cache: 'no-store',
  })
}

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // 1. Find this client in Square by email
    const customerResponse = await squareFetch('/customers/search', {
      method: 'POST',
      body: JSON.stringify({
        query: {
          filter: {
            email_address: {
              exact: email,
            },
          },
        },
      }),
    })

    const customerData = await customerResponse.json()

    if (!customerResponse.ok) {
      console.error('Square customer search error:', customerData)

      return NextResponse.json(
        { error: 'Could not search Square customer' },
        { status: customerResponse.status }
      )
    }

    const customer = customerData.customers?.[0]

    // No Square customer yet
    if (!customer) {
      return NextResponse.json({
        hasSubscription: false,
        subscriptions: [],
      })
    }

    // 2. Search subscriptions belonging to this customer
    const subscriptionResponse = await squareFetch('/subscriptions/search', {
      method: 'POST',
      body: JSON.stringify({
        query: {
          filter: {
            customer_ids: [customer.id],
          },
        },
      }),
    })

    const subscriptionData = await subscriptionResponse.json()

    if (!subscriptionResponse.ok) {
      console.error('Square subscription error:', subscriptionData)

      return NextResponse.json(
        { error: 'Could not load subscriptions' },
        { status: subscriptionResponse.status }
      )
    }

    const subscriptions = subscriptionData.subscriptions || []

    const usableSubscriptions = subscriptions
      .filter((subscription: any) =>
        ['ACTIVE', 'PAUSED', 'PENDING'].includes(subscription.status)
      )
      .map((subscription: any) => ({
        id: subscription.id,
        status: subscription.status,
        startDate: subscription.start_date,
        chargedThroughDate: subscription.charged_through_date,
        paidUntilDate: subscription.paid_until_date,
        planVariationId: subscription.plan_variation_id,
        invoiceIds: subscription.invoice_ids || [],
      }))

    return NextResponse.json({
      hasSubscription: usableSubscriptions.length > 0,
      subscriptions: usableSubscriptions,
    })
  } catch (error) {
    console.error('Subscription lookup error:', error)

    return NextResponse.json(
      { error: 'Could not load subscription information' },
      { status: 500 }
    )
  }
}

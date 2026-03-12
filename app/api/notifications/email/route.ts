import { NextResponse } from 'next/server'

// Using EmailJS for notifications
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'service_ajiko7e'
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'template_pl9ghk7'
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'JibkW5e7TBEs2vKc0'

export async function POST(request: Request) {
  try {
    const { to, toName, subject, message, type } = await request.json()

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email using EmailJS REST API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: to,
          to_name: toName || to.split('@')[0],
          from_name: 'Delicate Flowers Client Portal',
          subject: subject || 'New Message from Delicate Flowers',
          message: message,
          reply_to: 'april@delicateflowers.co'
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('EmailJS error:', errorText)
      throw new Error('Failed to send email notification')
    }

    return NextResponse.json({ success: true, message: 'Notification sent' })

  } catch (error: any) {
    console.error('Notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send notification', details: error.message },
      { status: 500 }
    )
  }
}

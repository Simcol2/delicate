import { NextResponse } from 'next/server';

// Using Resend for email delivery
// Sign up at https://resend.com and get your API key
// Add RESEND_API_KEY to your Vercel environment variables

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'hello@delicateflowers.co';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, eventType, date, venueName, venueLocation, guestSize, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If Resend API key is configured, send email
    if (RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Delicate Flowers <onboarding@resend.dev>',
          to: TO_EMAIL,
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Event Type:</strong> ${eventType || 'Not specified'}</p>
            <p><strong>Event Date:</strong> ${date || 'Not specified'}</p>
            <p><strong>Venue Name:</strong> ${venueName || 'Not specified'}</p>
            <p><strong>Venue Location:</strong> ${venueLocation || 'Not specified'}</p>
            <p><strong>Guest Size:</strong> ${guestSize || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
          reply_to: email,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Resend API error:', error);
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    }

    // If no API key, just log the submission (for testing)
    console.log('Contact form submission:', {
      name,
      email,
      eventType,
      date,
      venueName,
      venueLocation,
      guestSize,
      message,
      to: TO_EMAIL,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully (email not sent - configure RESEND_API_KEY)' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

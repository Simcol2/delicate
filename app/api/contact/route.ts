import { NextResponse } from 'next/server';

// Using Resend for email delivery
// Sign up at https://resend.com and get your API key
// Add RESEND_API_KEY to your Vercel environment variables

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'april@delicateflowers.co';

export async function POST(request: Request) {
  console.log('API called - RESEND_API_KEY exists:', !!RESEND_API_KEY);
  
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    
    const { name, email, phoneNumber, eventType, date, location, guestSize, message, referredBy } = body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing required fields:', { name, email, message });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If Resend API key is configured, send email
    if (RESEND_API_KEY) {
      console.log('Attempting to send email via Resend...');
      
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
            <p><strong>Phone Number:</strong> ${phoneNumber || 'Not specified'}</p>
            <p><strong>Event Type:</strong> ${eventType || 'Not specified'}</p>
            <p><strong>Event Date:</strong> ${date || 'Not specified'}</p>
            <p><strong>Location:</strong> ${location || 'Not specified'}</p>
            <p><strong>Guest Size:</strong> ${guestSize || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <p><strong>Referred By:</strong> ${referredBy || 'Not specified'}</p>
          `,
          reply_to: email,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Resend API error:', error);
        return NextResponse.json(
          { error: 'Failed to send email', details: error },
          { status: 500 }
        );
      }

      const data = await response.json();
      console.log('Email sent successfully:', data);

      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    }

    // If no API key, return error so user knows to configure it
    console.error('RESEND_API_KEY not configured - email not sent');
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Email service not configured. Please add RESEND_API_KEY to environment variables.' 
      },
      { status: 503 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

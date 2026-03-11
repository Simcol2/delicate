// This API route is no longer needed - using EmailJS client-side instead
// Kept for backwards compatibility

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json(
    { 
      error: 'Please use the contact form which now uses EmailJS directly',
      message: 'The form submission should be handled client-side'
    },
    { status: 200 }
  );
}

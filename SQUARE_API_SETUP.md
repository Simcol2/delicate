# Square API Setup Guide

## Overview
This guide explains how to connect the Delicate Flowers client portal to Square for invoice and contract management.

## What You'll Need

### 1. Square Developer Account
- Go to [https://developer.squareup.com/](https://developer.squareup.com/)
- Sign in with your existing Square account or create a new one

### 2. Create a Square Application
1. In the Square Developer Dashboard, click "Create Application"
2. Name it "Delicate Flowers Portal"
3. Note down the **Application ID**

### 3. Get Your Access Token
1. In your application dashboard, go to "Credentials"
2. Choose the environment:
   - **Sandbox** - For testing (recommended first)
   - **Production** - For live customer data
3. Copy the **Access Token** (starts with `sq0atp-` for sandbox or `sq0atp-` for production)

### 4. Environment Variables
Add these to your deployment platform (Vercel, Netlify, etc.):

```env
SQUARE_ACCESS_TOKEN=sq0atp-your-token-here
SQUARE_ENVIRONMENT=sandbox  # Change to 'production' when ready
```

## How It Works

### Client Portal Flow
1. Client logs in with email/password (Firebase Auth)
2. System searches Square for customer by email
3. If found, displays:
   - All invoices for that customer
   - Payment status (Paid/Unpaid)
   - Links to pay via Square
   - Contract status

### Square Invoice Integration
- Invoices created in Square automatically appear in client portal
- Clients click "Pay Now" to go to Square's secure payment page
- Payment status syncs back to portal

## Setting Up a Client

### Step 1: Create Customer in Square
1. Go to Square Dashboard > Customers
2. Click "Create Customer"
3. Enter client's email (must match their portal login email)
4. Add name and phone
5. Save

### Step 2: Create Invoice
1. Go to Square Dashboard > Invoices
2. Click "Create Invoice"
3. Select the customer you just created
4. Add line items (packages, add-ons)
5. Set payment schedule (deposit, final payment)
6. Send invoice (client will get email)

### Step 3: Create Client Login
1. Go to your website's admin page (/admin)
2. Create new user with SAME email as Square customer
3. Set temporary password
4. Share login credentials with client

## Client Portal Features

### For Clients:
- View all invoices and payment status
- Click to pay outstanding invoices
- View signed/pending contracts
- See event details and balance due

### For You (Admin):
- Create invoices in Square (appears automatically in portal)
- Track which clients have viewed/paid
- Send contracts via Square for e-signature
- All payment processing handled by Square

## Important Notes

### Terms of Service Integration
- Clients must accept Terms of Service before booking
- Terms page is at `/terms`
- Consider adding a checkbox in the booking process:
  - "I have read and agree to the Terms of Service"
  - Link to `/terms` page

### Security
- Never commit `SQUARE_ACCESS_TOKEN` to git
- Use environment variables only
- Square handles all PCI compliance for payments

### Testing
1. Use Sandbox mode first
2. Create test customers and invoices
3. Use Square's test credit card numbers:
   - Card: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3 digits
   - ZIP: Any 5 digits

## Troubleshooting

### Client can't see invoices
- Verify email in Square matches portal login email exactly
- Check that invoices are published (not drafts)
- Ensure customer exists in Square

### Payment link not working
- Check that invoice is published in Square
- Verify `public_url` is generated
- Ensure invoice hasn't expired

### API errors
- Verify `SQUARE_ACCESS_TOKEN` is correct
- Check that environment (sandbox/production) matches token type
- Ensure token hasn't expired

## Next Steps After Setup

Once you provide the `SQUARE_ACCESS_TOKEN`, I will:
1. Update the API routes to fetch real data
2. Add error handling
3. Test the integration
4. Add any missing features

## Support

Square Developer Documentation: [https://developer.squareup.com/docs](https://developer.squareup.com/docs)
Square API Reference: [https://developer.squareup.com/reference/square](https://developer.squareup.com/reference/square)

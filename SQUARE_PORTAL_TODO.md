# Square API & Client Portal - TODO List

This document tracks what still needs to be done to complete the Square API integration and Client Portal functionality.

---

## ✅ COMPLETED

### Infrastructure
- [x] Firebase Authentication setup for client logins
- [x] Client login page (`/client/login`)
- [x] Client dashboard page (`/client/dashboard`)
- [x] API route structure (`/api/square/invoices`)
- [x] Terms of Service page (`/terms`)
- [x] Admin portal for photo management (`/admin`)

### UI Components
- [x] Invoice display with status (Paid/Unpaid)
- [x] "Pay Now" links to Square
- [x] Terms of Service notice on dashboard
- [x] Contract placeholder section
- [x] Logout functionality

---

## ⏳ PENDING SETUP

### 1. Square API Credentials (REQUIRED)

**Status:** Waiting for April to provide

**What you need to do:**
1. Go to [https://developer.squareup.com/](https://developer.squareup.com/)
2. Sign in with your Square account
3. Create a new application called "Delicate Flowers Portal"
4. Get your **Sandbox Access Token** (for testing)
5. Get your **Production Access Token** (for live)
6. Add to Vercel environment variables:
   ```
   SQUARE_ACCESS_TOKEN=sq0atp-your-token-here
   SQUARE_ENVIRONMENT=sandbox  # Change to 'production' when ready
   ```

**Why this matters:** Without the access token, the client portal cannot fetch invoices from Square.

---

### 2. Create Clients in Square (PER CLIENT)

**Status:** Must be done for each new client

**What you need to do:**
1. In Square Dashboard, go to **Customers**
2. Click **Create Customer**
3. Enter client's email (must match their portal login email exactly)
4. Add name and phone number
5. Save

**Why this matters:** The portal searches Square by email. If the customer doesn't exist in Square, no invoices will appear.

---

### 3. Create Client Logins in Firebase (PER CLIENT)

**Status:** Must be done for each new client

**What you need to do:**
1. Go to `/admin` on your website
2. Sign in with your admin credentials
3. Create a new user with the SAME email as the Square customer
4. Set a temporary password
5. Share login credentials with the client

**Alternative:** Use Firebase Console Authentication to create users manually.

**Why this matters:** Clients need Firebase Auth accounts to access the portal.

---

### 4. Create Invoices in Square (PER EVENT)

**Status:** Must be done for each event

**What you need to do:**
1. In Square Dashboard, go to **Invoices**
2. Click **Create Invoice**
3. Select the customer you created
4. Add line items (packages, add-ons)
5. Set payment schedule (deposit, final payment)
6. **Important:** Publish the invoice (not just save as draft)
7. The invoice will automatically appear in the client's portal

**Why this matters:** Only published invoices with a public URL will appear in the portal.

---

### 5. Contract Integration (OPTIONAL ENHANCEMENT)

**Status:** Not yet implemented

**Current state:** The dashboard shows a "Contracts" section but it's empty/hardcoded.

**Options to implement:**

#### Option A: Square Contracts API
- Square has a Contracts API for e-signatures
- Requires additional API integration
- Clients can sign contracts digitally

#### Option B: DocuSign Integration
- More robust contract management
- Better tracking and reminders
- Additional cost

#### Option C: Manual Upload
- Upload PDF contracts to Firebase Storage
- Display download links in portal
- Manual tracking of signatures

**Recommendation:** Start with Option C (manual) for now, upgrade to Square Contracts later.

---

## 🔧 KNOWN ISSUES & FIXES

### Issue 1: API Route Dynamic Server Error
**Error:** `Dynamic server usage: Route /api/square/invoices couldn't be rendered statically`

**Impact:** Build warning, but API still works

**Fix:** The route is marked as dynamic (`ƒ` in build output), which is correct. No action needed.

---

### Issue 2: No Client Creation UI
**Current state:** You must manually create Firebase users for clients

**Workaround:** Use Firebase Console or add user creation to `/admin` page

**Future enhancement:** Add a "Create Client" form in the admin portal

---

### Issue 3: Invoice Sync is Real-time Only
**Current state:** Invoices are fetched when dashboard loads

**Limitation:** Clients must refresh to see new invoices

**Future enhancement:** Add polling or webhooks for real-time updates

---

## 🚀 TESTING CHECKLIST

Before going live, test this flow:

1. [ ] Create test customer in Square
2. [ ] Create test invoice in Square ($1.00 amount)
3. [ ] Create Firebase user with same email
4. [ ] Log into client portal at `/client/login`
5. [ ] Verify invoice appears
6. [ ] Click "Pay Now" and verify it goes to Square
7. [ ] Pay with test card: `4111 1111 1111 1111`
8. [ ] Refresh portal and verify status shows "Paid"

---

## 📋 DEPLOYMENT CHECKLIST

When ready to go live:

1. [ ] Switch to Production Square environment
2. [ ] Update `SQUARE_ENVIRONMENT=production` in Vercel
3. [ ] Update `SQUARE_ACCESS_TOKEN` to production token
4. [ ] Verify all existing clients are in both Square and Firebase
5. [ ] Test one real invoice flow end-to-end
6. [ ] Add Terms of Service checkbox to booking process (optional)

---

## 🎯 RECOMMENDED NEXT STEPS (Priority Order)

### High Priority
1. **Get Square Access Token** - Portal won't work without this
2. **Test the full flow** - Create one test client and invoice
3. **Document the process** - Create a runbook for onboarding new clients

### Medium Priority
4. **Add client creation to admin** - Easier than Firebase Console
5. **Contract PDF uploads** - Manual system for now
6. **Email notifications** - Notify clients when new invoices are added

### Low Priority
7. **Real-time invoice updates** - Webhook or polling
8. **Payment history** - Show all past payments, not just current invoices
9. **Event details page** - Show date, location, package details
10. **Mobile app** - PWA or native app for easier access

---

## 🆘 TROUBLESHOOTING

### Client can't see invoices
- Check: Email in Square matches Firebase login email (case-sensitive)
- Check: Invoice is published (not draft)
- Check: `SQUARE_ACCESS_TOKEN` is set in Vercel
- Check: Token hasn't expired

### Payment link doesn't work
- Check: Invoice has `public_url` generated
- Check: Invoice hasn't expired
- Check: Client is using correct Square environment (sandbox vs production)

### Can't log in
- Check: Client exists in Firebase Authentication
- Check: Email and password are correct
- Check: Firebase Auth is enabled in console

---

## 📞 SUPPORT RESOURCES

- **Square Developer Docs:** https://developer.squareup.com/docs
- **Square API Reference:** https://developer.squareup.com/reference/square
- **Firebase Auth Docs:** https://firebase.google.com/docs/auth
- **Vercel Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables

---

*Last updated: March 2026*

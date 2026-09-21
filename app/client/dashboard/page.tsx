'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MessagesPanel from '@/components/client/MessagesPanel'
import {
  FileText,
  CreditCard,
  LogOut,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Flower2,
  ArrowRight,
} from 'lucide-react'

interface Invoice {
  id: string
  invoiceNumber: string
  amount: string
  status:
    | 'PAID'
    | 'UNPAID'
    | 'PARTIALLY_PAID'
    | 'CANCELED'
    | string
  squareUrl: string
  dueDate?: string
}

interface Contract {
  id: string
  name: string
  status: string
  url?: string
}

interface Subscription {
  id: string
  status: string
  startDate?: string
  chargedThroughDate?: string
  paidUntilDate?: string
  planVariationId?: string
  invoiceIds?: string[]
}

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)

  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  const [loading, setLoading] = useState(true)
  const [subscriptionLoading, setSubscriptionLoading] = useState(true)

  const [invoiceError, setInvoiceError] = useState('')
  const [subscriptionError, setSubscriptionError] = useState('')

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/client/login')
        setLoading(false)
        return
      }

      setUser(currentUser)

      const email = currentUser.email

      if (!email) {
        setInvoiceError('We could not find an email address for this account.')
        setSubscriptionError(
          'We could not check your floral subscription.'
        )
        setLoading(false)
        setSubscriptionLoading(false)
        return
      }

      /*
       * INVOICES
       */
      try {
        const response = await fetch(
          `/api/square/invoices?email=${encodeURIComponent(email)}`,
          {
            cache: 'no-store',
          }
        )

        if (response.ok) {
          const data = await response.json()
          setInvoices(data.invoices || [])
        } else {
          setInvoiceError('We could not load your payments right now.')
        }
      } catch (error) {
        console.error('Invoice fetch error:', error)
        setInvoiceError('We could not connect to the payment system.')
      }

      /*
       * SUBSCRIPTIONS
       */
      try {
        const response = await fetch(
          `/api/square/subscriptions?email=${encodeURIComponent(email)}`,
          {
            cache: 'no-store',
          }
        )

        if (response.ok) {
          const data = await response.json()

          setSubscriptions(data.subscriptions || [])
        } else {
          setSubscriptionError(
            'We could not check your floral subscription right now.'
          )
        }
      } catch (error) {
        console.error('Subscription fetch error:', error)

        setSubscriptionError(
          'We could not check your floral subscription right now.'
        )
      } finally {
        setSubscriptionLoading(false)
      }

      /*
       * CONTRACTS
       *
       * Your current portal already has the contract display section,
       * but the Square Contracts API connection has not been added yet.
       *
       * When we connect that route, it can simply call:
       *
       * setContracts(data.contracts || [])
       */

      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/client/login')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID':
        return <CheckCircle className="w-4 h-4 text-sage" />

      case 'UNPAID':
        return <Clock className="w-4 h-4 text-rose" />

      default:
        return <AlertCircle className="w-4 h-4 text-text-light" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'Paid'

      case 'UNPAID':
        return 'Payment Due'

      case 'PARTIALLY_PAID':
        return 'Partially Paid'

      case 'CANCELED':
        return 'Canceled'

      default:
        return formatStatus(status)
    }
  }

  const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  }

  const formatDate = (date?: string) => {
    if (!date) return ''

    /*
     * Square may return dates such as 2026-10-02.
     * Adding the time keeps the browser from shifting the date
     * because of timezone conversion.
     */
    const parsedDate = date.includes('T')
      ? new Date(date)
      : new Date(`${date}T12:00:00`)

    return parsedDate.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const activeSubscriptions = subscriptions.filter((subscription) =>
    ['ACTIVE', 'PAUSED', 'PENDING'].includes(subscription.status)
  )

  const hasSubscription = activeSubscriptions.length > 0

  const displayName =
    user?.displayName ||
    user?.email?.split('@')[0] ||
    'there'

  /*
   * LOADING SCREEN
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-cream pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-midnight/20 rounded w-1/3 mx-auto mb-4" />

            <div className="h-4 bg-midnight/20 rounded w-1/2 mx-auto" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <span className="text-midnight text-xs tracking-[0.3em] uppercase font-sans block mb-2">
              Welcome back
            </span>

            <h1 className="font-serif text-3xl md:text-4xl text-dark capitalize">
              Hello, {displayName}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-text-mid hover:text-rose transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* TERMS NOTICE */}
        <div className="bg-ivory border-l-4 border-rose p-4 mb-8">
          <p className="text-sm text-text-mid">
            Please review our{' '}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose hover:underline font-medium"
            >
              Terms of Service
            </a>{' '}
            before proceeding with bookings or payments.
          </p>
        </div>

        {/* CONTRACTS + PAYMENTS */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* CONTRACTS */}
          <section className="bg-ivory p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-dark flex items-center justify-center">
                <FileText className="w-5 h-5 text-cream" />
              </div>

              <div>
                <h2 className="font-serif text-xl text-dark">
                  Your Contracts
                </h2>

                <p className="text-xs text-text-light">
                  Agreements and documents
                </p>
              </div>
            </div>

            {contracts.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-midnight/30">
                <FileText className="w-8 h-8 text-text-light mx-auto mb-2" />

                <p className="text-sm text-text-mid">
                  No contracts here yet
                </p>

                <p className="text-xs text-text-light mt-1 px-4">
                  Your agreements will appear here when available.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {contracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between gap-4 p-4 border border-midnight/30"
                  >
                    <div>
                      <p className="font-serif text-dark">
                        {contract.name}
                      </p>

                      <p className="text-xs text-text-light mt-1">
                        {formatStatus(contract.status)}
                      </p>
                    </div>

                    {contract.url && (
                      <a
                        href={contract.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose hover:underline text-sm flex-shrink-0"
                      >
                        View
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-midnight/30">
              <p className="text-xs text-text-light">
                Questions about an agreement?{' '}
                <a
                  href="mailto:april@delicateflowers.co"
                  className="text-rose hover:underline"
                >
                  Contact us
                </a>
              </p>
            </div>
          </section>

          {/* INVOICES */}
          <section className="bg-ivory p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-dark flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-cream" />
              </div>

              <div>
                <h2 className="font-serif text-xl text-dark">
                  Your Payments
                </h2>

                <p className="text-xs text-text-light">
                  Invoices and balances
                </p>
              </div>
            </div>

            {invoiceError ? (
              <div className="border border-rose/30 bg-rose/5 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-rose flex-shrink-0 mt-0.5" />

                  <p className="text-sm text-text-mid">
                    {invoiceError}
                  </p>
                </div>
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-midnight/30">
                <CreditCard className="w-8 h-8 text-text-light mx-auto mb-2" />

                <p className="text-sm text-text-mid">
                  No payments here yet
                </p>

                <p className="text-xs text-text-light mt-1">
                  Your invoices will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="p-4 border border-midnight/30"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(invoice.status)}

                        <span className="font-serif text-dark">
                          Invoice #{invoice.invoiceNumber}
                        </span>
                      </div>

                      <span className="font-serif text-lg text-dark whitespace-nowrap">
                        ${invoice.amount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`text-xs ${
                          invoice.status === 'PAID'
                            ? 'text-sage'
                            : 'text-rose'
                        }`}
                      >
                        {getStatusText(invoice.status)}
                      </span>

                      {invoice.status !== 'PAID' &&
                        invoice.squareUrl &&
                        invoice.squareUrl !== '#' && (
                          <a
                            href={invoice.squareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-rose hover:underline"
                          >
                            Pay Now
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                    </div>

                    {invoice.dueDate && (
                      <p className="text-xs text-text-light mt-2">
                        Due: {formatDate(invoice.dueDate)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-midnight/30">
              <p className="text-xs text-text-light">
                Payments are securely processed through Square.
              </p>
            </div>
          </section>
        </div>

        {/* FLORAL SUBSCRIPTION */}
        <section className="bg-ivory p-6 md:p-8 mb-6 overflow-hidden relative">
          <div className="relative z-10">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-sage flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-cream" />
              </div>

              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.25em] text-text-light mb-1">
                  Flowers, regularly
                </p>

                <h2 className="font-serif text-xl text-dark">
                  Floral Subscription
                </h2>
              </div>
            </div>

            {/* SUBSCRIPTION LOADING */}
            {subscriptionLoading && (
              <div className="animate-pulse">
                <div className="h-4 bg-midnight/10 rounded w-1/3 mb-3" />
                <div className="h-4 bg-midnight/10 rounded w-1/2" />
              </div>
            )}

            {/* SUBSCRIPTION ERROR */}
            {!subscriptionLoading && subscriptionError && (
              <div className="border border-midnight/20 p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-text-light flex-shrink-0 mt-0.5" />

                  <div>
                    <p className="text-sm text-dark">
                      Subscription information is temporarily unavailable.
                    </p>

                    <p className="text-xs text-text-light mt-1">
                      Please check again later.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* NO SUBSCRIPTION */}
            {!subscriptionLoading &&
              !subscriptionError &&
              !hasSubscription && (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="max-w-xl">
                    <h3 className="font-serif text-2xl text-dark mb-2">
                      Want flowers on repeat?
                    </h3>

                    <p className="text-sm text-text-mid leading-relaxed">
                      Choose a recurring floral delivery for your home,
                      office, or someone you love.
                    </p>
                  </div>

                  <Link
                    href="/client/subscriptions"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-dark text-cream text-xs uppercase tracking-[0.2em] hover:bg-rose transition-colors whitespace-nowrap"
                  >
                    Choose a Subscription
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

            {/* EXISTING SUBSCRIPTIONS */}
            {!subscriptionLoading &&
              !subscriptionError &&
              hasSubscription && (
                <div className="space-y-4">
                  {activeSubscriptions.map((subscription) => (
                    <div
                      key={subscription.id}
                      className="border border-midnight/20 p-5 md:p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${
                                subscription.status === 'ACTIVE'
                                  ? 'bg-sage'
                                  : subscription.status === 'PAUSED'
                                  ? 'bg-gold'
                                  : 'bg-rose'
                              }`}
                            />

                            <span className="text-xs uppercase tracking-[0.18em] text-text-mid">
                              {formatStatus(subscription.status)}
                            </span>
                          </div>

                          <h3 className="font-serif text-xl md:text-2xl text-dark">
                            Your Floral Subscription
                          </h3>

                          <div className="mt-4 space-y-1">
                            {subscription.startDate && (
                              <p className="text-sm text-text-mid">
                                Started{' '}
                                {formatDate(subscription.startDate)}
                              </p>
                            )}

                            {subscription.paidUntilDate && (
                              <p className="text-sm text-text-mid">
                                Paid through{' '}
                                {formatDate(subscription.paidUntilDate)}
                              </p>
                            )}

                            {subscription.chargedThroughDate && (
                              <p className="text-sm text-text-mid">
                                Charged through{' '}
                                {formatDate(
                                  subscription.chargedThroughDate
                                )}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <span className="inline-flex px-4 py-2 border border-sage text-sage text-xs uppercase tracking-[0.18em]">
                            {subscription.status === 'ACTIVE'
                              ? 'Active'
                              : formatStatus(subscription.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </section>

        {/* MESSAGES */}
        <MessagesPanel cus

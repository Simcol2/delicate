'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navigation/Navbar'
import { FileText, CreditCard, LogOut, ExternalLink, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Invoice {
  id: string
  invoiceNumber: string
  amount: string
  status: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID' | 'CANCELED' | string
  url: string
  dueDate?: string
}

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [contracts, setContracts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        // Fetch Square invoices
        try {
          const response = await fetch(`/api/square/invoices?email=${currentUser.email}`)
          if (response.ok) {
            const data = await response.json()
            setInvoices(data.invoices || [])
          } else {
            setError('Failed to load invoices')
          }
        } catch (err) {
          setError('Failed to connect to payment system')
        }
      } else {
        router.push('/client/login')
      }
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
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'UNPAID':
        return <Clock className="w-4 h-4 text-[#c9594a]" />
      default:
        return <AlertCircle className="w-4 h-4 text-[#a89189]" />
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
        return status
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#faf6f0] pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-[#e8d5b0] rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-[#e8d5b0] rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6f0] pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <span className="text-[#c9594a] text-xs tracking-[0.3em] uppercase font-sans block mb-2">
                Welcome back
              </span>
              <h1 className="font-serif text-3xl md:text-4xl text-[#2c2420]">
                {user?.email?.split('@')[0]}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-[#6b5b52] hover:text-[#c9594a] transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Terms Notice */}
          <div className="bg-[#fffdf9] border-l-4 border-[#c9594a] p-4 mb-8">
            <p className="text-sm text-[#6b5b52]">
              Please review our{' '}
              <a href="/terms" target="_blank" className="text-[#c9594a] hover:underline font-medium">
                Terms of Service
              </a>{' '}
              before proceeding with any bookings or payments. By making a payment, you agree to these terms.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-600 p-4 mb-8 text-sm">
              {error}
            </div>
          )}

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Contracts Card */}
            <div className="bg-[#fffdf9] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#8f0e04] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#faf6f0]" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-[#2c2420]">Your Contracts</h2>
                  <p className="text-xs text-[#a89189]">Event agreements and documents</p>
                </div>
              </div>

              {contracts.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-[#e8d5b0]">
                  <FileText className="w-8 h-8 text-[#a89189] mx-auto mb-2" />
                  <p className="text-sm text-[#6b5b52]">No contracts yet</p>
                  <p className="text-xs text-[#a89189] mt-1">
                    Contracts will appear here once your event is confirmed.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {contracts.map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between p-4 border border-[#e8d5b0]">
                      <div>
                        <p className="font-serif text-[#2c2420]">{contract.name}</p>
                        <p className="text-xs text-[#a89189]">{contract.status}</p>
                      </div>
                      <a href={contract.url} className="text-[#c9594a] hover:underline text-sm">
                        View
                      </a>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-[#e8d5b0]">
                <p className="text-xs text-[#a89189]">
                  Questions about your contract?{' '}
                  <a href="mailto:hello@delicateflowers.com" className="text-[#c9594a] hover:underline">
                    Contact us
                  </a>
                </p>
              </div>
            </div>

            {/* Invoices Card */}
            <div className="bg-[#fffdf9] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#8f0e04] flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#faf6f0]" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-[#2c2420]">Your Invoices</h2>
                  <p className="text-xs text-[#a89189]">Payments and balances</p>
                </div>
              </div>

              {invoices.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-[#e8d5b0]">
                  <CreditCard className="w-8 h-8 text-[#a89189] mx-auto mb-2" />
                  <p className="text-sm text-[#6b5b52]">No invoices yet</p>
                  <p className="text-xs text-[#a89189] mt-1">
                    Invoices will appear here once your event is booked.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="p-4 border border-[#e8d5b0]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(invoice.status)}
                          <span className="font-serif text-[#2c2420]">
                            Invoice #{invoice.invoiceNumber}
                          </span>
                        </div>
                        <span className="font-serif text-lg text-[#2c2420]">
                          ${invoice.amount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${
                          invoice.status === 'PAID' ? 'text-green-600' : 'text-[#c9594a]'
                        }`}>
                          {getStatusText(invoice.status)}
                        </span>
                        {invoice.status !== 'PAID' && invoice.url && (
                          <a 
                            href={invoice.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-[#c9594a] hover:underline"
                          >
                            Pay Now
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      {invoice.dueDate && (
                        <p className="text-xs text-[#a89189] mt-2">
                          Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-[#e8d5b0]">
                <p className="text-xs text-[#a89189]">
                  All payments are securely processed through Square.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <a 
              href="/terms" 
              target="_blank"
              className="bg-[#fffdf9] p-4 text-center hover:bg-[#faf6f0] transition-colors"
            >
              <FileText className="w-5 h-5 text-[#c9594a] mx-auto mb-2" />
              <span className="text-sm text-[#2c2420]">Terms of Service</span>
            </a>
            <a 
              href="/#contact" 
              className="bg-[#fffdf9] p-4 text-center hover:bg-[#faf6f0] transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-[#c9594a] mx-auto mb-2" />
              <span className="text-sm text-[#2c2420]">Contact Us</span>
            </a>
            <a 
              href="/services" 
              className="bg-[#fffdf9] p-4 text-center hover:bg-[#faf6f0] transition-colors"
            >
              <CreditCard className="w-5 h-5 text-[#c9594a] mx-auto mb-2" />
              <span className="text-sm text-[#2c2420]">View Packages</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

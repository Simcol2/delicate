'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navigation/Navbar'
import { FileText, CreditCard, Calendar, CheckCircle, Clock, ExternalLink } from 'lucide-react'

interface Invoice {
  id: string
  invoiceNumber: string
  amount: number
  status: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID'
  dueDate: string
  description: string
  squareUrl?: string
}

interface Contract {
  id: string
  title: string
  status: 'SIGNED' | 'PENDING'
  signedDate?: string
  squareUrl?: string
}

export default function ClientDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/client/login')
      } else {
        setUser(currentUser)
        // Fetch client data from Square API
        fetchClientData(currentUser.email)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const fetchClientData = async (email: string | null) => {
    // This will be replaced with actual Square API integration
    // For now, using mock data
    setInvoices([
      {
        id: 'inv_1',
        invoiceNumber: 'DF-2024-001',
        amount: 1250,
        status: 'UNPAID',
        dueDate: '2024-12-31',
        description: 'Champagne Package - Wedding Reception',
        squareUrl: '#'
      },
      {
        id: 'inv_2',
        invoiceNumber: 'DF-2024-002',
        amount: 350,
        status: 'PAID',
        dueDate: '2024-12-15',
        description: 'Signature Cocktail Station Add-on',
        squareUrl: '#'
      }
    ])

    setContracts([
      {
        id: 'ctr_1',
        title: 'Event Services Agreement',
        status: 'PENDING',
        squareUrl: '#'
      },
      {
        id: 'ctr_2',
        title: 'Terms of Service',
        status: 'SIGNED',
        signedDate: '2024-11-15',
        squareUrl: '#'
      }
    ])
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/client/login')
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#faf6f0] pt-32 pb-20 flex items-center justify-center">
          <div className="text-[#6b5b52] font-sans">Loading...</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6f0] pt-32 pb-20">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <span className="text-[#de6050] text-sm tracking-[0.3em] uppercase font-sans block mb-3">
                  Client Portal
                </span>
                <h1 className="font-serif text-4xl md:text-5xl text-[#2c2420] leading-tight">
                  Your Dashboard
                </h1>
                <p className="font-sans text-[#6b5b52] mt-2">
                  Welcome back, {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="mt-6 md:mt-0 px-6 py-3 border-2 border-[#2c2420] text-[#2c2420] font-sans text-xs tracking-[0.22em] uppercase hover:bg-[#2c2420] hover:text-white transition-all duration-300"
              >
                Sign Out
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] mb-12">
              <div className="bg-[#fffdf9] p-6 text-center">
                <div className="w-12 h-12 bg-[#de6050]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-[#de6050]" />
                </div>
                <span className="font-serif text-3xl text-[#2c2420]">{contracts.length}</span>
                <p className="text-[#6b5b52] text-sm mt-1">Contracts</p>
              </div>
              <div className="bg-[#fffdf9] p-6 text-center">
                <div className="w-12 h-12 bg-[#de6050]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-[#de6050]" />
                </div>
                <span className="font-serif text-3xl text-[#2c2420]">{invoices.length}</span>
                <p className="text-[#6b5b52] text-sm mt-1">Invoices</p>
              </div>
              <div className="bg-[#fffdf0] p-6 text-center border-2 border-[#de6050]">
                <div className="w-12 h-12 bg-[#de6050]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-[#de6050]" />
                </div>
                <span className="font-serif text-3xl text-[#de6050]">
                  ${invoices.filter(i => i.status === 'UNPAID').reduce((acc, i) => acc + i.amount, 0)}
                </span>
                <p className="text-[#6b5b52] text-sm mt-1">Balance Due</p>
              </div>
            </div>

            {/* Contracts Section */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl text-[#2c2420] mb-6">
                Contracts & Documents
              </h2>
              <div className="bg-[#fffdf9] border border-[#e8d5b0]">
                {contracts.map((contract, idx) => (
                  <div
                    key={contract.id}
                    className={`flex items-center justify-between p-6 ${
                      idx !== contracts.length - 1 ? 'border-b border-[#f5ede0]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        contract.status === 'SIGNED' ? 'bg-green-100' : 'bg-[#de6050]/10'
                      }`}>
                        {contract.status === 'SIGNED' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-[#de6050]" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-[#2c2420]">{contract.title}</h3>
                        <p className="text-[#a89189] text-sm">
                          {contract.status === 'SIGNED' 
                            ? `Signed on ${contract.signedDate}` 
                            : 'Awaiting your signature'}
                        </p>
                      </div>
                    </div>
                    <a
                      href={contract.squareUrl}
                      className="flex items-center gap-2 px-4 py-2 bg-[#de6050] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#c94a3d] transition-colors"
                    >
                      {contract.status === 'SIGNED' ? 'View' : 'Sign'}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoices Section */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#2c2420] mb-6">
                Invoices & Payments
              </h2>
              <div className="bg-[#fffdf9] border border-[#e8d5b0]">
                {invoices.map((invoice, idx) => (
                  <div
                    key={invoice.id}
                    className={`p-6 ${idx !== invoices.length - 1 ? 'border-b border-[#f5ede0]' : ''}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          invoice.status === 'PAID' ? 'bg-green-100' : 'bg-[#de6050]/10'
                        }`}>
                          {invoice.status === 'PAID' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <CreditCard className="w-5 h-5 text-[#de6050]" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-serif text-lg text-[#2c2420]">{invoice.description}</h3>
                            <span className={`px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded-full ${
                              invoice.status === 'PAID' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-[#de6050]/10 text-[#de6050]'
                            }`}>
                              {invoice.status}
                            </span>
                          </div>
                          <p className="text-[#a89189] text-sm mt-1">
                            Invoice #{invoice.invoiceNumber} • Due {invoice.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-2xl text-[#2c2420]">${invoice.amount}</span>
                        {invoice.status === 'UNPAID' && (
                          <a
                            href={invoice.squareUrl}
                            className="px-6 py-3 bg-[#de6050] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#c94a3d] transition-colors"
                          >
                            Pay Now
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-12 bg-[#2c2420] p-8 md:p-12 text-center">
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
                Need Help?
              </h2>
              <p className="text-[#a89189] mb-6 max-w-md mx-auto">
                Have questions about your invoice or contract? We&apos;re here to help.
              </p>
              <a
                href="mailto:hello@delicateflowers.co"
                className="inline-block px-8 py-3 border-2 border-[#de6050] text-[#de6050] font-sans text-xs tracking-[0.22em] uppercase hover:bg-[#de6050] hover:text-white transition-all duration-300"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

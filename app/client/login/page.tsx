'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navigation/Navbar'

export default function ClientLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/client/dashboard')
    } catch (err: any) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6f0] pt-32 pb-20">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <span className="text-[#de6050] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
                Client Portal
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-[#2c2420] leading-tight mb-4">
                Welcome Back
              </h1>
              <p className="font-sans text-[#6b5b52] text-lg">
                Sign in to view your invoices, contracts, and event details.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="bg-[#fffdf9] p-8 md:p-10 border border-[#e8d5b0]">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-[#2c2420] text-xs tracking-[0.28em] uppercase font-sans mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-[#e8d5b0] py-3 text-[#2c2420] font-sans focus:border-[#de6050] focus:outline-none transition-colors placeholder:text-[#a89189]"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#2c2420] text-xs tracking-[0.28em] uppercase font-sans mb-3">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-[#e8d5b0] py-3 text-[#2c2420] font-sans focus:border-[#de6050] focus:outline-none transition-colors placeholder:text-[#a89189]"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 px-8 py-4 bg-[#de6050] text-white font-sans text-xs tracking-[0.22em] uppercase hover:bg-[#c94a3d] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Help Text */}
            <p className="text-center mt-8 text-[#a89189] text-sm">
              Don&apos;t have login credentials?{' '}
              <a href="/#contact" className="text-[#de6050] hover:underline">
                Contact us
              </a>{' '}
              to get set up.
            </p>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <a
                href="/"
                className="inline-block px-8 py-3 border-2 border-[#2c2420] text-[#2c2420] font-sans text-xs tracking-[0.22em] uppercase hover:bg-[#2c2420] hover:text-white transition-all duration-300"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

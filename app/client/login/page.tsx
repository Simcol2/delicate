'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navigation/Navbar'

export default function ClientLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/client/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF6F0] pt-32 pb-20">
        <div className="max-w-md mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#CC2A7A] text-xs tracking-[0.3em] uppercase font-sans block mb-4">
              Welcome back
            </span>
            <h1 className="font-serif text-4xl text-[#1A2744] mb-3 font-bold">Client Portal</h1>
            <p className="text-[#1A2744] text-sm">
              Sign in to view your invoices, contracts, and event details.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-8 md:p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[#1A2744] text-xs tracking-widest uppercase font-sans mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#C9A96E] py-3 text-[#1A2744] focus:border-[#CC2A7A] focus:outline-none transition-colors"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[#1A2744] text-xs tracking-widest uppercase font-sans mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[#C9A96E] py-3 text-[#1A2744] focus:border-[#CC2A7A] focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#CC2A7A] text-[#faf6f0] py-4 font-sans text-sm tracking-widest uppercase hover:bg-[#1A2744] transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#C9A96E] text-center">
              <p className="text-xs text-[#1A2744]/70">
                Need help? Contact us at{' '}
                <a href="mailto:hello@delicateflowers.com" className="text-[#CC2A7A] hover:underline">
                  hello@delicateflowers.com
                </a>
              </p>
            </div>
          </div>

          {/* Terms Note */}
          <p className="text-center text-xs text-[#1A2744]/70 mt-6">
            By using this portal, you agree to our{' '}
            <a href="/terms" target="_blank" className="text-[#CC2A7A] hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </main>
    </>
  )
}

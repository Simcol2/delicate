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
      <main className="min-h-screen bg-[#faf6f0] pt-32 pb-20">
        <div className="max-w-md mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#c9594a] text-xs tracking-[0.3em] uppercase font-sans block mb-4">
              Welcome back
            </span>
            <h1 className="font-serif text-4xl text-[#2c2420] mb-3">Client Portal</h1>
            <p className="text-[#6b5b52] text-sm">
              Sign in to view your invoices, contracts, and event details.
            </p>
          </div>

          <div className="bg-[#fffdf9] p-8 md:p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[#6b5b52] text-xs tracking-widest uppercase font-sans mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#e8d5b0] py-3 text-[#2c2420] focus:border-[#c9594a] focus:outline-none transition-colors"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[#6b5b52] text-xs tracking-widest uppercase font-sans mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[#e8d5b0] py-3 text-[#2c2420] focus:border-[#c9594a] focus:outline-none transition-colors"
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
                className="w-full bg-[#8f0e04] text-[#faf6f0] py-4 font-sans text-sm tracking-widest uppercase hover:bg-[#c9594a] transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#e8d5b0] text-center">
              <p className="text-xs text-[#a89189]">
                Need help? Contact us at{' '}
                <a href="mailto:hello@delicateflowers.com" className="text-[#c9594a] hover:underline">
                  hello@delicateflowers.com
                </a>
              </p>
            </div>
          </div>

          {/* Terms Note */}
          <p className="text-center text-xs text-[#a89189] mt-6">
            By using this portal, you agree to our{' '}
            <a href="/terms" target="_blank" className="text-[#c9594a] hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </main>
    </>
  )
}

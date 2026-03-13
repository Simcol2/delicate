'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function ClientLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
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

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      
      // Create Square customer
      try {
        const response = await fetch('/api/square/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email,
            givenName: email.split('@')[0]
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          console.log('Square customer:', data.message)
        }
      } catch (squareErr) {
        console.error('Square API error:', squareErr)
      }
      
      setSuccess('Account created successfully! Redirecting to dashboard...')
      setTimeout(() => {
        router.push('/client/dashboard')
      }, 1500)
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists')
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address')
      } else {
        setError('Failed to create account. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsCreatingAccount(!isCreatingAccount)
    setError('')
    setSuccess('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <main className="min-h-screen bg-cream pt-32 lg:pt-40 pb-20">
      <div className="max-w-md mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-sans block mb-4">
            {isCreatingAccount ? 'Get Started' : 'Welcome back'}
          </span>
          <h1 className="font-serif text-4xl text-dark mb-3 font-light">
            {isCreatingAccount ? 'Create Account' : 'Client Portal'}
          </h1>
          <p className="text-text-mid text-sm">
            {isCreatingAccount 
              ? 'Create an account to view your invoices, contracts, and event details.'
              : 'Sign in to view your invoices, contracts, and event details.'}
          </p>
        </div>

        <div className="bg-ivory p-8 md:p-10">
          <form onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin} className="space-y-6">
            <div>
              <label className="block text-dark text-xs tracking-widest uppercase font-sans mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-gold py-3 text-dark focus:border-rose focus:outline-none transition-colors"
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-dark text-xs tracking-widest uppercase font-sans mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-gold py-3 text-dark focus:border-rose focus:outline-none transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            
            {isCreatingAccount && (
              <div>
                <label className="block text-dark text-xs tracking-widest uppercase font-sans mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-gold py-3 text-dark focus:border-rose focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-500/10 text-green-600 text-sm text-center">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-cream py-4 font-sans text-sm tracking-widest uppercase hover:bg-dark transition-colors disabled:opacity-50"
            >
              {loading 
                ? (isCreatingAccount ? 'Creating Account...' : 'Signing in...') 
                : (isCreatingAccount ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gold text-center space-y-4">
            <div>
              <p className="text-sm text-dark">
                {isCreatingAccount 
                  ? "Already have an account? " 
                  : "Don't have an account? "}
                <button 
                  onClick={toggleMode}
                  className="text-rose hover:underline font-medium"
                >
                  {isCreatingAccount ? 'Sign In' : 'Create Account'}
                </button>
              </p>
              <p className="text-xs text-text-light mt-1">
                {isCreatingAccount 
                  ? 'Sign in to access your existing account'
                  : 'New clients can create an account here'}
              </p>
            </div>
            
            <div className="pt-4 border-t border-gold/30">
              <p className="text-xs text-text-mid">
                Need help? Contact us at{' '}
                <a href="mailto:april@delicateflowers.co" className="text-rose hover:underline">
                  april@delicateflowers.co
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Terms Note */}
        <p className="text-center text-xs text-text-mid mt-6">
          By using this portal, you agree to our{' '}
          <a href="/terms" target="_blank" className="text-rose hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </main>
  )
}

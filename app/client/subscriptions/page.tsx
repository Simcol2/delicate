'use client'

import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

const plans = [
  {
    id: 'petite',
    name: 'Petite',
    description: 'A fresh floral moment for smaller spaces.',
    price: '$65',
    cadence: 'per week',
    squareUrl: process.env.NEXT_PUBLIC_SQUARE_PETITE_SUBSCRIPTION_URL || '',
  },
  {
    id: 'signature',
    name: 'Signature',
    description: 'Our fuller weekly designer arrangement.',
    price: '$110',
    cadence: 'per week',
    squareUrl:
      process.env.NEXT_PUBLIC_SQUARE_SIGNATURE_SUBSCRIPTION_URL || '',
  },
  {
    id: 'statement',
    name: 'Statement',
    description: 'Generous florals designed to make the room.',
    price: '$175',
    cadence: 'per week',
    squareUrl:
      process.env.NEXT_PUBLIC_SQUARE_STATEMENT_SUBSCRIPTION_URL || '',
  },
]

export default function SubscriptionSelectionPage() {
  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/client/dashboard"
          className="inline-flex items-center gap-2 text-sm text-text-mid hover:text-rose mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to your account
        </Link>

        <div className="max-w-2xl mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-rose block mb-3">
            Flowers on repeat
          </span>

          <h1 className="font-serif text-4xl md:text-5xl text-dark mb-4">
            Choose your floral subscription
          </h1>

          <p className="text-text-mid">
            Fresh flowers delivered locally on a recurring schedule.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-ivory p-8 flex flex-col"
            >
              <h2 className="font-serif text-2xl text-dark mb-3">
                {plan.name}
              </h2>

              <p className="text-sm text-text-mid mb-8 min-h-[48px]">
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="font-serif text-3xl text-dark">
                  {plan.price}
                </span>

                <span className="text-sm text-text-light ml-2">
                  {plan.cadence}
                </span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-text-mid">
                  <Check className="w-4 h-4 text-sage" />
                  Local delivery
                </div>

                <div className="flex items-center gap-2 text-sm text-text-mid">
                  <Check className="w-4 h-4 text-sage" />
                  Automatic recurring billing
                </div>

                <div className="flex items-center gap-2 text-sm text-text-mid">
                  <Check className="w-4 h-4 text-sage" />
                  Designer-selected seasonal flowers
                </div>
              </div>

              <a
                href={plan.squareUrl}
                className="
                  mt-auto
                  text-center
                  bg-dark
                  text-cream
                  px-6
                  py-3
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  hover:bg-rose
                  transition-colors
                "
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

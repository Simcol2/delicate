'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Navbar from '@/components/navigation/Navbar'
import { Plus } from 'lucide-react'

const faqs = [
  {
    question: 'How does the consultation process work?',
    answer: `It all starts with a conversation. If you have initial questions or just want to get a feel for what we do, a 15-minute phone consultation is completely complimentary , no strings attached. You can book directly into our calendar or simply give us a call at the number listed on our website.

For clients who are ready to move forward, we require a site visit consultation to see your space and fully understand your vision. This visit is $75, a fee that is then credited in full toward your balance once you officially book. It's our way of making sure every detail is considered before a single stem is placed.`
  },
  {
    question: 'Do you offer virtual consultations?',
    answer: `Sometimes, yes. Virtual consultations are available on a case-by-case basis depending on your event details and location. Please give us a call and we'll let you know whether it's an option for your event , we want to make this as seamless as possible for you.`
  },
  {
    question: 'What types of events do you style?',
    answer: `We love them all , weddings, bridal and baby showers, birthday dinners, corporate gatherings, holiday celebrations, intimate dinner parties, and everything in between. If you're bringing people together around a beautiful table, we want to be part of it.`
  },
  {
    question: 'How far in advance should I book?',
    answer: `We recommend reaching out at least 4 to 6 weeks before your event , sooner for weddings or larger gatherings, which can book up quickly during peak seasons. That said, we'll always do our best to accommodate you, so don't hesitate to reach out even on a shorter timeline.`
  },
  {
    question: 'What areas do you serve?',
    answer: `We are based locally but available to travel for the right event. Please contact us with your event location and we'll confirm availability. Travel fees may apply for events outside our standard service area.`
  },
  {
    question: 'Do you provide the décor and tableware, or do I supply my own?',
    answer: `We offer both options. Our packages include styling with our own curated inventory of tableware, linens, florals, and decorative elements. If you have pieces you love and would like incorporated , family heirlooms, a special vase, or items you've collected , we're happy to work with what you have. This is discussed during the consultation so we can plan accordingly.`
  },
  {
    question: 'Can I customize a package?',
    answer: `Absolutely. Our packages are designed to give you a clear starting point, but we know that no two events are alike. You can add styling areas, layer on curated add-ons like a dessert display, cocktail station, or floral arrangements, or build something entirely bespoke from the ground up with our Build Your Own option. We'll work with you to match both your vision and your budget.`
  },
  {
    question: 'What is required to secure my date?',
    answer: `A deposit is required to hold your event date. The deposit amount will be outlined in your quote and confirmed at the time of booking. Your $75 consultation fee is credited toward your total balance, so you won't be paying it twice.`
  },
  {
    question: 'What is your cancellation or rescheduling policy?',
    answer: `Life happens , we understand that. Our cancellation and rescheduling terms are outlined in your service agreement at the time of booking. Please reach out to us directly as soon as possible if your plans change and we will do our best to work with you.`
  },
  {
    question: 'Do you handle setup and breakdown?',
    answer: `Yes. Setup and breakdown are coordinated directly with you at the time of booking. We'll confirm arrival and departure windows that work around your event schedule, so on the day itself you can focus entirely on your guests , not the logistics.`
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    // Animate FAQ items on load
    const items = document.querySelectorAll('.faq-item')
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.2,
      }
    )
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6f0] pt-32 pb-20">
        <div className="w-full px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#de6050] text-sm tracking-[0.3em] uppercase font-sans block mb-4">
              You have questions
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#2c2420] leading-tight mb-6">
              We have <em className="text-[#de6050] italic">answers.</em>
            </h1>
            <p className="font-sans text-[#6b5b52] text-lg max-w-md mx-auto">
              Everything you need to know before we start designing the table of your dreams.
            </p>
            {/* Divider */}
            <div className="w-[60px] h-[1px] bg-[#de6050] mx-auto mt-8" />
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item border-t border-[#de6050]/30 first:border-t-0 last:border-b last:border-[#de6050]/30"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-serif text-lg md:text-xl text-[#2c2420] group-hover:text-[#de6050] transition-colors duration-300 leading-snug">
                    {faq.question}
                  </span>
                  <span 
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-[#de6050] flex items-center justify-center transition-all duration-300 ${
                      openIndex === index ? 'bg-[#de6050] rotate-45' : ''
                    }`}
                  >
                    <Plus 
                      size={16} 
                      className={`transition-colors duration-300 ${
                        openIndex === index ? 'text-white' : 'text-[#de6050]'
                      }`} 
                    />
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    openIndex === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-sans text-[#6b5b52] text-[15px] leading-[1.85] pb-7 pr-12 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-[var(--plum-deep)] rounded-lg p-10 md:p-12 text-center">
              <p className="font-serif text-2xl md:text-3xl text-[#faf6f0] leading-relaxed">
                Still have questions? <em className="text-[#de6050] italic">We&apos;d love to hear from you.</em>
              </p>
              <p className="font-sans text-[#a89189] text-sm mt-4 tracking-wide">
                Call us or book a complimentary 15-minute phone consultation , no commitment required.
              </p>
              <a
                href="/#contact"
                className="inline-block mt-8 px-10 py-4 border-2 border-[#de6050] text-[#de6050] font-sans text-sm tracking-widest uppercase hover:bg-[#de6050] hover:text-[var(--plum-deep)] transition-all duration-300"
              >
                Schedule a Call
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-16">
            <a
              href="/"
              className="inline-block px-10 py-4 border-2 border-[var(--plum-deep)] text-[var(--plum-deep)] font-sans text-sm tracking-widest uppercase hover:bg-[var(--plum-deep)] hover:text-[#de6050] transition-all duration-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

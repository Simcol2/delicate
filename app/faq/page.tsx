'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    question: 'How does the consultation process work?',
    answer: `It all starts with a conversation. If you have initial questions or just want to get a feel for what we do, a 15-minute phone consultation is completely complimentary, no strings attached. You can book directly into our calendar or simply give us a call at the number listed on our website.

For clients who are ready to move forward, we require a site visit consultation to see your space and fully understand your vision. This visit is $75, a fee that is then credited in full toward your balance once you officially book. It's our way of making sure every detail is considered before a single stem is placed.`
  },
  {
    question: 'Do you offer virtual consultations?',
    answer: `Sometimes, yes. Virtual consultations are available on a case-by-case basis depending on your event details and location. Please give us a call and we'll let you know whether it's an option for your event, we want to make this as seamless as possible for you.`
  },
  {
    question: 'What types of events do you style?',
    answer: `We love them all:

• Weddings
• Bridal Events
• Baby Showers
• Birthday Dinners
• Corporate Gatherings
• Holiday Celebrations
• Intimate Dinner Parties

And everything in between!

If you're bringing people together around a beautiful table, we want to be part of it.`,
  },
  {
    question: 'How far in advance should I book?',
    answer: `We recommend reaching out at least 4 to 6 weeks before your event, sooner for weddings or larger gatherings, which can book up quickly during peak seasons. That said, we'll always do our best to accommodate you, so don't hesitate to reach out even on a shorter timeline.`
  },
  {
    question: 'What areas do you serve?',
    answer: `We are based locally but available to travel for the right event. Please contact us with your event location and we'll confirm availability. Travel fees may apply for events outside our standard service area.`
  },
  {
    question: 'Do you provide the décor and tableware, or do I supply my own?',
    answer: `We offer both options. Our packages include styling with our own curated inventory of tableware, linens, florals, and decorative elements. If you have pieces you love and would like incorporated, family heirlooms, a special vase, or items you've collected, we're happy to work with what you have. This is discussed during the consultation so we can plan accordingly.`
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
    answer: `Life happens, we understand that. Our cancellation and rescheduling terms are outlined in your service agreement at the time of booking. Please reach out to us directly as soon as possible if your plans change and we will do our best to work with you.`
  },
  {
    question: 'Do you handle setup and breakdown?',
    answer: `Yes. Setup and breakdown are coordinated directly with you at the time of booking. We'll confirm arrival and departure windows that work around your event schedule, so on the day itself you can focus entirely on your guests, not the logistics.`
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-cream pt-32 lg:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="section-label justify-center">You have questions</p>
          <h1 className="section-title">
            We have <em className="text-rose">answers.</em>
          </h1>
          <p className="font-sans text-text-mid text-lg max-w-md mx-auto mt-6">
            Everything you need to know before we start designing the table of your dreams.
          </p>
          <div className="w-[60px] h-[1px] bg-midnight mx-auto mt-8" />
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-t border-midnight/30 first:border-t-0 last:border-b last:border-midnight/30 transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50 + 200}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                aria-expanded={openIndex === index}
              >
                <span className="font-serif text-lg md:text-xl text-dark group-hover:text-rose transition-colors duration-300 leading-snug">
                  {faq.question}
                </span>
                <span 
                  className={`flex-shrink-0 w-8 h-8 rounded-full border border-rose flex items-center justify-center transition-all duration-300 ${
                    openIndex === index ? 'bg-rose rotate-45' : ''
                  }`}
                >
                  <Plus 
                    size={16} 
                    className={`transition-colors duration-300 ${
                      openIndex === index ? 'text-cream' : 'text-rose'
                    }`} 
                  />
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  openIndex === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="font-sans text-text text-[15px] leading-[1.85] pb-7 pr-12 whitespace-pre-line">
                  {faq.answer.split('\n').map((line, i) => (
                    line.startsWith('•') ? (
                      <span key={i} className="block pl-4">{line}</span>
                    ) : line === "And everything in between!" ? (
                      <em key={i} className="font-serif text-rose text-xl block my-2">
                        {line}
                      </em>
                    ) : (
                      <span key={i} className="block">{line}</span>
                    )
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-dark p-10 md:p-12 text-center">
            <p className="font-serif text-2xl md:text-3xl text-cream leading-relaxed">
              Still have questions? <em className="text-midnight italic">We&apos;d love to hear from you.</em>
            </p>
            <p className="font-sans text-cream/60 text-sm mt-4 tracking-wide">
              Call us or book a complimentary 15-minute phone consultation, no commitment required.
            </p>
            <a
              href="https://calendar.app.google/mEhKoq1ZgiX9uZUa8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-10 py-4 border-2 border-cream text-cream font-sans text-sm tracking-widest uppercase hover:bg-cream hover:text-dark transition-all duration-300"
            >
              Schedule a Call
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <a href="/" className="btn-text">
            Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}

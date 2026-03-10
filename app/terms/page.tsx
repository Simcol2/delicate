'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import Navbar from '@/components/navigation/Navbar'

const termsSections = [
  {
    number: '01',
    title: 'Booking & Deposit',
    content: [
      'A non-refundable deposit of <strong>50% of the total quoted amount</strong> is required to confirm and hold your event date. Your date is not secured until the deposit has been received and a signed contract is on file. We are unable to hold dates without both.',
      'The remaining balance of <strong>50% is due in full on the day of the event</strong>, prior to setup. Events with an outstanding balance on the day of may be subject to delay.',
      'Guest count and event scope provided at the time of booking are used to determine your quote. Should your needs change, additional guests, additional styling areas, or add-ons, updated pricing will be discussed and confirmed before any additional work is undertaken.'
    ]
  },
  {
    number: '02',
    title: 'Accepted Payment Methods',
    items: ['Credit card', 'Venmo', 'Zelle', 'E-transfer', 'Cash'],
    footer: 'All payments must be received in the agreed currency. Receipts are provided upon request.'
  },
  {
    number: '03',
    title: 'Cancellation Policy',
    content: [
      'We understand that plans sometimes change. Our cancellation policy is as follows:'
    ],
    highlights: [
      '<strong>Within 7 days of signing your contract:</strong> A full refund of your deposit will be issued, no questions asked.',
      '<strong>After 7 days of signing your contract:</strong> The deposit is non-refundable. This reflects the planning, sourcing, and reservation of your event date that has already taken place on our end.'
    ],
    footer: 'Cancellations must be submitted in writing via email or text message to be considered valid. Verbal cancellations are not accepted.'
  },
  {
    number: '04',
    title: 'Rescheduling',
    flagged: true,
    content: [
      'Life happens, and we will always do our best to accommodate a change of date. Rescheduling requests must be made as early as possible and are subject to availability.',
      'In the event of an emergency or unforeseen circumstance on the client\'s part, please contact us directly and we will discuss available options together.'
    ],
    note: 'Note for Delicate Flowers: This section is intentionally kept flexible. Once you\'ve decided on a rescheduling fee (if any) and a limit on how many times a client can reschedule, add those details here before publishing.'
  },
  {
    number: '05',
    title: 'Cancellation by Us',
    content: [
      'In the rare event that we must cancel due to an emergency or circumstances beyond our control, you will be offered the option to reschedule your event at a later available date. We will communicate with you as quickly as possible and work to find the best solution.'
    ]
  },
  {
    number: '06',
    title: 'Setup, Delays & Breakdown',
    content: [
      'Setup and breakdown dates and times are confirmed at the time of booking. It is the client\'s responsibility to ensure that venue access is available at the agreed time.',
      '<strong>Delays of more than 2 hours</strong> from the confirmed setup time may result in a delay fee of <strong>$35.00</strong>.',
      '<strong>Delays of more than 5 hours</strong> may result in the inability to complete your event setup. We are a boutique service and may have other events scheduled. If we are unable to proceed due to a client-caused delay of this nature, the deposit remains non-refundable.',
      'Any concerns about timing should be communicated as soon as possible so we can work together to find a solution before it affects your event.'
    ]
  },
  {
    number: '07',
    title: 'Florals & Design Substitutions',
    content: [
      'All floral designs are created based on seasonal availability. While we work closely with each client to understand their aesthetic preferences, exact flowers or varietals cannot always be guaranteed due to supply and seasonal factors outside our control.',
      'If a specific flower requested by the client is unavailable, we will substitute it with the next best available option of <strong>equal or comparable value and design intent</strong>. All substitutions are made with care and your overall aesthetic vision in mind.'
    ]
  },
  {
    number: '08',
    title: 'Florals, Décor & Material Return',
    content: [
      '<strong>Live florals and perishable arrangements</strong> are yours to keep following the event. We love that they find a home beyond the table.',
      '<strong>All non-perishable materials</strong>, including linens, tableware, chargers, decorative accessories, and any other rented inventory, remain the property of Delicate Flowers and will be collected at the time of breakdown. Items that are damaged, missing, or not returned may be subject to a replacement fee.'
    ]
  },
  {
    number: '09',
    title: 'Liability & Insurance',
    content: [
      'Delicate Flowers carries general liability insurance. We take great care with every venue we work in and handle all materials professionally.',
      'While we take every precaution, Delicate Flowers is not responsible for damage caused by guests, venue staff, or other vendors during or after the event. We ask that clients communicate any specific venue requirements or restrictions at the time of booking.'
    ]
  },
  {
    number: '10',
    title: 'Photography & Marketing',
    content: [
      'Delicate Flowers reserves the right to photograph completed setups for use on our website, social media platforms, and marketing materials. These images showcase our work and help future clients envision what is possible.',
      '<strong>If you prefer that your event not be photographed or shared publicly</strong>, you may opt out at the time of signing your contract. Opt-out requests must be noted in writing on your signed agreement.'
    ]
  }
]

export default function TermsPage() {
  useEffect(() => {
    const sections = document.querySelectorAll('.terms-section')
    gsap.fromTo(
      sections,
      { y: 14, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.1,
      }
    )
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6f0] pt-32 pb-20">
        <div className="w-full px-6 lg:px-12">
          {/* Header */}
          <header className="text-center pt-10 pb-16 max-w-2xl mx-auto">
            <span className="text-[#c4897a] text-xs tracking-[0.38em] uppercase font-sans block mb-5">
              Please read before booking
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2c2420] leading-tight">
              Terms of <em className="text-[#c4897a] italic">Service</em>
            </h1>
            <p className="font-sans text-[#6b5b52] text-[15px] leading-[1.85] mt-6">
              These terms exist to make the experience smooth and transparent for everyone. By booking a service, you are agreeing to the policies outlined below. If you have any questions before signing, please reach out, we&apos;re always happy to talk through the details.
            </p>
            <span className="inline-block mt-5 text-[11px] tracking-[0.2em] uppercase text-[#a89189] border border-[#e8d5b0] px-4 py-1.5 rounded-full">
              Effective: [Month, Year] &nbsp;&nbsp; Delicate Flowers
            </span>
          </header>

          {/* Terms Body */}
          <div className="max-w-3xl mx-auto">
            {termsSections.map((section, idx) => (
              <div
                key={idx}
                className={`terms-section bg-[#fffdf9] p-8 md:p-12 mb-[2px] opacity-0 ${
                  section.flagged ? 'border-l-[3px] border-[#c4897a]' : ''
                }`}
              >
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--gold-antique)] block mb-2.5">
                  {section.number}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-[#2c2420] mb-5 leading-tight">
                  {section.title}
                </h2>

                {section.content && section.content.map((para, pIdx) => (
                  <p 
                    key={pIdx} 
                    className="text-[14.5px] text-[#6b5b52] leading-[1.9] mb-3.5"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}

                {section.highlights && section.highlights.map((highlight, hIdx) => (
                  <div 
                    key={hIdx}
                    className="bg-[#f5ede0] border-l-2 border-[var(--gold-antique)] px-5 py-4 my-4 text-[14px] text-[#6b5b52] leading-[1.8]"
                    dangerouslySetInnerHTML={{ __html: highlight }}
                  />
                ))}

                {section.items && (
                  <ul className="my-3.5">
                    {section.items.map((item, iIdx) => (
                      <li 
                        key={iIdx}
                        className="flex items-start gap-3 text-[14.5px] text-[#6b5b52] py-2 border-b border-[#f5ede0] last:border-b-0"
                      >
                        <span className="w-1 h-1 rounded-full bg-[var(--gold-antique)] mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="text-[14.5px] text-[#6b5b52] leading-[1.9] mt-3.5">
                    {section.footer}
                  </p>
                )}

                {section.note && (
                  <div className="bg-[#fdf0ed] border-l-2 border-[#c4897a] px-4 py-3 mt-4 text-xs text-[#c4897a] italic">
                    {section.note}
                  </div>
                )}
              </div>
            ))}

            {/* Closing */}
            <div className="bg-[#2c2420] px-8 md:px-12 py-16 text-center mt-[2px]">
              <p className="font-serif text-xl md:text-2xl text-[#fffdf9] leading-relaxed">
                Questions before you sign? <em className="text-[var(--gold-antique)] italic">We&apos;d love to hear from you.</em>
              </p>
              <p className="text-[13px] text-[#a89189] tracking-wide mt-3.5">
                Reach out any time, a conversation is always the best place to start.
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-16">
            <a
              href="/"
              className="inline-block px-10 py-4 border-2 border-[#2c2420] text-[#2c2420] font-sans text-sm tracking-widest uppercase hover:bg-[#2c2420] hover:text-[var(--gold-antique)] transition-all duration-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

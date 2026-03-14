import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark px-6 lg:px-20 pt-20 pb-8 relative overflow-hidden">
      {/* Gold line */}
      <div className="absolute top-0 left-6 right-6 lg:left-20 lg:right-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="font-serif-sc text-xl lg:text-[1.4rem] font-normal text-ivory tracking-[0.15em] mb-1">
            Delicate Flowers
          </div>
          <div className="font-sans text-[0.58rem] tracking-[0.35em] uppercase text-gold mb-8">
            Palm Springs, California
          </div>
          <p className="font-serif italic text-base text-ivory/50 leading-relaxed max-w-[260px]">
            Floral artistry shaped by desert light, mid-century elegance, and an unwavering commitment to beauty.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <p className="font-serif-sc text-[0.8rem] font-normal tracking-[0.2em] text-gold mb-6">
            Navigate
          </p>
          <ul className="flex flex-col gap-3 list-none">
            {[
              { href: '/about', label: 'Our Story' },
              { href: '/services', label: 'Services' },
              { href: '/experiences', label: 'Portfolio' },
              { href: '/faq', label: 'FAQ' },
              { href: '/client/login', label: 'Client Portal' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-[0.75rem] font-semibold text-ivory/70 no-underline tracking-[0.08em] transition-colors duration-300 hover:text-gold-pale"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="font-serif-sc text-[0.8rem] font-normal tracking-[0.2em] text-gold mb-6">
            Services
          </p>
          <ul className="flex flex-col gap-3 list-none">
            {[
              'Tablescapes',
              'Cocktail Bar',
              'Smoked Meats',
            ].map((service) => (
              <li key={service}>
                <Link
                  href="/services"
                  className="font-sans text-[0.75rem] font-semibold text-ivory/70 no-underline tracking-[0.08em] transition-colors duration-300 hover:text-gold-pale"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-serif-sc text-[0.8rem] font-normal tracking-[0.2em] text-gold mb-6">
            Contact
          </p>
          <div className="space-y-4">
            <div>
              <div className="font-sans text-[0.58rem] tracking-[0.3em] uppercase text-gold mb-1">
                Phone
              </div>
              <a 
                href="tel:7606736636"
                className="font-sans text-[0.78rem] font-semibold text-ivory/80 no-underline hover:text-gold-pale transition-colors"
              >
                (760) 673-6636
              </a>
            </div>
            <div>
              <div className="font-sans text-[0.58rem] tracking-[0.3em] uppercase text-gold mb-1">
                Email
              </div>
              <a 
                href="mailto:april@delicateflowers.co"
                className="font-sans text-[0.78rem] font-semibold text-ivory/80 no-underline hover:text-gold-pale transition-colors"
              >
                april@delicateflowers.co
              </a>
            </div>
            <div>
              <div className="font-sans text-[0.58rem] tracking-[0.3em] uppercase text-gold mb-1">
                Location
              </div>
              <div className="font-sans text-[0.78rem] font-semibold text-ivory/80">
                Palm Springs, CA
              </div>
            </div>
            <div>
              <div className="font-sans text-[0.58rem] tracking-[0.3em] uppercase text-gold mb-1">
                Hours
              </div>
              <div className="font-sans text-[0.78rem] font-semibold text-ivory/80">
                Mon – Sat · 9am – 6pm
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-[0.65rem] font-light text-ivory/30 tracking-[0.1em]">
          © {currentYear} Delicate Flowers · All rights reserved
        </p>
        <p className="font-serif italic text-[0.75rem] text-gold/50">
          Designed in the desert sun.
        </p>
      </div>
    </footer>
  )
}

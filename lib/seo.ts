export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
}

export const SITE_URL = 'https://delicateflowers.co'
export const SITE_NAME = 'Delicate Flowers'
export const BUSINESS_NAME = 'Delicate Flowers'

export const SERVICE_AREAS = [
  'Palm Springs',
  'Palm Desert',
  'Rancho Mirage',
  'Cathedral City',
  'Indian Wells',
  'La Quinta',
]

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/delicate.flowers',
  email: 'hello@delicateflowers.co',
}

export const PAGES: Record<string, PageMeta> = {
  home: {
    title: 'Delicate Flowers | Palm Springs Floral Design & Event Styling',
    description: 'Bespoke floral design and luxury event styling in Palm Springs. Custom florals, tablescapes, and celebration design rooted in desert light and landscape.',
    keywords: ['floral design', 'event styling', 'Palm Springs', 'tablescape design', 'luxury events'],
    canonical: '/',
    ogTitle: 'Delicate Flowers | Palm Springs Floral Design',
    ogDescription: 'Bespoke floral design and luxury event styling in Palm Springs.',
    ogType: 'website',
  },
  about: {
    title: 'About Delicate Flowers | Palm Springs Floral Artist',
    description: 'Learn about Delicate Flowers. We design with the precision of an architect and the soul of a botanist, creating bespoke floral arrangements and event styling in Palm Springs.',
    keywords: ['floral artist', 'Palm Springs', 'floral design', 'event styling'],
    canonical: '/about',
    ogTitle: 'About Delicate Flowers',
    ogDescription: 'Bespoke floral design rooted in the light and landscape of Palm Springs.',
    ogType: 'website',
  },
  services: {
    title: 'Floral Design & Event Styling Services | Palm Springs | Delicate Flowers',
    description: 'Premium floral design, tablescape styling, and event design services for celebrations, private dinners, and weddings throughout Palm Springs and the desert communities.',
    keywords: ['floral design', 'tablescape design', 'event styling', 'Palm Springs', 'wedding florals'],
    canonical: '/services',
    ogTitle: 'Premium Floral & Event Styling Services',
    ogDescription: 'Designer tablescapes, florals and event styling for gatherings throughout Palm Springs and the surrounding desert communities.',
    ogType: 'website',
  },
  experiences: {
    title: 'Event & Floral Design Portfolio | Palm Springs | Delicate Flowers',
    description: 'Explore our portfolio of floral design, tablescapes, weddings, celebrations and styled events. See how we bring luxury and elegance to Palm Springs gatherings.',
    keywords: ['portfolio', 'floral arrangements', 'wedding florals', 'event design', 'Palm Springs'],
    canonical: '/experiences',
    ogTitle: 'Event & Floral Design Portfolio',
    ogDescription: 'A portfolio of floral arrangements, tablescapes, weddings and styled gatherings in Palm Springs.',
    ogType: 'website',
  },
  floral: {
    title: 'Premium Floral Arrangements | Palm Springs | Delicate Flowers',
    description: 'Shop handcrafted floral arrangements in Palm Springs. Premium bouquets designed for celebrations, special occasions, and gifting. Direct delivery available.',
    keywords: ['floral arrangements', 'flowers Palm Springs', 'bouquets', 'flower delivery', 'premium florals'],
    canonical: '/floral',
    ogTitle: 'Premium Floral Arrangements',
    ogDescription: 'Handcrafted floral arrangements designed for celebrations, special occasions, and gifting.',
    ogType: 'website',
  },
  floralCheckout: {
    title: 'Checkout | Delicate Flowers',
    description: 'Complete your floral purchase securely. Review your order and proceed to payment with Delicate Flowers.',
    canonical: '/floral/checkout',
    ogType: 'website',
  },
  contact: {
    title: 'Contact Delicate Flowers | Palm Springs Floral Design',
    description: 'Get in touch with Delicate Flowers. Contact us for floral design, event styling, or custom arrangement inquiries in Palm Springs.',
    keywords: ['contact', 'floral design inquiry', 'event styling', 'Palm Springs'],
    canonical: '/contact',
    ogTitle: 'Contact Delicate Flowers',
    ogType: 'website',
  },
  consultation: {
    title: 'Book a Design Consultation | Delicate Flowers | Palm Springs',
    description: 'Schedule a consultation with Delicate Flowers to discuss your custom floral design or event styling needs in Palm Springs.',
    keywords: ['consultation', 'design meeting', 'floral design', 'event planning'],
    canonical: '/consultation',
    ogTitle: 'Book Your Design Consultation',
    ogType: 'website',
  },
  faq: {
    title: 'FAQ | Delicate Flowers',
    description: 'Frequently asked questions about Delicate Flowers floral design, event styling, and ordering process.',
    keywords: ['faq', 'questions', 'flower delivery', 'event design'],
    canonical: '/faq',
    ogType: 'website',
  },

  // Services
  tablescapeDesign: {
    title: 'Luxury Tablescape Design | Palm Springs | Delicate Flowers',
    description: 'Custom tablescape design and table styling for intimate dinners, celebrations, and private events throughout Palm Springs and the desert communities.',
    keywords: ['tablescape design', 'table styling', 'dinner party design', 'event styling', 'Palm Springs'],
    canonical: '/services/tablescape-design',
    ogTitle: 'Luxury Tablescape Design',
    ogDescription: 'Sophisticated table styling and tablescape design for celebrations throughout Palm Springs.',
    ogType: 'article',
  },
  floralDesign: {
    title: 'Custom Floral Design | Palm Springs | Delicate Flowers',
    description: 'Bespoke floral design and custom arrangements for events, celebrations, and special occasions in Palm Springs and surrounding desert communities.',
    keywords: ['floral design', 'custom arrangements', 'event florals', 'wedding flowers', 'Palm Springs'],
    canonical: '/services/floral-design',
    ogTitle: 'Custom Floral Design Services',
    ogDescription: 'Bespoke floral arrangements and event florals designed for your celebration.',
    ogType: 'article',
  },
  privateEvents: {
    title: 'Private Event Styling & Design | Palm Springs | Delicate Flowers',
    description: 'Full-service private event styling and design. From intimate dinners to celebrations, we create luxury experiences throughout Palm Springs.',
    keywords: ['private events', 'event styling', 'dinner party', 'event design', 'Palm Springs'],
    canonical: '/services/private-events',
    ogTitle: 'Private Event Styling & Design',
    ogDescription: 'Comprehensive event styling and design for intimate gatherings and celebrations in Palm Springs.',
    ogType: 'article',
  },
  weddingStyling: {
    title: 'Wedding Floral Design & Styling | Palm Springs | Delicate Flowers',
    description: 'Wedding floral design, tablescapes, and full event styling for intimate ceremonies and celebrations throughout Palm Springs and the desert.',
    keywords: ['wedding florals', 'bridal flowers', 'wedding styling', 'ceremony design', 'Palm Springs weddings'],
    canonical: '/services/wedding-styling',
    ogTitle: 'Wedding Floral Design & Styling',
    ogDescription: 'Custom wedding florals and event styling for Palm Springs ceremonies and celebrations.',
    ogType: 'article',
  },

  // Portfolio
  weddingPortfolio: {
    title: 'Wedding Florals & Styling Portfolio | Palm Springs | Delicate Flowers',
    description: 'Wedding floral design, tablescapes and styling for intimate ceremonies, receptions and desert celebrations in Palm Springs.',
    keywords: ['wedding portfolio', 'wedding florals', 'bride flowers', 'ceremony design', 'Palm Springs weddings'],
    canonical: '/experiences/weddings',
    ogTitle: 'Wedding Floral Design Portfolio',
    ogDescription: 'Custom wedding florals and styling for Palm Springs ceremonies and celebrations.',
    ogType: 'article',
  },
  celebrationPortfolio: {
    title: 'Celebration & Party Styling Portfolio | Palm Springs | Delicate Flowers',
    description: 'Floral design and styling for celebrations, parties, and special occasions throughout Palm Springs. See our custom designs and event transformations.',
    keywords: ['celebration design', 'party styling', 'event florals', 'party design', 'Palm Springs'],
    canonical: '/experiences/celebrations',
    ogTitle: 'Celebration & Party Styling',
    ogDescription: 'Custom floral design and styling for celebrations and special occasions.',
    ogType: 'article',
  },
  floralArrangementsPortfolio: {
    title: 'Floral Arrangements Portfolio | Palm Springs | Delicate Flowers',
    description: 'Floral arrangement designs for events, gifts, and special occasions. Browse our portfolio of custom bouquets and floral creations in Palm Springs.',
    keywords: ['floral arrangements', 'bouquets', 'floral portfolio', 'custom flowers', 'Palm Springs'],
    canonical: '/experiences/floral-arrangements',
    ogTitle: 'Floral Arrangements Portfolio',
    ogDescription: 'A curated collection of custom floral arrangements and bouquets.',
    ogType: 'article',
  },
  outdoorSoireePortfolio: {
    title: 'Outdoor Event Styling | Desert Soirees | Palm Springs | Delicate Flowers',
    description: 'Outdoor event design and styling for desert soirees, garden parties, and outdoor celebrations throughout Palm Springs and surrounding communities.',
    keywords: ['outdoor events', 'garden party', 'desert entertaining', 'outdoor styling', 'Palm Springs'],
    canonical: '/experiences/outdoor-soiree',
    ogTitle: 'Outdoor Event & Desert Soiree Styling',
    ogDescription: 'Custom styling for outdoor gatherings and desert entertaining in Palm Springs.',
    ogType: 'article',
  },
  themedEventsPortfolio: {
    title: 'Themed Event Design & Styling | Palm Springs | Delicate Flowers',
    description: 'Custom themed event design and styling for concept celebrations and specialty events throughout Palm Springs and the desert communities.',
    keywords: ['themed events', 'concept parties', 'event design', 'specialty events', 'Palm Springs'],
    canonical: '/experiences/themed-events',
    ogTitle: 'Themed Event Design & Styling',
    ogDescription: 'Custom concept design and styling for specialty and themed celebrations.',
    ogType: 'article',
  },
}

export const SITEMAP_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/services/tablescape-design', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/services/floral-design', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/services/private-events', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/services/wedding-styling', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/experiences', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/experiences/weddings', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/experiences/celebrations', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/experiences/floral-arrangements', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/experiences/outdoor-soiree', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/experiences/themed-events', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/floral', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/consultation', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
]

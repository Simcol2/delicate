import { SITE_URL, SITE_NAME, SERVICE_AREAS, SOCIAL_LINKS } from './seo'

export interface LocalBusinessSchemaProps {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  telephone: string
  email: string
}

export function generateLocalBusinessSchema(props: LocalBusinessSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Delicate Flowers',
    description: 'Bespoke floral design and luxury event styling in Palm Springs.',
    url: SITE_URL,
    telephone: props.telephone,
    email: props.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.streetAddress,
      addressLocality: props.addressLocality,
      addressRegion: props.addressRegion,
      postalCode: props.postalCode,
      addressCountry: 'US',
    },
    areaServed: SERVICE_AREAS.map(area => ({
      '@type': 'City',
      name: area,
      addressRegion: 'California',
    })),
    sameAs: [
      SOCIAL_LINKS.instagram,
    ],
    image: `${SITE_URL}/images/df-logo.png`,
    priceRange: '$$$',
    knowsAbout: [
      'Floral Design',
      'Event Styling',
      'Tablescape Design',
      'Wedding Design',
    ],
    hasOfferingType: [
      'Floral Design Service',
      'Event Styling Service',
      'Wedding Planning Service',
    ],
  }
}

export interface ServiceSchemaProps {
  name: string
  description: string
  areaServed?: string[]
  url: string
  image?: string
}

export function generateServiceSchema(props: ServiceSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: props.name,
    description: props.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Delicate Flowers',
      url: SITE_URL,
    },
    areaServed: (props.areaServed || SERVICE_AREAS).map(area => ({
      '@type': 'City',
      name: area,
    })),
    url: `${SITE_URL}${props.url}`,
    ...(props.image && { image: props.image }),
  }
}

export interface ProductSchemaProps {
  name: string
  description: string
  price: number
  image: string
  url: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
}

export function generateProductSchema(props: ProductSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.name,
    description: props.description,
    image: props.image,
    url: `${SITE_URL}${props.url}`,
    brand: {
      '@type': 'Brand',
      name: 'Delicate Flowers',
    },
    offers: {
      '@type': 'Offer',
      price: props.price,
      priceCurrency: 'USD',
      availability: `https://schema.org/${props.availability || 'InStock'}`,
      url: `${SITE_URL}${props.url}`,
    },
  }
}

export interface BreadcrumbProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function generateBreadcrumbSchema(props: BreadcrumbProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: props.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export interface FAQSchemaProps {
  items: Array<{
    question: string
    answer: string
  }>
}

export function generateFAQSchema(props: FAQSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export interface OrganizationSchemaProps {
  telephone: string
  email: string
}

export function generateOrganizationSchema(props: OrganizationSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Delicate Flowers',
    url: SITE_URL,
    logo: `${SITE_URL}/images/df-logo.png`,
    description: 'Bespoke floral design and luxury event styling in Palm Springs.',
    telephone: props.telephone,
    email: props.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'California',
    },
    sameAs: [
      SOCIAL_LINKS.instagram,
    ],
  }
}

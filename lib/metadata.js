/**
 * Setu Architects — Server-side Metadata Helpers
 *
 * Factory functions for generating Next.js Metadata objects
 * for individual routes / pages.
 *
 * All pages should call generateMetadata() and merge with SITE_CONFIG
 * rather than defining metadata ad-hoc.
 */

import { SITE_CONFIG } from './config';

/**
 * Generate a full Next.js Metadata object for a page.
 *
 * @param {object} options
 * @param {string} options.title          - Page-specific title (without site suffix)
 * @param {string} [options.description]  - Page-specific description
 * @param {string} [options.path]         - Canonical path (e.g. '/about')
 * @param {string} [options.ogImage]      - OG image path (defaults to /images/og-image.jpg)
 * @param {string[]} [options.keywords]   - Additional keywords to append
 * @param {boolean} [options.noIndex]     - Set to true to noindex the page
 * @returns {import('next').Metadata}
 */
export function generateMetadata({
  title,
  description = SITE_CONFIG.description,
  path = '/',
  ogImage = '/images/og-image.jpg',
  keywords = [],
  noIndex = false,
} = {}) {
  const fullTitle     = title
    ? `${title} | ${SITE_CONFIG.shortName}`
    : SITE_CONFIG.name;
  const normalizedPath = path === '/' ? '/' : (path.startsWith('/') ? path : `/${path}`);
  const canonicalUrl  = `${SITE_CONFIG.url}${normalizedPath}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'Setu Architects',
      'structural engineering',
      'architecture Ahmedabad',
      'MEPF design',
      'residential architecture',
      'commercial architecture',
      ...keywords,
    ],
    ...(noIndex
      ? {}
      : {
          alternates: {
            canonical: canonicalUrl,
          },
        }),
    openGraph: {
      type: 'website',
      url:  canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      locale: 'en_IN',
      images: [
        {
          url:    ogImage,
          width:  1200,
          height: 630,
          alt:    fullTitle,
        },
      ],
    },
    twitter: {
      card:        'summary_large_image',
      title:       fullTitle,
      description,
      images:      [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            'max-video-preview': -1,
            'max-image-preview': 'none',
            'max-snippet': -1,
          },
        }
      : {
          index:  true,
          follow: true,
          googleBot: {
            index:               true,
            follow:              true,
            'max-image-preview': 'large',
            'max-snippet':       -1,
          },
        },
  };
}

/**
 * Generate structured data (JSON-LD) for the organisation.
 * Inject via <script> in layout or page head.
 * @returns {object} JSON-LD schema object
 */
export function getOrganizationSchema() {
  return {
    '@context':  'https://schema.org',
    '@type':     'Organization',
    name:        SITE_CONFIG.name,
    url:         SITE_CONFIG.url,
    logo:        `${SITE_CONFIG.url}/images/setu-logo.png`,
    description: SITE_CONFIG.description,
    foundingDate: String(SITE_CONFIG.founded),
    contactPoint: {
      '@type':      'ContactPoint',
      telephone:    SITE_CONFIG.phone,
      contactType:  'customer service',
      email:        SITE_CONFIG.email,
      areaServed:   'India',
    },
    address: {
      '@type':           'PostalAddress',
      addressLocality:   'Ahmedabad',
      addressRegion:     'Gujarat',
      addressCountry:    'IN',
    },
  };
}

/**
 * Generate structured data for a specific project page.
 * @param {object} project
 * @returns {object} JSON-LD schema object
 */
export function getProjectSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type':    'CreativeWork',
    name:       project.title || project.name,
    description:project.description,
    url:        `${SITE_CONFIG.url}/projects`,
    creator: {
      '@type': 'Organization',
      name:    SITE_CONFIG.name,
    },
    image:       project.image || project.img ? `${SITE_CONFIG.url}${project.image || project.img}` : undefined,
  };
}


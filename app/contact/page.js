import ContactPageClient from '@/components/ContactPageClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Contact Setu Architects — Engineering & Architectural Services',
  description:
    'Get in touch with Setu Architects in Ahmedabad, Gujarat for structural engineering, architectural design, earth retaining structure, and MEPF project enquiries.',
  alternates: {
    canonical: 'https://setu-architect.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact Setu Architects — Engineering & Architectural Services',
    description:
      'Get in touch with Setu Architects in Ahmedabad, Gujarat for structural engineering, architectural design, earth retaining structure, and MEPF project enquiries.',
    url: 'https://setu-architect.vercel.app/contact',
    siteName: 'Setu Architects',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Setu Architects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Setu Architects — Engineering & Architectural Services',
    description:
      'Get in touch with Setu Architects for structural engineering and architectural project enquiries.',
    images: ['/images/og-image.jpg'],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://setu-architect.vercel.app/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact Us',
      item: 'https://setu-architect.vercel.app/contact',
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ContactPageClient />
    </>
  );
}

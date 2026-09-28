import ClientsPageClient from '@/components/ClientsPageClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Clients & Organizations Served | Setu Architects',
  description:
    'Discover our client directory featuring leading real estate developers, builders, and corporate visionaries who trust Setu Architects for structural design.',
  alternates: {
    canonical: 'https://setu-architect.vercel.app/clients',
  },
  openGraph: {
    title: 'Clients & Organizations Served | Setu Architects',
    description:
      'Discover our client directory featuring leading real estate developers, builders, and corporate visionaries who trust Setu Architects for structural design.',
    url: 'https://setu-architect.vercel.app/clients',
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
    title: 'Clients & Organizations Served | Setu Architects',
    description:
      'Discover our client directory featuring leading real estate developers, builders, and corporate visionaries.',
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
      name: 'Clients',
      item: 'https://setu-architect.vercel.app/clients',
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ClientsPageClient />
    </>
  );
}

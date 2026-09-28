import ProjectsPageClient from '@/components/ProjectsPageClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Setu Architects Projects — Structural & Architectural Portfolio',
  description:
    'Explore Setu Architects portfolio featuring structural engineering, MEPF, commercial, residential, and institutional developments.',
  alternates: {
    canonical: 'https://setu-architect.vercel.app/projects',
  },
  openGraph: {
    title: 'Setu Architects Projects — Structural & Architectural Portfolio',
    description:
      'Explore Setu Architects portfolio featuring structural engineering, MEPF, commercial, residential, and institutional developments.',
    url: 'https://setu-architect.vercel.app/projects',
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
    title: 'Setu Architects Projects — Structural & Architectural Portfolio',
    description:
      'Explore Setu Architects portfolio featuring structural engineering, MEPF, commercial, residential, and institutional developments.',
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
      name: 'Projects',
      item: 'https://setu-architect.vercel.app/projects',
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ProjectsPageClient />
    </>
  );
}

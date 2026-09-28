import HomePageClient from '@/components/HomePageClient';

export const metadata = {
  title: 'Setu Architects — Architecture & Structural Engineering',
  description:
    'Setu Architects delivers world-class structural engineering, MEPF design, and architectural solutions for residential, commercial, industrial, and public structures since 1988.',
  alternates: {
    canonical: 'https://setu-architect.vercel.app/',
  },
  openGraph: {
    title: 'Setu Architects — Architecture & Structural Engineering',
    description:
      'Setu Architects delivers world-class structural engineering, MEPF design, and architectural solutions for residential, commercial, industrial, and public structures since 1988.',
    url: 'https://setu-architect.vercel.app/',
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
    title: 'Setu Architects — Architecture & Structural Engineering',
    description:
      'Setu Architects delivers world-class structural engineering, MEPF design, and architectural solutions since 1988.',
    images: ['/images/og-image.jpg'],
  },
};

export default function Page() {
  return <HomePageClient />;
}

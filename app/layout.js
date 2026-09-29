import { Montserrat, Open_Sans } from 'next/font/google';
import { Navbar } from '@/components/ui';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';
import NextAuthProvider from '@/components/providers/NextAuthProvider';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { ProjectsProvider } from '@/context/ProjectsContext';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import JsonLd from '@/components/JsonLd';
import '../styles/globals.css';

/* ─── Font Loading ──────────────────────────────────────────── */
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  preload: true,
});

/* ─── Site-wide Metadata ────────────────────────────────────── */
export const metadata = {
  metadataBase: new URL('https://setu-architect.vercel.app'),

  title: {
    default: 'Setu Architects',
    template: '%s | Setu Architects',
  },

  description:
    'Setu Architects delivers world-class structural engineering and architectural design solutions — specializing in residential, commercial, industrial, and public structures since 1988.',

  keywords: [
    'Setu Architects',
    'structural engineering',
    'architecture Ahmedabad',
    'MEPF design',
    'residential architecture',
    'commercial architecture',
    'structural design Gujarat',
    'earth retaining structure',
    'quantity surveying',
  ],

  authors: [{ name: 'Setu Architects' }],
  creator: 'Setu Architects',
  publisher: 'Setu Architects',
  alternates: {
    canonical: 'https://setu-architect.vercel.app/',
  },

  // ─── Open Graph ───────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://setu-architect.vercel.app/',
    siteName: 'Setu Architects',
    title: 'Setu Architects',
    description:
      'Setu Architects delivers world-class structural engineering and architectural design solutions — specializing in residential, commercial, industrial, and public structures since 1988.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Setu Architects',
      },
    ],
  },

  // ─── Twitter Card ─────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Setu Architects',
    description:
      'Setu Architects delivers world-class structural engineering and architectural design solutions since 1988.',
    images: ['/images/og-image.jpg'],
  },

  // ─── Robots ───────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ─── Manifest ─────────────────────────────────────────────────
  manifest: '/site.webmanifest',

  // ─── Verification ─────────────────────────────────────────────
  verification: {
    google: 'jL2-mH0VIO0U4cOAVCRPIteZ1fjXh2YXo43r-kQ5NNg',
  },
};

/* ─── Global Organization Structured Data ───────────────────── */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': 'https://setu-architect.vercel.app/#organization',
  name: 'Setu Architects',
  url: 'https://setu-architect.vercel.app/',
  logo: 'https://setu-architect.vercel.app/images/setu-logo.png',
  image: 'https://setu-architect.vercel.app/images/og-image.jpg',
  description:
    'Setu Architects delivers world-class structural engineering, MEPF design, and architectural solutions for residential, commercial, industrial, and public structures since 1988.',
  foundingDate: '1988',
  telephone: '+91 9428873366',
  email: 'setuarchitect@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Structural design',
    'Civil engineering',
    'Architectural design',
    'Earth retaining structure',
    'Quantity Surveying',
    'Supervision during execution',
    'MEPF Design',
  ],
};

/* ─── Viewport Configuration ────────────────────────────────── */
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
    { media: '(prefers-color-scheme: light)', color: '#0d1117' },
  ],
};

/* ─── Root Layout ───────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="bg-white text-neutral-900 antialiased overflow-x-hidden">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed top-4 left-4 z-[9999]
            bg-primary-600 text-white
            px-4 py-2 rounded-lg text-sm font-semibold
            focus:outline-none focus:ring-2 focus:ring-primary-400
          "
        >
          Skip to main content
        </a>

        {/* Main content wrapper */}
        <NextAuthProvider>
          <AdminAuthProvider>
            <ProjectsProvider>
              <div id="main-content" className="flex flex-col min-h-dvh">
                <Navbar />
                {children}
              </div>
              <WhatsAppWidget />
              <Analytics />
              <SpeedInsights />
            </ProjectsProvider>
          </AdminAuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

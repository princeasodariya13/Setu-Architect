import Link from "next/link";
import AboutIntro from "@/components/about/AboutIntro";
import ScopeOfWork from "@/components/about/ScopeOfWork";
import SpecialityTabs from "@/components/about/SpecialityTabs";
import ContactSection from "@/components/about/ContactSection";
import { Container } from "@/components/ui";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: 'About Setu Architects — Structural Engineering & Architectural Design',
  description:
    'Established in 1988, Setu Architects specializes in structural engineering, earth retaining design, and MEPF solutions for residential, commercial, industrial, and public buildings.',
  alternates: {
    canonical: 'https://setu-architect.vercel.app/about',
  },
  openGraph: {
    title: 'About Setu Architects — Structural Engineering & Architectural Design',
    description:
      'Established in 1988, Setu Architects specializes in structural engineering, earth retaining design, and MEPF solutions for residential, commercial, industrial, and public buildings.',
    url: 'https://setu-architect.vercel.app/about',
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
    title: 'About Setu Architects — Structural Engineering & Architectural Design',
    description:
      'Established in 1988, Setu Architects specializes in structural engineering, earth retaining design, and MEPF solutions.',
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
      name: 'About Setu Architects',
      item: 'https://setu-architect.vercel.app/about',
    },
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-white py-20 px-6 text-center">
        <Container className="max-w-[1200px]">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-[#b08543] mb-4">Who we are</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-neutral-900 tracking-[0.12em] uppercase leading-none">About Setu Architects</h1>
        </Container>
      </section>

      <AboutIntro />
      <ScopeOfWork />
      <SpecialityTabs />
      <ContactSection />

      <section className="bg-white py-12 border-t border-neutral-200">
        <Container className="max-w-[1200px] flex flex-wrap items-center justify-center gap-6 text-center">
          <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            &larr; Back to home
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/projects" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            Explore Structural Projects &rarr;
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/architects" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            Architects We Work With &rarr;
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/clients" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            Clients Served &rarr;
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/contact" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            Contact Setu Architects &rarr;
          </Link>
        </Container>
      </section>
    </main>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Architects & Design Partners | Setu Architects',
  description:
    'Explore the network of leading architects and design partners working alongside Setu Architects to deliver landmark structural and architectural projects.',
  alternates: {
    canonical: 'https://setu-architect.vercel.app/architects',
  },
  openGraph: {
    title: 'Architects & Design Partners | Setu Architects',
    description:
      'Explore the network of leading architects and design partners working alongside Setu Architects to deliver landmark structural and architectural projects.',
    url: 'https://setu-architect.vercel.app/architects',
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
    title: 'Architects & Design Partners | Setu Architects',
    description:
      'Explore the network of leading architects and design partners working alongside Setu Architects.',
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
      name: 'Architects Work With',
      item: 'https://setu-architect.vercel.app/architects',
    },
  ],
};

const ARCHITECTS = [
  { name: '99', initials: '99', accent: 'bg-[#f7e8cf] text-[#8b5e1c]' },
  { name: '9Th Street', initials: '9T', accent: 'bg-[#ecdfd0] text-[#7b583f]' },
  { name: 'AAPL', initials: 'AA', accent: 'bg-[#f3e2d8] text-[#855245]' },
  { name: 'ADS', initials: 'AD', accent: 'bg-[#f3e5cf] text-[#8c672a]' },
  { name: 'Apurva Amin', initials: 'AA', accent: 'bg-[#efe7d7] text-[#6f5d3d]' },
  { name: 'Bhagwat Architect', initials: 'BA', accent: 'bg-[#eee4d7] text-[#755440]' },
  { name: 'Bhaulik Patel Architect', initials: 'BP', accent: 'bg-[#efe8de] text-[#64584b]' },
  { name: 'Brijesh Architect', initials: 'BA', accent: 'bg-[#e7ddcc] text-[#715a33]' },
  { name: 'Design Code', initials: 'DC', accent: 'bg-[#f1e9d8] text-[#7b6130]' },
  { name: 'Design Code Social', initials: 'DS', accent: 'bg-[#efe7d8] text-[#735737]' },
  { name: 'DSPL Architect', initials: 'DS', accent: 'bg-[#efe0d1] text-[#805d36]' },
  { name: 'Flexible', initials: 'FL', accent: 'bg-[#e8e3df] text-[#66615c]' },
  { name: 'Happy Design Architect', initials: 'HD', accent: 'bg-[#f0e0cf] text-[#7d573c]' },
  { name: 'HSP', initials: 'HS', accent: 'bg-[#efe3d2] text-[#7b5d32]' },
  { name: 'HM Architect', initials: 'HM', accent: 'bg-[#ede5d6] text-[#6f5c42]' },
  { name: 'HPA', initials: 'HP', accent: 'bg-[#f0e5d5] text-[#7c5f33]' },
  { name: 'Kamlesh Mehta', initials: 'KM', accent: 'bg-[#f1e4d0] text-[#84622b]' },
  { name: 'KSADPS Architect', initials: 'KA', accent: 'bg-[#efe6d9] text-[#6e5a3a]' },
  { name: 'KSDPS', initials: 'KS', accent: 'bg-[#f4ead5] text-[#7d5f1b]' },
  { name: 'Logo', initials: 'LO', accent: 'bg-[#efe5d3] text-[#725c31]' },
  { name: 'Open Idea', initials: 'OI', accent: 'bg-[#ebe5dc] text-[#5d5752]' },
  { name: 'Open Ideas Architect', initials: 'OI', accent: 'bg-[#eedfcd] text-[#7d533d]' },
  { name: 'Pandya Association', initials: 'PA', accent: 'bg-[#f0e6d3] text-[#7b632e]' },
  { name: 'PlaceKinesis Associates', initials: 'PK', accent: 'bg-[#ebe3d6] text-[#625749]' },
  { name: 'Sam Architect', initials: 'SA', accent: 'bg-[#f0e8d9] text-[#7c632d]' },
  { name: 'Spline Design', initials: 'SD', accent: 'bg-[#efe5d3] text-[#7f5f25]' },
  { name: 'SRDA', initials: 'SR', accent: 'bg-[#eadecc] text-[#6d5636]' },
  { name: 'Studio 2+2', initials: 'S2', accent: 'bg-[#f2eadb] text-[#7a6130]' },
  { name: 'The Grid Architect', initials: 'TG', accent: 'bg-[#f0e7d6] text-[#715c2c]' },
  { name: 'Vivan Architect', initials: 'VA', accent: 'bg-[#efdfc8] text-[#8a5a28]' },
  { name: 'Vivan', initials: 'VI', accent: 'bg-[#ede4d4] text-[#6c5535]' },
  { name: 'Yatin Pandya', initials: 'YP', accent: 'bg-[#f2eada] text-[#7a612b]' },
];

const HERO_IMAGE = 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=80';

export default function ArchitectsPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] pt-24">
      <JsonLd data={breadcrumbSchema} />
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Architects We Work With - Setu Architects"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

        <Container className="relative z-10 flex min-h-[78vh] items-center justify-center py-20 text-center">
          <div className="max-w-5xl">
            <p className="mb-5 text-[0.72rem] md:text-sm font-bold uppercase tracking-[0.45em] text-[#f4d9a5]">
              Architects We Work With
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-[6.5rem] font-display font-bold uppercase tracking-[0.16em] text-white leading-[0.95]">
              Architects We Work With
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm md:text-lg text-white/85 leading-relaxed">
              A curated network of architects and design partners shaping modern spaces with creativity, clarity, and lasting structural impact.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative bg-white py-20 md:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-neutral-200" />
        <Container className="max-w-[90rem]">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[0.72rem] md:text-sm font-bold uppercase tracking-[0.4em] text-[#b08543]">
              Collaborators
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-[0.12em] text-neutral-900 leading-none">
              Our Architectural Partners
            </h2>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6">
              {ARCHITECTS.map((architect, idx) => (
                <div
                  key={idx}
                  className="group flex h-40 items-center justify-center rounded-2xl border border-neutral-200 bg-white px-4 text-center shadow-[0_6px_18px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d8c39a] hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c39a] ${architect.accent} text-[0.62rem] font-bold uppercase tracking-[0.22em]`}>
                      {architect.initials}
                    </div>
                    <span className="text-[0.78rem] sm:text-sm md:text-[0.95rem] font-semibold uppercase tracking-[0.16em] text-neutral-700 transition-colors group-hover:text-[#8b5e1c]">
                      {architect.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-center">
            <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
              &larr; Back to home
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/projects" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
              Explore Structural Projects &rarr;
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/contact" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
              Contact Us &rarr;
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
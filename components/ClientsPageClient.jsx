'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Container } from '@/components/ui';

const CLIENTS = [
  { name: 'Aastha', file: 'aastha.svg' },
  { name: 'Addor', file: 'addor.svg' },
  { name: 'Amiraj', file: 'amiraj.svg' },
  { name: 'Amar', file: 'amar.svg' },
  { name: 'Anikedhya', file: 'anikedhya.svg' },
  { name: 'Archi', file: 'archi-1.svg' },
  { name: 'Arvind', file: 'arvind.svg' },
  { name: 'Atishay', file: 'atishay.svg' },
  { name: 'Avirat', file: 'avirat.svg' },
  { name: 'Calica', file: 'calica.svg' },
  { name: 'Chanchal', file: 'chanchal.svg' },
  { name: 'Crest', file: 'crest.svg' },
  { name: 'Deep', file: 'deep.svg' },
  { name: 'Dharmadev', file: 'dharmadev.svg' },
  { name: 'Dutron', file: 'dutron.svg' },
  { name: 'Dwarkesh', file: 'dwarkesh.svg' },
  { name: 'Evercon', file: 'evercon.svg' },
  { name: 'Gala', file: 'gala.svg' },
  { name: 'Ganesh Housing', file: 'ganesh_housing.svg' },
  { name: 'Golden', file: 'golden.svg' },
  { name: 'HK', file: 'hk.svg' },
  { name: 'Jainam', file: 'jainam.svg' },
  { name: 'Kavisha', file: 'kavisha.svg' },
  { name: 'Lodha', file: 'lodha.svg' },
  { name: 'Madhav', file: 'madhav.svg' },
  { name: 'Mahadev', file: 'mahadev.svg' },
  { name: 'Maruti', file: 'maruti.svg' },
  { name: 'Miraj', file: 'miraj.svg' },
  { name: 'Mudra', file: 'mudra.svg' },
  { name: 'Nila', file: 'nila.svg' },
  { name: 'Radhe', file: 'radhe.svg' },
  { name: 'Rajshree', file: 'rajshree.svg' },
  { name: 'Rajyash', file: 'rajyash.svg' },
  { name: 'Ratna', file: 'ratna.svg' },
  { name: 'Safal', file: 'safal-1.svg' },
  { name: 'Samridhi', file: 'samridhi.svg' },
  { name: 'Sanskrut', file: 'sanskrut.svg' },
  { name: 'Sarthav', file: 'sarthav.svg' },
  { name: 'Satyam', file: 'satyam.svg' },
  { name: 'Satyamev', file: 'satyamev.svg' },
  { name: 'Saumya', file: 'saumya.svg' },
  { name: 'Shalby', file: 'shalby.svg' },
  { name: 'Sheetal', file: 'sheetal.svg' },
  { name: 'Sheth', file: 'sheth.svg' },
  { name: 'Shilp', file: 'shilp.svg' },
  { name: 'Shivalik', file: 'shivalik.svg' },
  { name: 'Shivalaya', file: 'shivalaya.svg' },
  { name: 'Shivganga', file: 'shivganga.svg' },
  { name: 'Sijcon', file: 'sijcon.svg' },
  { name: 'Shubh', file: 'shubh.svg' },
  { name: 'Shubh Group', file: 'shubh_group.svg' },
  { name: 'Siddhi', file: 'siddhi.svg' },
  { name: 'Siddhi Group', file: 'siddhi_group.svg' },
  { name: 'Sigma', file: 'sigma.svg' },
  { name: 'Soham', file: 'soham.svg' },
  { name: 'Sun', file: 'sun.svg' },
  { name: 'Surya', file: 'surya.svg' },
  { name: 'Tata Housing', file: 'tata_housing.svg' },
  { name: 'Venus', file: 'venus.svg' },
  { name: 'Visva', file: 'visva.svg' },
  { name: 'Yash', file: 'yash.svg' },
  { name: 'Zion', file: 'zion.svg' },
];

const HERO_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80';

function ClientCard({ client }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex h-36 items-center justify-center rounded-2xl border border-neutral-100 bg-white px-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:border-[#e2c98a]">
      {!imgError ? (
        <img
          src={`/img/developers_logo/${client.file}`}
          alt={`Client Developer Logo: ${client.name}`}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          className="max-h-16 max-w-full w-auto object-contain grayscale opacity-70 transition-all duration-400 group-hover:grayscale-0 group-hover:opacity-100"
        />
      ) : (
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-[#8b5e1c] transition-colors">
          {client.name}
        </span>
      )}
    </div>
  );
}

export default function ClientsPageClient() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] pt-24">
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Clients & Organizations Served - Setu Architects"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%)]" />

        <Container className="relative z-10 flex min-h-[78vh] items-center justify-center py-20 text-center">
          <div className="max-w-5xl">
            <p className="mb-5 text-[0.72rem] md:text-sm font-bold uppercase tracking-[0.45em] text-[#f4d9a5]">
              Client Directory
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-[6.5rem] font-display font-bold uppercase tracking-[0.16em] text-white leading-[0.95]">
              Clients & Organizations Served
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm md:text-lg text-white/85 leading-relaxed">
              Trusted by leading developers, builders, and visionaries who value thoughtful design and engineering excellence.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-neutral-200" />
        <Container className="max-w-[90rem]">
          <div className="mb-14 text-center">
            <p className="mb-3 text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.35em] text-[#b08543]">
              Directory
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-neutral-900">
              Our Valued Clients
            </h2>
            <p className="mt-4 text-sm text-neutral-500 max-w-lg mx-auto">
              A growing family of trusted developers and builders across Gujarat and beyond.
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-5">
              {CLIENTS.map((client, idx) => (
                <ClientCard key={idx} client={client} />
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]"
            >
              &larr; Back to home
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]"
            >
              View Our Projects &rarr;
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]"
            >
              Contact Us &rarr;
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

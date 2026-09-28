'use client';

import Image from 'next/image';
import { Container } from '@/components/ui';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import { useProjects } from '@/context/ProjectsContext';

export default function ProjectsPageClient() {
  const { projects } = useProjects();

  return (
    <main className="min-h-screen bg-[#f7f5ef] pt-24">
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=80"
          alt="Setu Architects Projects Portfolio"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_36%)]" />

        <Container className="relative z-10 flex min-h-[78vh] items-center justify-center py-20 text-center">
          <div className="max-w-5xl">
            <p className="mb-5 text-[0.72rem] md:text-sm font-bold uppercase tracking-[0.45em] text-[#f4d9a5]">
              Project Gallery
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-[6.5rem] font-display font-bold uppercase tracking-[0.16em] text-white leading-[0.95]">
              Setu Architects Projects
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm md:text-lg text-white/85 leading-relaxed">
              A curated portfolio of thoughtfully designed residential, commercial, industrial, and institutional structural engineering projects.
            </p>
          </div>
        </Container>
      </section>

      <ProjectsExplorer projects={projects} />
    </main>
  );
}

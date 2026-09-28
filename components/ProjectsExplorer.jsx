"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import Lightbox from '@/components/Lightbox';

export default function ProjectsExplorer({ projects }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxProject, setLightboxProject] = useState(null);

  // Dynamically generate categories from real data
  const categories = useMemo(() => {
    if (!projects || projects.length === 0) return [{ slug: 'all', label: 'All' }];
    
    // Extract unique categories
    const uniqueCats = [...new Set(projects.map(p => p.category).filter(Boolean))];
    
    const catArray = [
      { slug: 'all', label: 'All' },
      ...uniqueCats.map(c => ({ slug: c.toLowerCase(), label: c }))
    ];
    return catArray;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (activeCategory === 'all') return projects;
    return projects.filter((project) => project.category?.toLowerCase() === activeCategory);
  }, [activeCategory, projects]);

  return (
    <section className="relative bg-white py-16 md:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-neutral-200" />

      <Container className="max-w-[90rem]">
        <div className="mb-10 text-center">
          <p className="mb-4 text-[0.72rem] md:text-sm font-bold uppercase tracking-[0.4em] text-[#b08543]">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-[0.12em] text-neutral-900 leading-none">
            Our Structural & Architectural Projects
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={`px-5 py-2 text-[0.68rem] md:text-xs font-bold uppercase tracking-[0.28em] border transition-all duration-200 ${
                activeCategory === category.slug
                  ? 'bg-[#8b5e1c] text-white border-[#8b5e1c]'
                  : 'border-neutral-300 text-neutral-600 hover:border-[#8b5e1c] hover:text-[#8b5e1c]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <p className="text-center text-neutral-600">No projects available in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setLightboxProject(project)}
                className="group relative aspect-[4/3] overflow-hidden rounded-[14px] bg-neutral-100 text-left shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <img
                  src={project.img}
                  alt={`Setu Architects Structural Project: ${project.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.34em] text-white/85">
                    {project.category}
                  </p>
                  <h3 className="text-lg md:text-xl font-display font-bold uppercase tracking-tight leading-tight">
                    {project.name}
                  </h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 text-3xl font-light text-white backdrop-blur-sm">
                    +
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-center">
          <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            &larr; Back to home
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/clients" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            View Our Clients &rarr;
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/contact" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            Discuss Your Project &rarr;
          </Link>
        </div>
      </Container>

      {lightboxProject && (
        <Lightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
      )}
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Building2,
  Phone,
  Mail,
  HardHat,
  Ruler,
  Factory,
  CheckCircle2,
  LogIn,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import AdminLoginModal from '@/components/admin/AdminLoginModal';
import Lightbox from '@/components/Lightbox';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useProjects } from '@/context/ProjectsContext';

// --- DATA ---
const HERO_SLIDES = [
  { id: 1, title: 'ITC Narmada', desc: 'Luxury redefined. A premium commercial development in the heart of the city.', bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000' },
  { id: 2, title: 'Titanium Square', desc: 'State-of-the-art corporate park designed for next-generation enterprises.', bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000' },
  { id: 3, title: 'Shivalik Curv', desc: 'A striking architectural masterpiece blending modern geometry with sustainable living.', bg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000' },
];

const SERVICES = [
  { id: 1, title: 'Structural design', icon: Building2 },
  { id: 2, title: 'Civil engineering', icon: HardHat },
  { id: 3, title: 'Architectural design', icon: Ruler },
  { id: 4, title: 'Earth retaining structure', icon: CheckCircle2 },
  { id: 5, title: 'Quantity Surveying', icon: CheckCircle2 },
  { id: 6, title: 'Supervision during execution', icon: CheckCircle2 },
  { id: 7, title: 'MEPF Design', icon: Factory },
];

// --- COMPONENTS ---
export default function HomePageClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin, logout } = useAdminAuth();
  const { projects } = useProjects();
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Check for OAuth or Auth error parameter to display in Admin Login modal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error')) {
      setShowAdminLogin(true);
    }
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send your message right now.');
      }

      setStatusMessage({
        type: 'success',
        text: 'Your message has been sent successfully. A confirmation email has been sent to your inbox.'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatusMessage({ type: 'error', text: error.message || 'Something went wrong.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col w-full bg-white text-neutral-900">

      {/* 1. HERO SLIDER */}
      <section className="relative h-[78vh] md:h-screen w-full overflow-hidden bg-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.2)] z-20">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide].bg}
              alt={HERO_SLIDES[currentSlide].title}
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              quality={85}
              className="object-cover"
            />
            {/* Dark Overlay for legibility */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Premium bottom inner shadow gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center sm:text-left">
            <h1 className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#f4d9a5] mb-3">
              Setu Architects &bull; Architectural & Structural Engineering Services
            </h1>
            <motion.h2
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[2.6rem] sm:text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tight"
            >
              {HERO_SLIDES[currentSlide].title}
            </motion.h2>
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-neutral-200 mb-10 max-w-xl"
            >
              {HERO_SLIDES[currentSlide].desc}
            </motion.p>
            <motion.div
              key={`btn-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center sm:justify-start"
            >
              <Button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                rightIcon={ArrowRight} 
                className="bg-white text-neutral-900 hover:bg-neutral-100 hover:text-black"
              >
                Explore Services
              </Button>
              <Link href="/projects">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  View Projects
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slider Controls & Counter */}
        <div className="absolute bottom-12 left-0 right-0 z-20">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-white">
            <div className="font-display font-bold text-xl tracking-widest">
              0{currentSlide + 1} <span className="text-neutral-400 font-normal">/ 0{HERO_SLIDES.length}</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={prevSlide} className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors" aria-label="Previous slide">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={nextSlide} className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors" aria-label="Next slide">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="relative py-24 bg-[#f9f7f3] overflow-hidden">
        <div className="absolute left-0 top-4 -translate-y-6 select-none pointer-events-none text-[8rem] md:text-[12rem] lg:text-[14rem] font-display font-black uppercase leading-none text-neutral-200/80 tracking-[-0.08em]">ABOUT</div>

        <Container className="max-w-[90rem] relative">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-0 border-t border-neutral-300">
            {/* Left Col - Text */}
            <div className="lg:border-r border-neutral-300 px-0 lg:pr-16 py-12 lg:py-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b08543] mb-8">About</p>

              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-5 tracking-tight">General History</h2>
                <p className="text-neutral-600 leading-relaxed text-lg max-w-xl">
                  SETU ARCHITECTURE was established in 1988. We have specialization in Structural and Earth retaining design of residential, commercial, industrial and public related structure as well as MEPF design.
                </p>
                <div className="mt-4">
                  <Link href="/about" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-[#8b5e1c] hover:underline">
                    Read More About Us &rarr;
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-5 tracking-tight">Design Principle</h2>
                <p className="text-neutral-600 leading-relaxed text-lg max-w-xl">
                  We are professionals not businessmen. We believe that any building design by an Architect has its own importance, functionality and uniqueness. We respect the effort by an Architect and client so we suggest the structural system in such a way that it will not disturb the soul of the building.
                </p>
              </div>
            </div>

            {/* Right Col - Services */}
            <div className="py-12 lg:py-16 px-0 lg:pl-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-10 tracking-tight">Scope of Services</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8">
                {SERVICES.map((s) => (
                  <div key={s.id} className="group flex flex-col items-center text-center border border-neutral-200 bg-white/80 rounded-2xl p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#c6a15d] transition-all duration-300">
                    <div className="h-16 w-16 bg-[#fbf7ef] border border-[#d8c39a] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#f6ead2] transition-colors">
                      <s.icon className="h-7 w-7 text-[#8b5e1c]" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-800">{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. RECENT PROJECTS SECTION */}
      <section className="py-24 bg-[#f6f4ef] border-y border-neutral-200">
        <Container className="max-w-[90rem]">
          <div className="mb-12 text-center">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-[#b08543] mb-4">Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#141414] tracking-[0.14em] uppercase leading-none">Our Recent Projects</h2>
          </div>

          <div className="relative group/carousel">
            {/* Scroll Container */}
            <div 
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group relative cursor-pointer overflow-hidden bg-white h-[420px] min-w-[300px] sm:min-w-[380px] xl:min-w-[400px] border border-white/50 rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] snap-start flex-shrink-0"
                  onClick={() => setSelectedProject(proj)}
                >
                  <img
                    src={proj.img}
                    alt={`Architectural & Structural Project: ${proj.name}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
                  <div className="absolute left-6 bottom-6 right-6 text-white">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.32em] text-white/85 mb-2">{proj.category}</p>
                    <h3 className="text-lg md:text-xl font-display font-bold uppercase tracking-tight leading-tight">{proj.name}</h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-16 w-16 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-light">
                      +
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={scrollLeft}
              className="absolute left-[-18px] top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#8b5e1c] shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#d8c39a] hover:bg-white transition-all z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="absolute right-[-18px] top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#8b5e1c] shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#d8c39a] hover:bg-white transition-all z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </section>

      {/* 4. CLIENTS SECTION */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute right-0 top-0 select-none pointer-events-none text-[4rem] md:text-[6rem] lg:text-[8rem] font-display font-black uppercase tracking-[0.08em] text-neutral-200/80">
          CLIENTS
        </div>

        <Container className="max-w-[90rem] relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-[#b08543] mb-4">Clients</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-neutral-900 tracking-[0.14em] uppercase leading-none mb-6">Our Clients</h2>
            <p className="text-neutral-600 leading-relaxed text-lg mb-8">
              We are proud to work with a diverse set of clients across residential, commercial, industrial, and institutional segments.
            </p>
            <Link href="/clients" className="inline-flex items-center bg-[#8b5e1c] text-white px-8 py-3 rounded-full font-bold uppercase tracking-[0.24em] hover:bg-[#6b4512] transition-colors">
              View All Clients
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. CONTACT SECTION */}
      <section className="relative py-24 bg-[#f7f5f1] text-neutral-900 overflow-hidden">
        <div className="absolute left-0 top-0 select-none pointer-events-none text-[4rem] md:text-[6rem] lg:text-[8rem] font-display font-black uppercase tracking-[-0.06em] text-neutral-300/70">
          CONTACTS
        </div>

        <Container className="max-w-[90rem] relative">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
            {/* Contact Details */}
            <div className="pt-14 lg:pt-24">
              <div className="space-y-8 max-w-sm">
                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-[#8b5e1c] shrink-0 mt-1" />
                  <div>
                    <a href="tel:+919428873366" className="block text-base sm:text-lg hover:text-[#8b5e1c] transition-colors">+91 9428873366</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="h-6 w-6 text-[#8b5e1c] shrink-0 mt-1" />
                  <div>
                    <a href="mailto:setuarchitect@gmail.com" className="text-base sm:text-lg hover:text-[#8b5e1c] transition-colors">setuarchitect@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:pt-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8 sm:mb-12 text-neutral-900 tracking-tight">Get in touch</h2>

              <form className="max-w-3xl" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-100 border border-neutral-200 rounded-sm px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#8b5e1c] transition-colors"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-100 border border-neutral-200 rounded-sm px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#8b5e1c] transition-colors"
                      placeholder="abc@example.com"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-600 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-100 border border-neutral-200 rounded-sm px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#8b5e1c] transition-colors"
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-neutral-600 mb-2">Message</label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-100 border border-neutral-200 rounded-sm px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#8b5e1c] transition-colors"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                {statusMessage.text ? (
                  <p className={`mb-4 text-sm ${statusMessage.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>
                    {statusMessage.text}
                  </p>
                ) : null}

                <div className="flex justify-center sm:justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#a1722a] text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.18em] shadow-[0_10px_30px_rgba(161,114,42,0.35)] hover:bg-[#8b5e1c] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send →'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 py-12 border-t border-white/10 text-neutral-500 text-sm">
        <Container className="max-w-[90rem] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/" title="Setu Architects — Home">
              <Image
                src="/images/setu-logo-white.png"
                alt="Setu Architects"
                width={72}
                height={58}
                loading="lazy"
                className="w-auto h-10 md:h-12 object-contain"
              />
            </Link>
            <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              <Link href="/architects" className="hover:text-white transition-colors">Architects</Link>
              <Link href="/clients" className="hover:text-white transition-colors">Clients</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>
          <p>© {new Date().getFullYear()} Setu Architects. All Rights Reserved.</p>

          {/* Maintained by + Admin Login Icon */}
          <div className="flex items-center gap-3">
            <p>Maintained by Antigravity</p>

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  title="Admin Dashboard"
                  className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-200"
                >
                  <LayoutDashboard className="w-4 h-4" />
                </Link>
                <button
                  id="admin-logout-btn"
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="admin-login-btn"
                onClick={() => setShowAdminLogin(true)}
                title="Admin Login"
                className="p-1.5 rounded-lg text-neutral-600 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>
        </Container>
      </footer>

      {/* ADMIN LOGIN MODAL */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
      />

      {/* LIGHTBOX MODAL WITH FULL DETAILS */}
      {selectedProject && (
        <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

    </main>
  );
}

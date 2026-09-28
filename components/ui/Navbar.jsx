'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Instagram, Linkedin, Facebook } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  {
    name: 'About us',
    href: '/about',
    dropdown: [
      { name: 'Clients Directory', href: '/clients' },
      { name: 'Architects We Work With', href: '/architects' }
    ]
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Hide Navbar completely on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isLandingPage = pathname === '/';
  const shouldUseLightHeader = !isLandingPage || isScrolled;

  const textColorClass = shouldUseLightHeader ? 'text-neutral-900' : 'text-white';
  const textMutedClass = shouldUseLightHeader ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-200 hover:text-white';
  const logoIconBg = shouldUseLightHeader ? 'bg-primary-100 group-hover:bg-primary-200' : 'bg-white/20 group-hover:bg-white/30';
  const logoIconColor = shouldUseLightHeader ? 'text-primary-800' : 'text-white';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        shouldUseLightHeader
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Socials */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center group">
              <Image
                src={shouldUseLightHeader ? '/images/setu-logo.png' : '/images/setu-logo-white.png'}
                alt="Setu Architects"
                width={90}
                height={72}
                className="w-auto h-12 sm:h-14 object-contain transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const hasDropdown = !!link.dropdown;

              return (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest transition-colors",
                      isActive ? textColorClass : textMutedClass
                    )}
                  >
                    {link.name}
                    {hasDropdown && <ChevronDown className="h-3 w-3" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-neutral-100/50 rounded-2xl overflow-hidden"
                        >
                          <div className="p-3 flex flex-col gap-1">
                            {link.dropdown.map(sublink => (
                              <Link
                                key={sublink.name}
                                href={sublink.href}
                                className="group flex items-center justify-between px-4 py-3 text-[0.8rem] font-bold uppercase tracking-[0.15em] text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50/80 rounded-xl transition-all duration-300"
                              >
                                <span>{sublink.name}</span>
                                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[#b08543]" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn("lg:hidden p-2 focus:outline-none transition-colors", textColorClass)}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-x-0 top-[60px] bg-white border-t border-neutral-100 overflow-y-auto"
          >
            <div className="px-4 py-8 flex flex-col gap-6">
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  const hasDropdown = !!link.dropdown;

                  return (
                    <div key={link.name} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          className={cn(
                            'px-4 py-3 text-sm font-bold uppercase tracking-widest rounded-sm transition-colors flex-grow',
                            isActive
                              ? 'bg-neutral-50 text-neutral-900'
                              : 'text-neutral-600 hover:bg-neutral-50'
                          )}
                        >
                          {link.name}
                        </Link>
                        {hasDropdown && (
                          <button 
                            className="p-3 text-neutral-500"
                            onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                          >
                            <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === link.name ? "rotate-180" : "")} />
                          </button>
                        )}
                      </div>
                      
                      {/* Mobile Dropdown */}
                      <AnimatePresence>
                        {hasDropdown && activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden bg-neutral-50 ml-4 rounded-sm"
                          >
                            <div className="py-2 flex flex-col">
                              {link.dropdown.map(sublink => (
                                <Link
                                  key={sublink.name}
                                  href={sublink.href}
                                  className="px-6 py-2.5 text-sm font-medium text-neutral-500 hover:text-neutral-900"
                                >
                                  {sublink.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className="h-px bg-neutral-100 w-full" />

              <div className="flex items-center justify-center gap-6 pb-20">
                <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

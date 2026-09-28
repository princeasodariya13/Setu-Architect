"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui';

const CONTACT_POINTS = [
  {
    title: 'Call Us',
    value: '+91 9428873366',
    href: 'tel:+919428873366'
  },
  {
    title: 'Email',
    value: 'setuarchitect@gmail.com',
    href: 'mailto:setuarchitect@gmail.com'
  },
  {
    title: 'Location',
    value: 'Ahmedabad, Gujarat',
    href: '#'
  }
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (event) => {
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
        headers: { 'Content-Type': 'application/json' },
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
    <main className="min-h-screen bg-[#f7f5ef] pt-24">
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80"
          alt="Contact Setu Architects"
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
              Contact Setu Architects
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-[6.5rem] font-display font-bold uppercase tracking-[0.16em] text-white leading-[0.95]">
              Contact Setu Architects
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm md:text-lg text-white/85 leading-relaxed">
              Reach out to discuss your project vision, structural engineering requirements, or architectural enquiry with our expert team in Ahmedabad.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative bg-white py-20 md:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-neutral-200" />
        <Container className="max-w-[90rem]">
          <div className="mb-10 text-center">
            <p className="mb-2 text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.3em] text-[#b08543]">
              Contact Information
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-neutral-900">
              Connect With Us
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {CONTACT_POINTS.map((point) => (
              <div
                key={point.title}
                className="rounded-xl border border-neutral-100 bg-[#faf9f5] px-4 py-8 text-center"
              >
                <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#b08543]">
                  {point.title}
                </p>
                {point.href === '#' ? (
                  <p className="text-xs md:text-sm font-medium uppercase tracking-[0.12em] text-neutral-700">
                    {point.value}
                  </p>
                ) : (
                  <a
                    href={point.href}
                    className="text-xs md:text-sm font-medium uppercase tracking-[0.12em] text-neutral-700 transition-colors hover:text-[#8b5e1c]"
                  >
                    {point.value}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-20 bg-[#f7f5f1]">
        <Container className="max-w-[90rem]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[24px] border border-neutral-200 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.4em] text-[#b08543]">Location</p>
              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-[0.12em] text-neutral-900">Visit Our Studio</h3>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Ahmedabad, Gujarat — a hub for modern design, structural engineering coordination, and earth retaining structures.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200">
                <iframe
                  title="Setu Architecture office location map"
                  src="https://www.google.com/maps?q=Ahmedabad%20Gujarat&z=12&output=embed"
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[24px] border border-neutral-200 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            >
              <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.4em] text-[#b08543]">Send a Message</p>
              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-[0.12em] text-neutral-900">Contact Form</h3>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-300 bg-[#fbfaf7] px-4 py-3 outline-none focus:border-[#8b5e1c]"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-300 bg-[#fbfaf7] px-4 py-3 outline-none focus:border-[#8b5e1c]"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-300 bg-[#fbfaf7] px-4 py-3 outline-none focus:border-[#8b5e1c]"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[160px] w-full rounded-xl border border-neutral-300 bg-[#fbfaf7] px-4 py-3 outline-none focus:border-[#8b5e1c]"
                    placeholder="Tell us about your project"
                    required
                  />
                </div>

                {statusMessage.text && (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      statusMessage.type === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-rose-200 bg-rose-50 text-rose-700'
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center rounded-full bg-[#8b5e1c] px-7 py-3 text-sm font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-[#6b4512] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-[90rem] flex flex-wrap items-center justify-center gap-6 text-center">
          <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            &larr; Back to home
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/about" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            About Setu Architects &rarr;
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/projects" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-[#8b5e1c] transition-colors hover:text-[#6b4512]">
            View Portfolio &rarr;
          </Link>
        </Container>
      </section>
    </main>
  );
}

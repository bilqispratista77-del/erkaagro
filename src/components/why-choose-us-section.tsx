'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

const REASONS = [
  {
    number: '01',
    title: 'Reliable Sourcing Network',
    copy: 'We coordinate supply through selected farmers, suppliers, and processing partners based on product availability and buyer requirements.',
  },
  {
    number: '02',
    title: 'Quality-Focused Coordination',
    copy: 'Product preparation and inspection are coordinated according to agreed specifications before shipment.',
  },
  {
    number: '03',
    title: 'Flexible Buyer Requirements',
    copy: 'We can discuss product form, packaging, inspection, and other commercial requirements according to supplier capability and order terms.',
  },
  {
    number: '04',
    title: 'Export-Oriented Support',
    copy: 'We support the coordination of commercial documents, product readiness, and shipment requirements for international transactions.',
  },
  {
    number: '05',
    title: 'Responsive Communication',
    copy: 'Our communication approach is clear, practical, and focused on helping buyers make informed purchasing decisions.',
  },
  {
    number: '06',
    title: 'Long-Term Partnership',
    copy: 'We value repeat business and aim to build reliable supply relationships based on transparency, consistency, and mutual understanding.',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-cream/50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <div className="lg:grid lg:grid-cols-[5fr_6fr] lg:gap-12 xl:gap-20 items-center">

          {/* ===== LEFT: Image Composition ===== */}
          <FadeIn className="relative mb-12 lg:mb-0">
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-ivory">
                <img
                  src="/about/why-erka-agro.jpg"
                  alt="Erka Agro Sourcing / Product Image"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-[1.03]"
                />
              </div>

              {/* Decorative gold line — bottom-left of main image */}
              <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-[12px] border-2 border-gold/30 hidden sm:block" aria-hidden="true" />

              {/* Small overlapping accent image (reuses turmeric) */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 w-32 sm:w-36 aspect-[4/5] rounded-[12px] overflow-hidden shadow-lg border-4 border-white hidden sm:block">
                <img
                  src="/about/accent.jpg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>

          {/* ===== RIGHT: Content ===== */}
          <div>
            {/* Section Intro */}
            <FadeIn>
              <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
                Why Erka Agro
              </p>
              <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
                A Reliable Partner for
                <br />
                Indonesian Agricultural Supply
              </h2>
              <p className="text-text-muted text-sm sm:text-[15px] lg:text-base leading-relaxed mb-10 lg:mb-12">
                We combine local sourcing coordination, quality awareness, export
                support, and responsive communication to help international buyers
                source Indonesian agricultural products with greater clarity and
                confidence.
              </p>
            </FadeIn>

            {/* 6 Reasons — 2-column on desktop, 1-col on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
              {REASONS.map((item, i) => (
                <FadeIn key={item.number} delay={i * 80}>
                  <div className="group py-4 border-b border-border-warm/40 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <span className="text-gold/60 text-xs font-bold tracking-wider tabular-nums mt-1 shrink-0 transition-colors duration-200 group-hover:text-gold">
                        {item.number}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-text-main text-[15px] sm:text-base font-bold leading-snug mb-1">
                          {item.title}
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed">
                          {item.copy}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Eye, Droplets, Filter, Tag, Search, FlaskConical, PackageCheck, ClipboardCheck } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import type { LucideIcon } from 'lucide-react';

interface Checkpoint {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
}

const CHECKPOINTS: Checkpoint[] = [
  {
    number: '01',
    title: 'Raw Material Selection',
    copy: 'Raw materials are selected based on the required product characteristics, condition, and agreed order requirements.',
    icon: Filter,
  },
  {
    number: '02',
    title: 'Visual Inspection',
    copy: 'Product appearance, general condition, and visible defects are reviewed during preparation.',
    icon: Eye,
  },
  {
    number: '03',
    title: 'Sorting & Cleaning',
    copy: 'Applicable sorting and cleaning processes are coordinated according to product form and buyer requirements.',
    icon: ClipboardCheck,
  },
  {
    number: '04',
    title: 'Moisture Monitoring',
    copy: 'Moisture levels are monitored where applicable based on agreed product specifications.',
    icon: Droplets,
  },
  {
    number: '05',
    title: 'Foreign Matter Control',
    copy: 'Product preparation includes attention to visible foreign matter and general cleanliness.',
    icon: Search,
  },
  {
    number: '06',
    title: 'Batch Identification',
    copy: 'Product lots can be identified and coordinated according to order and shipment requirements.',
    icon: Tag,
  },
  {
    number: '07',
    title: 'Pre-Shipment Inspection',
    copy: 'Applicable product and packaging checks are carried out before final shipment preparation.',
    icon: PackageCheck,
  },
  {
    number: '08',
    title: 'Laboratory Testing',
    copy: 'Relevant laboratory testing can be arranged upon request based on product, buyer, and destination-market requirements.',
    icon: FlaskConical,
  },
];

export function QualityCommitmentSection() {
  return (
    <section id="quality" className="bg-cream/50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <div className="lg:grid lg:grid-cols-[9fr_11fr] lg:gap-12 xl:gap-20 items-start">

          <FadeIn className="relative mb-10 lg:mb-0 lg:sticky lg:top-24">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-ivory">
                <img
                  src="/about/quality-commitment.jpg"
                  alt="Quality inspection of Indonesian spices before export preparation"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-[1.03]"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-gold/30 rounded-br-[16px] hidden sm:block" aria-hidden="true" />
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">
                  Quality Commitment
                </p>
                <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
              </div>
              <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
                Quality Starts with
                <br />
                Clear Specifications
              </h2>
              <p className="text-text-muted text-sm sm:text-[15px] lg:text-base leading-relaxed">
                Product quality begins with a clear understanding of buyer requirements.
                We coordinate sourcing, preparation, inspection, and applicable testing
                to help ensure the product is aligned with the agreed specification before
                shipment.
              </p>
            </FadeIn>

            <FadeIn delay={100} className="mt-8 pt-6 border-t border-border-warm/50">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/60 mb-5">
                Quality Checkpoints
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
                {CHECKPOINTS.map((cp, i) => {
                  const Icon = cp.icon;
                  return (
                    <FadeIn key={cp.number} delay={150 + i * 50}>
                      <div className="group flex items-start gap-3 py-4 border-b border-border-warm/40 last:border-b-0">
                        <div className="shrink-0 mt-0.5">
                          <div className="w-8 h-8 rounded-lg border border-border-warm/60 bg-ivory/80 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300">
                            <Icon className="size-3.5 text-forest/50 group-hover:text-gold transition-colors duration-300" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-gold/50 text-[10px] font-bold tracking-[0.1em] transition-colors duration-200 group-hover:text-gold">
                              {cp.number}
                            </span>
                            <h3 className="text-forest text-[13px] sm:text-sm font-bold leading-snug">
                              {cp.title}
                            </h3>
                          </div>
                          <p className="text-text-muted text-xs sm:text-[13px] leading-relaxed">
                            {cp.copy}
                          </p>
                          {cp.number === '04' && (
                            <div className="flex gap-4 mt-2">
                              <span className="text-[11px] text-text-muted/70">
                                <span className="font-semibold text-text-main">Long Pepper:</span> {'< 12%'}
                              </span>
                              <span className="text-[11px] text-text-muted/70">
                                <span className="font-semibold text-text-main">Turmeric:</span> {'< 10%'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

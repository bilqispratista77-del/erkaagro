'use client';

import { ClipboardList, MapPin, Network, CheckCircle, Settings, Search, Package, Ship, ChevronRight } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import type { LucideIcon } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Buyer Requirement',
    copy: 'Understanding the required product, specification, quantity, packaging, and destination.',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Source Identification',
    copy: 'Identifying suitable sourcing options based on availability and buyer criteria.',
    icon: MapPin,
  },
  {
    number: '03',
    title: 'Supplier Coordination',
    copy: 'Coordinating with farmers, suppliers, and processing partners regarding preparation.',
    icon: Network,
  },
  {
    number: '04',
    title: 'Product Selection',
    copy: 'Raw materials selected and prepared based on agreed characteristics and requirements.',
    icon: CheckCircle,
  },
  {
    number: '05',
    title: 'Processing & Preparation',
    copy: 'Cleaning, sorting, drying, slicing, or grinding coordinated to required product form.',
    icon: Settings,
  },
  {
    number: '06',
    title: 'Quality Inspection',
    copy: 'Product condition and quality parameters reviewed before packing and shipment.',
    icon: Search,
  },
  {
    number: '07',
    title: 'Packaging & Documentation',
    copy: 'Packaging and commercial or export documentation prepared per agreed transaction.',
    icon: Package,
  },
  {
    number: '08',
    title: 'Export Shipment',
    copy: 'Shipment coordinated from Indonesia according to the agreed shipping terms.',
    icon: Ship,
  },
];

function ProcessCard({ step, index, total }: { step: Step; index: number; total: number }) {
  const Icon = step.icon;
  const isLastInRow = (index % 4 === 3);
  const isLastOverall = index === total - 1;
  const showArrow = !isLastInRow && !isLastOverall;

  return (
    <FadeIn delay={index * 80} className="group relative">
      <div className="relative bg-white rounded-2xl border border-border-warm/50 p-5 sm:p-6 h-full transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-forest/5">
        {/* Top row: number + icon */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-gold/50 text-xs font-bold tracking-[0.12em] group-hover:text-gold transition-colors duration-300">
            {step.number}
          </span>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest/5 flex items-center justify-center group-hover:bg-forest group-hover:scale-105 transition-all duration-300">
            <Icon className="size-4 sm:size-[18px] text-forest/50 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-forest text-sm sm:text-[15px] font-bold leading-snug mb-2 group-hover:text-forest-dark transition-colors duration-200">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed">
          {step.copy}
        </p>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>

      {/* Connector arrow — desktop */}
      {showArrow && (
        <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full bg-ivory border border-border-warm/40">
          <ChevronRight className="size-3 text-gold/50" />
        </div>
      )}
    </FadeIn>
  );
}

export function OriginToShipmentSection() {
  return (
    <section className="bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">

        {/* Section Intro */}
        <FadeIn className="max-w-2xl mb-14 sm:mb-16 lg:mb-20">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Our Process
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
            From Origin{' '}
            <span className="text-forest/40">to</span>{' '}
            Shipment
          </h2>
          <p className="text-text-muted text-sm sm:text-[15px] lg:text-base leading-relaxed">
            Every order starts with a clear understanding of the buyer&apos;s requirements.
            From sourcing and product preparation to inspection, documentation, and
            shipment, we coordinate each stage according to the agreed transaction.
          </p>
        </FadeIn>

        {/* Desktop & Tablet: 4-col grid with connectors */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-5 lg:gap-y-6">
            {STEPS.map((step, i) => (
              <ProcessCard key={step.number} step={step} index={i} total={STEPS.length} />
            ))}
          </div>
        </div>

        {/* Mobile: Vertical connected cards */}
        <div className="sm:hidden relative">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-forest/10 via-gold/20 to-forest/10" aria-hidden="true" />

          <div className="flex flex-col gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.number} delay={i * 60} className="group relative">
                  <div className="relative bg-white rounded-2xl border border-border-warm/50 pl-12 pr-5 py-5 transition-all duration-300 hover:border-gold/40 hover:shadow-md hover:shadow-forest/5">
                    {/* Connected circle on the line */}
                    <div className="absolute left-[-18px] top-5 w-9 h-9 rounded-full bg-white border-2 border-border-warm/40 flex items-center justify-center group-hover:border-gold group-hover:bg-forest transition-all duration-300 z-10">
                      <Icon className="size-4 text-forest/40 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Step number */}
                    <span className="text-gold/50 text-[10px] font-bold tracking-[0.12em] group-hover:text-gold transition-colors duration-300">
                      Step {step.number}
                    </span>

                    {/* Title */}
                    <h3 className="text-forest text-sm font-bold leading-snug mt-1 mb-1.5 group-hover:text-forest-dark transition-colors duration-200">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-muted text-[13px] leading-relaxed">
                      {step.copy}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

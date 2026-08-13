'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Package, FileCheck, Globe, MessageSquare } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

const VALUES = [
  {
    number: '01',
    label: 'Supply Reliability',
    title: 'Reliable Supply Coordination',
    description:
      'We coordinate product availability with selected supply partners based on the required quantity, product form, and agreed commercial requirements.',
    icon: Package,
  },
  {
    number: '02',
    label: 'Specification Clarity',
    title: 'Clear Product Specifications',
    description:
      'Product requirements are discussed and confirmed before preparation, helping buyers align product characteristics with their intended market or application.',
    icon: FileCheck,
  },
  {
    number: '03',
    label: 'Export Support',
    title: 'Export-Ready Support',
    description:
      'We support commercial documentation, product preparation, packaging coordination, and shipment arrangements according to the agreed transaction.',
    icon: Globe,
  },
  {
    number: '04',
    label: 'Buyer Communication',
    title: 'Responsive Communication',
    description:
      'Clear and timely communication helps keep buyers informed from the initial inquiry through order preparation and shipment.',
    icon: MessageSquare,
  },
];

function ValueBlock({ value, index }: { value: (typeof VALUES)[number]; index: number }) {
  const Icon = value.icon;
  return (
    <FadeIn
      delay={index === 0 ? 100 : index === 1 ? 200 : index === 2 ? 300 : 400}
      className="group"
    >
      <div className="h-full p-6 lg:p-7 rounded-[16px] border border-border-warm/50 bg-white/60 hover:border-border-warm hover:bg-white transition-all duration-300">
        {/* Number + Icon */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-gold text-xs font-bold tracking-wider tabular-nums transition-colors duration-300 group-hover:text-gold-light">
            {value.number}
          </span>
          <div className="w-px h-4 bg-border-warm" />
          <Icon
            className="size-4 text-gold/70 transition-colors duration-300 group-hover:text-gold"
            strokeWidth={1.5}
          />
        </div>

        {/* Label */}
        <p className="text-text-muted/70 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.1em] mb-2">
          {value.label}
        </p>

        {/* Heading */}
        <h3 className="text-forest text-base sm:text-[17px] font-bold leading-snug mb-2.5">
          {value.title}
        </h3>

        {/* Separator */}
        <div className="w-6 h-px bg-gold/30 mb-3" />

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed">
          {value.description}
        </p>
      </div>
    </FadeIn>
  );
}

export function ValuePropositionSection() {
  return (
    <section className="bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        {/* Top: Intro + Grid */}
        <div className="lg:grid lg:grid-cols-[2fr_3fr] lg:gap-12 xl:gap-16">
          {/* Left: Section Intro */}
          <FadeIn>
            <div className="lg:sticky lg:top-28 lg:self-start lg:max-w-md mb-12 lg:mb-0">
              <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
                Built for B2B Sourcing
              </p>
              <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
                Finding the Right Supplier
                <br />
                Shouldn't Be Complicated
              </h2>
              <p className="text-text-muted text-sm sm:text-[15px] lg:text-base leading-relaxed">
                International sourcing requires more than finding the right product.
                Buyers also need clear specifications, dependable supply coordination,
                export readiness, and responsive communication throughout the
                transaction.
              </p>

              {/* Thin gold divider — desktop only */}
              <div className="hidden lg:block mt-10 w-12 h-px bg-gold/40" />
            </div>
          </FadeIn>

          {/* Right: 2x2 Value Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {VALUES.map((value, i) => (
              <ValueBlock key={value.number} value={value} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

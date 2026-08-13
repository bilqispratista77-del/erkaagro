'use client';

import { FadeIn } from '@/components/fade-in';
import { MapPin, Truck, Globe, ClipboardCheck } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: MapPin,
    label: 'East Java, Indonesia',
  },
  {
    icon: Truck,
    label: '40 Tons/Month Supply Capacity',
  },
  {
    icon: Globe,
    label: 'International Trade Support',
  },
  {
    icon: ClipboardCheck,
    label: 'Buyer-Oriented Specifications',
  },
];

export function TrustStrip() {
  return (
    <section className="border-t border-b border-border-warm bg-white py-5 md:py-6">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-16">
        <FadeIn delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 md:gap-3"
              >
                <item.icon
                  className="size-4 md:size-[18px] text-gold shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-sm md:text-[15px] font-medium text-text-main leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

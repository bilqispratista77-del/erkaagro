'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Ship,
  Plane,
  Package,
  MapPin,
} from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import type { LucideIcon } from 'lucide-react';

interface ShippingOption {
  title: string;
  label: string;
  copy: string;
  icon: LucideIcon;
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    title: 'Sea Freight',
    label: 'BULK SHIPMENT',
    copy: 'Suitable for bulk commercial shipments and larger order quantities.',
    icon: Ship,
  },
  {
    title: 'Air Freight',
    label: 'FASTER DELIVERY',
    copy: 'Available for selected urgent or smaller-volume shipments where applicable.',
    icon: Plane,
  },
  {
    title: 'Sample Courier',
    label: 'PRODUCT SAMPLE',
    copy: 'Suitable for product samples and small evaluation quantities before commercial orders.',
    icon: Package,
  },
];

interface TradeRow {
  label: string;
  value: string;
  note?: string;
}

const TRADE_ROWS_LEFT: TradeRow[] = [
  {
    label: 'INCOTERMS',
    value: 'FOB / CIF*',
    note: '*Available shipping terms depend on the selected product and agreed transaction.',
  },
  {
    label: 'PAYMENT',
    value: 'T/T, L/C',
  },
  {
    label: 'MINIMUM ORDER',
    value: '1 Ton',
  },
];

const TRADE_ROWS_RIGHT: TradeRow[] = [
  {
    label: 'SUPPLY CAPACITY',
    value: '40 Tons / Month',
  },
  {
    label: 'LOADING PORT',
    value: 'Tanjung Perak, Surabaya',
  },
  {
    label: 'AVAILABILITY',
    value: 'Year-Round',
  },
];

export function ShippingTradeSection() {
  return (
    <section className="bg-cream/50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">

        {/* Section Intro */}
        <FadeIn className="max-w-2xl mb-14 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">
              Shipping & Trade
            </p>
            <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
          </div>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
            Clear Trade Terms.
            <br />
            Reliable Shipment Coordination.
          </h2>
          <p className="text-text-muted text-sm sm:text-[15px] lg:text-base leading-relaxed">
            We coordinate shipment and commercial arrangements based on the agreed
            product, quantity, destination, and transaction requirements.
          </p>
        </FadeIn>

        {/* Shipping Options */}
        <FadeIn delay={100} className="mb-14 sm:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 lg:gap-x-8">
            {SHIPPING_OPTIONS.map((option, i) => {
              const Icon = option.icon;
              return (
                <FadeIn key={option.title} delay={150 + i * 60}>
                  <div className="group sm:border-b sm:border-border-warm/40 sm:pb-6 sm:pt-1 py-5 sm:py-0">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">
                        <div className="w-9 h-9 rounded-lg border border-border-warm/60 bg-ivory/80 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300">
                          <Icon className="size-4 text-forest/50 group-hover:text-gold transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-gold/50 text-[10px] font-semibold tracking-[0.12em] uppercase mb-1 transition-colors duration-200 group-hover:text-gold">
                          {option.label}
                        </p>
                        <h3 className="text-forest text-sm sm:text-[15px] font-bold leading-snug mb-1.5">
                          {option.title}
                        </h3>
                        <p className="text-text-muted text-xs sm:text-[13px] leading-relaxed">
                          {option.copy}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>

        {/* Trade Information Grid */}
        <FadeIn delay={200} className="mb-14 sm:mb-16">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/60 mb-5">
            Trade Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border-warm/40 rounded-xl overflow-hidden bg-white/60">
            {TRADE_ROWS_LEFT.map((row, i) => (
              <div
                key={row.label}
                className={`px-5 py-4 ${
                  i < TRADE_ROWS_LEFT.length - 1
                    ? 'border-b border-border-warm/30 sm:border-b-0 sm:border-r sm:border-border-warm/30'
                    : 'sm:border-r sm:border-border-warm/30'
                } border-b border-border-warm/30 sm:border-b-0 ${
                  i === TRADE_ROWS_LEFT.length - 1 ? 'sm:rounded-bl-none' : ''
                }`}
              >
                <div className="group">
                  <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase text-text-muted/60 mb-1.5">
                    {row.label}
                  </p>
                  <p className="text-forest text-sm sm:text-[15px] font-bold leading-snug">
                    {row.value}
                  </p>
                  {row.note && (
                    <p className="text-text-muted/60 text-[11px] sm:text-xs mt-1.5 leading-relaxed">
                      {row.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {TRADE_ROWS_RIGHT.map((row, i) => (
              <div
                key={row.label}
                className={`px-5 py-4 ${
                  i < TRADE_ROWS_RIGHT.length - 1
                    ? 'border-b border-border-warm/30 lg:border-b-0 lg:border-r lg:border-border-warm/30'
                    : ''
                } border-b border-border-warm/30 lg:border-b-0`}
              >
                <div className="group">
                  <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase text-text-muted/60 mb-1.5">
                    {row.label}
                  </p>
                  <p className="text-forest text-sm sm:text-[15px] font-bold leading-snug">
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Loading Port Highlight */}
        <FadeIn delay={250} className="mb-14 sm:mb-16">
          <div className="border border-border-warm/40 rounded-xl bg-ivory/60 px-5 sm:px-6 py-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <div className="w-9 h-9 rounded-lg border border-border-warm/50 bg-cream/80 flex items-center justify-center">
                  <MapPin className="size-4 text-gold/70" />
                </div>
              </div>
              <div>
                <p className="text-gold/50 text-[10px] font-semibold tracking-[0.12em] uppercase mb-1">
                  Primary Loading Port
                </p>
                <h3 className="text-forest text-sm sm:text-[15px] font-bold leading-snug mb-1">
                  Tanjung Perak, Surabaya
                </h3>
                <p className="text-text-muted text-xs sm:text-[13px] leading-relaxed">
                  Primary loading port for Erka Agro export shipments from East Java, Indonesia.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Order Readiness Callout */}
        <FadeIn delay={300} className="mb-10">
          <div className="bg-forest rounded-xl px-5 sm:px-6 py-5">
            <h3 className="text-white text-sm sm:text-[15px] font-bold leading-snug mb-1.5">
              Planning Your Shipment?
            </h3>
            <p className="text-white/75 text-xs sm:text-[13px] leading-relaxed">
              Share your required product, quantity, destination port, preferred shipping
              term, and packaging requirement with our team.
            </p>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={350}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <Button
              asChild
              className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl transition-all duration-200 group/cta w-full sm:w-auto"
            >
              <a href="#request-quote">
                Request Shipping & Trade Quote
                <ArrowRight className="size-3.5 ml-1.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border-warm text-forest font-bold text-sm px-6 h-11 rounded-xl hover:bg-cream transition-all duration-200 group/sec w-full sm:w-auto"
            >
              <a href="#request-quote">
                Discuss Your Requirements
                <ArrowRight className="size-3.5 ml-1.5 transition-transform duration-200 group-hover/sec:translate-x-0.5" />
              </a>
            </Button>
          </div>
          <p className="text-text-muted/60 text-[11px] sm:text-xs leading-relaxed">
            Commercial terms are finalized based on the confirmed order and destination.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

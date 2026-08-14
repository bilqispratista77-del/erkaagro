'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

const QUICK_SPECS = [
  { label: 'Form', value: 'Whole Dried' },
  { label: 'Origin', value: 'East Java, Indonesia' },
  { label: 'Color', value: 'Natural Brown to Dark Brown' },
  { label: 'Aroma', value: 'Strong and Characteristic' },
  { label: 'Taste', value: 'Warm, Pungent' },
  { label: 'Moisture', value: '< 12%' },
  { label: 'Capacity', value: '40 Tons / Month' },
  { label: 'Minimum Order', value: '1 Ton' },
  { label: 'HS Code', value: '0904.21.10' },
];

const TRADE_INFO = [
  { label: 'Packaging', value: '25 kg / 50 kg polypropylene sack or based on buyer requirement' },
  { label: 'Seasonal Availability', value: 'Available year-round' },
  { label: 'Shipping', value: 'FOB' },
  { label: 'Payment', value: 'T/T, L/C' },
  { label: 'Loading Port', value: 'Tanjung Perak, Surabaya' },
];

const DOCUMENTATION = [
  'Phytosanitary Certificate',
  'Certificate of Origin',
  'Certificate of Analysis',
];

export function FeaturedLongPepperSection() {
  return (
    <section className="bg-ivory py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <div className="lg:grid lg:grid-cols-[11fr_9fr] lg:gap-12 xl:gap-20 items-start">

          {/* ===== LEFT: Product Image ===== */}
          <FadeIn className="relative mb-10 lg:mb-0 lg:sticky lg:top-24">
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-cream">
                <img
                  src="/products/long-pepper-featured.jpg"
                  alt="Whole dried Indonesian Long Pepper from East Java"
                  className="w-full h-full object-cover transition-transform duration-350 ease-out hover:scale-[1.03]"
                />
              </div>

              {/* Small Supporting Close-Up Image */}
              <div className="absolute -bottom-4 -right-3 sm:-right-5 w-28 sm:w-32 aspect-[4/5] rounded-[12px] overflow-hidden shadow-lg border-4 border-ivory hidden sm:block">
                <img
                  src="/products/long-pepper.jpg"
                  alt="Whole dried Indonesian Long Pepper detail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative gold accent corner */}
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-gold/30 rounded-tl-[16px] hidden sm:block" aria-hidden="true" />
            </div>
          </FadeIn>

          {/* ===== RIGHT: Product Content ===== */}
          <div>
            {/* Section Intro */}
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">
                  Featured Product
                </p>
                <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
              </div>
              <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-extrabold leading-tight mb-2">
                Indonesian Long Pepper
              </h2>
              <p className="text-text-muted text-sm sm:text-[15px] italic font-medium mb-6">
                Piper retrofractum
              </p>
              <p className="text-text-muted text-sm sm:text-[15px] lg:text-base leading-relaxed">
                A distinctive Indonesian spice known for its warm, pungent aroma and
                characteristic flavor, sourced from East Java and supplied in whole dried
                form for international buyers.
              </p>
            </FadeIn>

            {/* Product Description */}
            <FadeIn delay={100} className="mt-6 pt-6 border-t border-border-warm/50">
              <p className="text-text-main text-sm sm:text-[15px] leading-relaxed">
                Indonesian Long Pepper from East Java is valued for its distinctive
                appearance, strong characteristic aroma, and warm pungent taste. Erka
                Agro coordinates supply and export preparation according to agreed
                commercial and buyer requirements.
              </p>
            </FadeIn>

            {/* Quick Specifications */}
            <FadeIn delay={150} className="mt-8 pt-6 border-t border-border-warm/50">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/60 mb-4">
                Quick Specifications
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-3.5">
                {QUICK_SPECS.map((spec, i) => (
                  <FadeIn key={spec.label} delay={200 + i * 40}>
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-0.5">
                        {spec.label}
                      </p>
                      <p className="text-text-main text-sm font-semibold leading-snug">
                        {spec.value}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            {/* Trade Information */}
            <FadeIn delay={200} className="mt-8 pt-6 border-t border-border-warm/50">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/60 mb-4">
                Trade Information
              </p>
              <div className="space-y-3">
                {TRADE_INFO.map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2">
                    <span className="text-text-muted text-xs sm:text-sm font-semibold shrink-0 sm:w-40">
                      {item.label}
                    </span>
                    <span className="text-text-main text-xs sm:text-sm font-medium leading-relaxed">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Documentation */}
            <FadeIn delay={250} className="mt-8 pt-6 border-t border-border-warm/50">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/60 mb-3">
                Available Documentation
              </p>
              <div className="flex flex-col gap-2">
                {DOCUMENTATION.map((doc) => (
                  <div key={doc} className="flex items-center gap-2">
                    <Check className="size-3.5 text-gold shrink-0" />
                    <span className="text-text-main text-sm font-medium">
                      {doc}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={300} className="mt-8 pt-6 border-t border-border-warm/50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Button
                  asChild
                  className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl transition-all duration-200 group/cta w-full sm:w-auto"
                >
                  <a href="/request-quote">
                    Request Long Pepper Quote
                    <ArrowRight className="size-3.5 ml-1.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-border-warm text-forest font-bold text-sm px-6 h-11 rounded-xl hover:bg-cream transition-all duration-200 group/sec w-full sm:w-auto"
                >
                  <a href="/products/long-pepper">
                    View Full Specification
                    <ArrowRight className="size-3.5 ml-1.5 transition-transform duration-200 group-hover/sec:translate-x-0.5" />
                  </a>
                </Button>
              </div>
              <a
                href="/request-quote"
                className="inline-block mt-3 text-text-muted hover:text-forest text-xs sm:text-sm font-medium transition-colors duration-200"
              >
                Ask About Sample Availability
              </a>
            </FadeIn>

            {/* Micro-Conversion Copy */}
            <FadeIn delay={350} className="mt-8">
              <div className="bg-cream/70 rounded-xl px-5 py-4 border border-border-warm/40">
                <p className="text-forest text-sm font-semibold leading-snug mb-1">
                  Need a different packaging or commercial requirement?
                </p>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  Share your preferred quantity, packaging, and destination with our team.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

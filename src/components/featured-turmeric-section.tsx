'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

const PRODUCT_FORMS = [
  { number: '01', label: 'Dried Sliced' },
  { number: '02', label: 'Powder' },
];

const QUICK_SPECS = [
  { label: 'Forms', value: 'Dried Sliced / Powder' },
  { label: 'Origin', value: 'East Java, Indonesia' },
  { label: 'Color', value: 'Natural Yellow to Orange' },
  { label: 'Aroma', value: 'Characteristic Turmeric Aroma' },
  { label: 'Moisture', value: '< 10%' },
  { label: 'Mesh Size', value: 'Based on buyer requirement — powder' },
  { label: 'Capacity', value: '40 Tons / Month' },
  { label: 'Minimum Order', value: '1 Ton' },
  { label: 'HS Code', value: '0910.30.00' },
];

const TRADE_INFO = [
  { label: 'Packaging', value: 'Based on buyer requirement' },
  { label: 'Seasonal Availability', value: 'Available year-round' },
  { label: 'Shipping', value: 'FOB / CIF' },
  { label: 'Payment', value: 'T/T, L/C' },
  { label: 'Loading Port', value: 'Tanjung Perak, Surabaya' },
];

export function FeaturedTurmericSection() {
  return (
    <section className="bg-cream/50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <div className="lg:grid lg:grid-cols-[9fr_11fr] lg:gap-12 xl:gap-20 items-start">

          {/* ===== LEFT: Product Content ===== */}
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
                Indonesian Turmeric
              </h2>
              <p className="text-text-muted text-sm sm:text-[15px] italic font-medium mb-6">
                Curcuma longa
              </p>
              <p className="text-text-muted text-sm sm:text-[15px] lg:text-base leading-relaxed">
                Indonesian turmeric from East Java with its natural yellow-orange
                color and characteristic aroma, available in dried sliced and powder
                forms for international buyers.
              </p>
            </FadeIn>

            {/* Product Form Availability Indicator */}
            <FadeIn delay={80} className="mt-6 pt-6 border-t border-border-warm/50">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/60 mb-3">
                Available Forms
              </p>
              <div className="flex gap-3">
                {PRODUCT_FORMS.map((form, i) => (
                  <div
                    key={form.number}
                    className="group flex items-center gap-3 border border-border-warm/60 rounded-xl px-4 py-3 bg-white/60 hover:bg-white hover:border-gold/40 transition-all duration-250"
                  >
                    <span className="text-gold/50 text-xs font-bold tracking-wider tabular-nums group-hover:text-gold transition-colors duration-200">
                      {form.number}
                    </span>
                    <span className="text-text-main text-sm font-semibold leading-snug">
                      {form.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Product Description */}
            <FadeIn delay={120} className="mt-6 pt-6 border-t border-border-warm/50">
              <p className="text-text-main text-sm sm:text-[15px] leading-relaxed">
                Indonesian Turmeric from East Java is recognized for its natural
                yellow-orange appearance and characteristic turmeric aroma. Erka
                Agro supplies dried sliced and powder forms and coordinates product
                preparation based on agreed buyer specifications and commercial
                requirements.
              </p>
            </FadeIn>

            {/* Quick Specifications */}
            <FadeIn delay={160} className="mt-8 pt-6 border-t border-border-warm/50">
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

            {/* Certificate / Documentation Note */}
            <FadeIn delay={250} className="mt-8 pt-6 border-t border-border-warm/50">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/60 mb-3">
                Certificate
              </p>
              <div className="flex items-start gap-2.5">
                <FileText className="size-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-main text-sm font-semibold leading-snug mb-1">
                    Subject to availability
                  </p>
                  <p className="text-text-muted text-xs sm:text-[13px] leading-relaxed">
                    Applicable export and product documentation can be discussed
                    based on destination-market and transaction requirements.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={300} className="mt-8 pt-6 border-t border-border-warm/50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Button
                  asChild
                  className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl transition-all duration-200 group/cta w-full sm:w-auto"
                >
                  <a href="#request-quote">
                    Request Turmeric Quote
                    <ArrowRight className="size-3.5 ml-1.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-border-warm text-forest font-bold text-sm px-6 h-11 rounded-xl hover:bg-cream transition-all duration-200 group/sec w-full sm:w-auto"
                >
                  <a href="/products/turmeric">
                    View Full Specification
                    <ArrowRight className="size-3.5 ml-1.5 transition-transform duration-200 group-hover/sec:translate-x-0.5" />
                  </a>
                </Button>
              </div>
              <a
                href="#request-quote"
                className="inline-block mt-3 text-text-muted hover:text-forest text-xs sm:text-sm font-medium transition-colors duration-200"
              >
                Ask About Sample Availability
              </a>
            </FadeIn>

            {/* Micro-Conversion Copy */}
            <FadeIn delay={350} className="mt-8">
              <div className="bg-ivory/80 rounded-xl px-5 py-4 border border-border-warm/40">
                <p className="text-forest text-sm font-semibold leading-snug mb-1">
                  Need a specific mesh size, packaging format, or product requirement?
                </p>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  Share your preferred specification, quantity, packaging, and
                  destination with our team.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* ===== RIGHT: Product Image ===== */}
          <FadeIn className="relative mt-10 lg:mt-0 lg:sticky lg:top-24">
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-ivory">
                <img
                  src="/products/turmeric-featured.jpg"
                  alt="Dried sliced Indonesian turmeric from East Java"
                  className="w-full h-full object-cover transition-transform duration-350 ease-out hover:scale-[1.03]"
                />
              </div>

              {/* Small Supporting Powder Image */}
              <div className="absolute -bottom-4 -left-3 sm:-left-5 w-28 sm:w-32 aspect-[4/5] rounded-[12px] overflow-hidden shadow-lg border-4 border-cream/50 hidden sm:block">
                <img
                  src="/products/turmeric-powder.jpg"
                  alt="Indonesian turmeric powder"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative gold accent corner — bottom-right */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-gold/30 rounded-br-[16px] hidden sm:block" aria-hidden="true" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

export function HeroSection() {
  return (
    <section className="relative pt-[72px] overflow-hidden">
      {/* Full-bleed background image */}
      <img
        src="/hero-main.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Text content overlaid directly on the full-bleed image */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-16 flex flex-col justify-center min-h-[500px] lg:min-h-[600px] py-16 lg:py-24">
        <div className="max-w-[560px] [text-shadow:_0_0_20px_rgba(255,255,255,0.9),_0_0_6px_rgba(255,255,255,0.7),_0_0_2px_rgba(255,255,255,0.5)]">
          <FadeIn delay={0}>
            <p className="text-forest font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Indonesian Agricultural Export
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-[#1A2E25] leading-[1.08] tracking-tight">
              <span className="block text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.25rem] font-extrabold">
                Reliable Indonesian
              </span>
              <span className="block text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.25rem] font-extrabold">
                Spices for{' '}
                <span className="text-forest">Global Markets</span>
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 text-[#1E2B25] text-base sm:text-[17px] lg:text-lg leading-relaxed max-w-[480px] font-medium">
              Sourcing and exporting selected Indonesian Long Pepper and
              Turmeric with reliable supply coordination, buyer-specific
              requirements, and export support for international markets.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-forest hover:bg-forest-dark text-white font-bold text-base px-7 h-12 rounded-xl transition-all duration-200 [text-shadow:none]"
              >
                <a href="/request-quote">
                  Request a Quote
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-border-warm text-text-main font-bold text-base px-7 h-12 rounded-xl bg-white/80 hover:bg-white hover:border-border-warm transition-all duration-200"
              >
                <a href="#products">Explore Our Products</a>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[#1E2B25] font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                Indonesia Origin
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                Export-Oriented
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                Buyer-Specific Requirements
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

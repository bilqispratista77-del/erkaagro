'use client';

import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/fade-in';

export function FinalCtaSection() {
  return (
    <section className="bg-forest relative overflow-hidden">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-1 lg:grid-cols-[11fr_9fr] min-h-[480px] lg:min-h-[560px]">
          {/* Left — Content */}
          <div className="relative z-10 flex items-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-0">
            <FadeIn className="max-w-lg">
              <div className="flex items-center gap-3 mb-5">
                <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">
                  Start a Conversation
                </p>
                <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
              </div>
              <h2 className="text-white text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-extrabold leading-[1.15] tracking-tight mb-5">
                Let&apos;s Build a Reliable{' '}
                <br className="hidden sm:block" />
                Supply Partnership
              </h2>
              <p className="text-white/75 text-sm sm:text-[15px] leading-relaxed mb-2 max-w-md">
                Looking for Indonesian Long Pepper or Turmeric? Share your product requirements, quantity, packaging, and destination with our team.
              </p>
              <p className="text-white/55 text-[13px] sm:text-sm leading-relaxed mb-8 max-w-md">
                We are ready to discuss specifications, samples, commercial terms, and export requirements.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-10">
                <Button
                  asChild
                  className="bg-gold hover:bg-gold-light text-white font-bold text-sm px-6 h-11 rounded-xl transition-all duration-200 w-full sm:w-auto"
                >
                  <a href="#request-quote">
                    Request a Quote
                    <ArrowRight className="size-3.5 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white font-bold text-sm px-6 h-11 rounded-xl hover:bg-white/10 transition-all duration-200 w-full sm:w-auto"
                >
                  <a
                    href="https://wa.me/6285196245196?text=Hello%20Mr.%20Riswan%2C%20I%20am%20interested%20in%20sourcing%20products%20from%20Erka%20Agro%20and%20would%20like%20to%20discuss%20my%20requirements."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4 mr-2" />
                    Contact via WhatsApp
                  </a>
                </Button>
              </div>

              {/* Micro Trust Row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-white/50 text-xs sm:text-[13px] font-medium">East Java Origin</span>
                <span className="text-white/25 text-xs" aria-hidden="true">•</span>
                <span className="text-white/50 text-xs sm:text-[13px] font-medium">B2B Export Supply</span>
                <span className="text-white/25 text-xs" aria-hidden="true">•</span>
                <span className="text-white/50 text-xs sm:text-[13px] font-medium">Buyer-Specific Requirements</span>
              </div>
            </FadeIn>
          </div>

          {/* Right — Image with overlay */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/40 to-transparent z-10" />
            <Image
              src="/products/cta-partnership.jpg"
              alt="Indonesian Long Pepper and Turmeric — export-ready agricultural products from East Java"
              fill
              className="object-cover"
              sizes="45vw"
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* Mobile image */}
      <div className="relative lg:hidden h-56 sm:h-64 -mt-2">
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-forest/30 z-10" />
        <Image
          src="/products/cta-partnership.jpg"
          alt="Indonesian Long Pepper and Turmeric — export-ready agricultural products from East Java"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>
    </section>
  );
}

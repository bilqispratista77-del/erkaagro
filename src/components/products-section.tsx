'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

interface SpecItem {
  label: string;
  value: string;
}

interface Product {
  name: string;
  botanical: string;
  description: string;
  image: string;
  imageAlt: string;
  specs: SpecItem[];
  cta: string;
  ctaHref: string;
}

const PRODUCTS: Product[] = [
  {
    name: 'Indonesian Long Pepper',
    botanical: 'Piper retrofractum',
    description:
      'A distinctive Indonesian spice known for its warm, pungent aroma and characteristic flavor, sourced from East Java.',
    image: '/products/long-pepper.png',
    imageAlt: 'Indonesian Whole Dried Long Pepper',
    specs: [
      { label: 'Form', value: 'Whole Dried' },
      { label: 'Origin', value: 'East Java, Indonesia' },
      { label: 'Moisture', value: '< 12%' },
      { label: 'Capacity', value: '40 Tons / Month' },
      { label: 'MOQ', value: '1 Ton' },
      { label: 'HS Code', value: '0904.21.10' },
    ],
    cta: 'View Long Pepper',
    ctaHref: '/products/long-pepper',
  },
  {
    name: 'Indonesian Turmeric',
    botanical: 'Curcuma longa',
    description:
      'Indonesian turmeric with its natural yellow-orange color and characteristic aroma, prepared for food, herbal, ingredient, and processing industries.',
    image: '/products/turmeric.png',
    imageAlt: 'Indonesian Turmeric',
    specs: [
      { label: 'Forms', value: 'Dried Sliced / Powder' },
      { label: 'Origin', value: 'East Java, Indonesia' },
      { label: 'Moisture', value: '< 10%' },
      { label: 'Capacity', value: '20 Tons / Month' },
      { label: 'MOQ', value: '1 Ton' },
      { label: 'HS Code', value: '0910.30.00' },
    ],
    cta: 'View Turmeric',
    ctaHref: '/products/turmeric',
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <FadeIn delay={index === 0 ? 100 : 250} className="group">
      <article className="bg-white rounded-[16px] border border-border-warm/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        {/* Product Image - Full Circle with Decoration */}
        <div className="relative bg-cream flex items-center justify-center py-8 sm:py-10">
          {/* Outer decorative ring */}
          <div className="relative w-[85%] max-w-[280px] aspect-square">
            {/* Soft glow ring */}
            <div className="absolute inset-[-8px] rounded-full border-2 border-dashed border-gold/30" />
            {/* Main circle border */}
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-forest/10 via-gold/20 to-forest/10" />
            {/* Product circle */}
            <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-lg shadow-forest/15">
              <img
                src={product.image}
                alt={product.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Subtle inner gradient overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-forest/20 via-transparent to-white/10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Content */}
        <div className="p-6 sm:p-8 flex flex-col flex-1">
          {/* Botanical Name */}
          <p className="text-text-muted text-xs sm:text-sm italic tracking-wide mb-1">
            {product.botanical}
          </p>

          {/* Product Name */}
          <h3 className="text-forest text-xl sm:text-2xl font-bold leading-tight mb-3">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border-warm/60">
            {product.specs.map((spec, i) => (
              <div key={spec.label}>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-0.5">
                  {spec.label}
                </p>
                <p className="text-text-main text-sm font-semibold leading-snug">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-3">
            <Button
              asChild
              className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl transition-all duration-200 group/btn w-full sm:w-auto"
            >
              <a href={product.ctaHref}>
                {product.cta}
                <ArrowRight className="size-3.5 ml-1.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </a>
            </Button>
            <a
              href="/request-quote"
              className="text-sm font-medium text-text-muted hover:text-forest transition-colors duration-200 text-center sm:text-left"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

export function ProductsSection() {
  return (
    <section id="products" className="bg-cream/50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        {/* Section Intro */}
        <FadeIn className="max-w-xl mb-14 sm:mb-16 lg:mb-20">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Our Products
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2.1rem] font-bold leading-tight mb-4">
            Selected Indonesian Spices
            <br className="hidden sm:block" />
            {' '}for Global Markets
          </h2>
          <p className="text-text-muted text-sm sm:text-[15px] lg:text-base leading-relaxed">
            We supply selected agricultural commodities from East Java, Indonesia,
            with product preparation and export coordination based on international
            buyer requirements.
          </p>
        </FadeIn>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>

    </div>
    </section>
  );
}

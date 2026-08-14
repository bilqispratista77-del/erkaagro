'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import {
  MessageCircle,
  Package,
  ChevronRight,
  UtensilsCrossed,
  Pill,
  Heart,
  Sparkles,
  Palette,
  Leaf,
  Flame,
  Wheat,
} from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

/* ================================================================
   CONSTANTS
   ================================================================ */

const SPEC_ROWS = [
  ['Botanical Name', 'Curcuma longa'],
  ['HS Code', '0910.30.00'],
  ['Available Forms', 'Dried Sliced, Powder'],
  ['Supply Capacity', '20 Tons / Month'],
  ['Origin', 'Indonesia'],
] as const;

const PROCESS_STEPS = [
  'Raw Material Selection',
  'Sorting & Cleaning',
  'Washing',
  'Slicing',
  'Drying',
  'Quality Grading',
  'Packaging',
  'Final Inspection',
];

const APPLICATIONS = [
  {
    title: 'Food & Beverage',
    description: 'Natural flavoring and coloring agent for culinary applications, curries, and processed foods.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Pharmaceutical',
    description: 'Active ingredient source for curcumin-based medicines and therapeutic formulations.',
    icon: Pill,
  },
  {
    title: 'Nutraceutical',
    description: 'Dietary supplements and health products leveraging turmeric\'s anti-inflammatory properties.',
    icon: Heart,
  },
  {
    title: 'Cosmetics',
    description: 'Skin care formulations, face masks, and beauty products for natural glow and complexion.',
    icon: Sparkles,
  },
  {
    title: 'Food Coloring',
    description: 'Natural yellow-orange colorant (E100) as a safe alternative to synthetic food dyes.',
    icon: Palette,
  },
  {
    title: 'Traditional Medicine',
    description: 'Jamu and herbal remedies deeply rooted in Indonesian and Asian traditional healing.',
    icon: Leaf,
  },
  {
    title: 'Spice Industry',
    description: 'Ground spice for retail and wholesale spice blends, seasonings, and marinades.',
    icon: Flame,
  },
  {
    title: 'Animal Feed',
    description: 'Natural additive in livestock and poultry feed for health benefits and growth support.',
    icon: Wheat,
  },
];

const GALLERY_ROW_1 = [
  { src: '/products/turmeric-gal-1.jpg', alt: 'Indonesian Turmeric Rhizomes' },
  { src: '/products/turmeric-gal-2.jpg', alt: 'Turmeric Processing Facility' },
  { src: '/products/turmeric-gal-3.jpg', alt: 'Dried Turmeric Slices' },
];

const GALLERY_ROW_2 = [
  { src: '/products/turmeric-gal-4.jpg', alt: 'Turmeric Sourcing' },
  { src: '/products/turmeric-gal-5.jpg', alt: 'Quality Inspection' },
  { src: '/products/turmeric-gal-6.jpg', alt: 'Supply Chain' },
];

const GALLERY_ITEMS = [...GALLERY_ROW_1, ...GALLERY_ROW_2];

const PACKAGING_OPTIONS = [
  { label: 'Vacuum Packs', desc: '1 kg, 5 kg, 10 kg' },
  { label: 'Carton Box', desc: '25 kg net' },
  { label: 'Custom Packaging', desc: 'Per buyer request' },
];

/* ================================================================
   STICKY MOBILE CTA HELPER
   ================================================================ */

function subscribeScroll(cb: () => void) {
  window.addEventListener('scroll', cb, { passive: true });
  return () => window.removeEventListener('scroll', cb);
}
function getScrolled() { return window.scrollY > 400; }
function getServerFalse() { return false; }

/* ================================================================
   STRUCTURED DATA
   ================================================================ */

function ProductJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Indonesian Turmeric',
          description: 'Premium Indonesian Turmeric (Curcuma longa) available in Dried Sliced and Powder forms, sourced from Indonesia.',
          brand: { '@type': 'Brand', name: 'Erka Agro' },
          manufacturer: { '@type': 'Organization', name: 'PT. Erka Agro Niaga' },
          category: 'Agricultural Spices',
          material: 'Turmeric (Curcuma longa)',
        }),
      }}
    />
  );
}

function BreadcrumbJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://erkaagro.com' },
            { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://erkaagro.com/products' },
            { '@type': 'ListItem', position: 3, name: 'Indonesian Turmeric', item: 'https://erkaagro.com/products/turmeric' },
          ],
        }),
      }}
    />
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export function TurmericContent() {
  const showStickyCta = useSyncExternalStore(subscribeScroll, getScrolled, getServerFalse);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  return (
    <>
      <ProductJsonLd />
      <BreadcrumbJsonLd />

      {/* NAVBAR */}
      <Navbar />

      <main className="pt-[72px]">
        {/* ── SECTION 1: PRODUCT HERO ── */}
        <ProductHero />

        {/* ── SECTION 2: PRODUCT SPECIFICATIONS ── */}
        <ProductSpecifications />

        {/* ── SECTION 3: APPLICATIONS ── */}
        <ProductApplications />

        {/* ── SECTION 4: PROCESSING & QUALITY ── */}
        <SourcingProcess />

        {/* ── SECTION 5: PACKAGING ── */}
        <PackagingSection />

        {/* ── SECTION 6: GALLERY ── */}
        <GallerySection />

        {/* ── SECTION 7: FINAL CTA ── */}
        <FinalProductCta />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING WHATSAPP */}
      <FloatingWhatsApp />

      {/* STICKY MOBILE CTA */}
      {mounted && showStickyCta && <StickyMobileCta />}
    </>
  );
}

/* ================================================================
   SECTION 1: PRODUCT HERO
   ================================================================ */

function ProductHero() {
  const HIGHLIGHTS = [
    { label: 'Origin', value: 'Indonesia' },
    { label: 'Form', value: 'Dried Sliced, Powder' },
    { label: 'Capacity', value: '20 Tons / Month' },
    { label: 'HS Code', value: '0910.30.00' },
  ];

  return (
    <section className="bg-ivory py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Product Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream order-2 lg:order-1">
              <Image
                src="/products/turmeric-featured.jpg"
                alt="Premium Turmeric"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Text Content */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">Our Product</p>
                <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
              </div>
              <h1 className="text-forest text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-3">
                Turmeric
              </h1>
              <p className="text-text-muted text-base italic mb-5">Curcuma longa</p>
              <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed mb-8 max-w-lg">
                Premium Indonesian Turmeric available in dried sliced and powder forms. A versatile raw material widely used across food & beverage, pharmaceutical, nutraceutical, cosmetics, and traditional medicine industries.
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {HIGHLIGHTS.map((item) => (
                  <div key={item.label} className="bg-white rounded-xl px-4 py-3 border border-border-warm/40">
                    <p className="text-text-muted text-xs font-medium mb-0.5">{item.label}</p>
                    <p className="text-forest text-sm font-bold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl w-full sm:w-auto">
                  <a href="/request-quote">Request a Quote</a>
                </Button>
                <Button asChild variant="outline" className="border-border-warm text-forest font-bold text-sm px-6 h-11 rounded-xl hover:bg-cream w-full sm:w-auto">
                  <a
                    href="https://wa.me/6285196245196"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2: PRODUCT SPECIFICATIONS
   ================================================================ */

function ProductSpecifications() {
  return (
    <section id="specifications" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mb-10">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">Technical Data</p>
            <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
          </div>
          <h2 className="text-forest text-2xl sm:text-3xl font-bold leading-tight mb-3">Product Specifications</h2>
          <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed">
            Key commercial and physical specifications for Indonesian Turmeric (Curcuma longa).
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-8 lg:gap-12 items-start">
            {/* Specs Table */}
            <div className="bg-ivory rounded-2xl border border-border-warm/50 overflow-hidden">
              {SPEC_ROWS.map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex items-start sm:items-center justify-between gap-4 px-5 sm:px-6 py-3.5 ${
                    i % 2 === 0 ? 'bg-ivory' : 'bg-white'
                  } ${i < SPEC_ROWS.length - 1 ? 'border-b border-border-warm/30' : ''}`}
                >
                  <span className="text-text-muted text-sm font-medium shrink-0">{label}</span>
                  <span className="text-forest text-sm font-semibold text-right">{value}</span>
                </div>
              ))}
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
              <Image
                src="/products/turmeric-featured.jpg"
                alt="Indonesian Turmeric Featured"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <p className="text-text-muted text-xs sm:text-[13px] leading-relaxed mt-4 max-w-3xl">
            Specifications may vary slightly depending on crop condition and agreed buyer requirements. Additional testing parameters can be discussed upon request.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 3: APPLICATIONS
   ================================================================ */

function ProductApplications() {
  return (
    <section className="bg-ivory py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">Applications</p>
            <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
          </div>
          <h2 className="text-forest text-2xl sm:text-3xl font-bold leading-tight mb-3">
            Suitable for Various<br />B2B Applications
          </h2>
          <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed">
            Indonesian Turmeric serves as a versatile raw material across food, health, beauty, and industrial sectors.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {APPLICATIONS.map((app, i) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.title}
                  className="bg-white rounded-2xl p-5 border border-border-warm/40 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mb-3">
                    <Icon className="size-5 text-forest" />
                  </div>
                  <p className="text-forest text-sm font-bold mb-1.5">{app.title}</p>
                  <p className="text-text-muted text-xs sm:text-[13px] leading-relaxed">{app.description}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4: PROCESSING & QUALITY
   ================================================================ */

function SourcingProcess() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">Processing & Quality</p>
            <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
          </div>
          <h2 className="text-forest text-2xl sm:text-3xl font-bold leading-tight mb-3">
            From Source<br />to Export Preparation
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-4xl mx-auto">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-forest text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-forest text-[11px] sm:text-xs font-semibold leading-tight">{step}</p>
              </div>
            ))}
          </div>
          <p className="text-text-muted text-xs sm:text-[13px] text-center mt-6 max-w-lg mx-auto leading-relaxed">
            Every batch undergoes rigorous quality checks to meet international export standards and buyer-specific requirements.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5: PACKAGING
   ================================================================ */

function PackagingSection() {
  return (
    <section className="bg-ivory py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">Packaging</p>
            <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
          </div>
          <h2 className="text-forest text-2xl sm:text-3xl font-bold leading-tight mb-3">Export Packaging Options</h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            {PACKAGING_OPTIONS.map(pkg => (
              <div key={pkg.label} className="bg-white rounded-2xl p-5 border border-border-warm/40 text-center">
                <Package className="size-6 text-forest/30 mx-auto mb-3" />
                <p className="text-forest text-base font-bold mb-1">{pkg.label}</p>
                <p className="text-text-muted text-xs sm:text-[13px]">{pkg.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-text-muted text-xs sm:text-[13px] text-center max-w-md mx-auto leading-relaxed">
            Packaging can be discussed according to quantity, shipment requirements, and buyer preferences.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6: GALLERY
   ================================================================ */

function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mb-10">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">Gallery</p>
            <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
          </div>
          <h2 className="text-forest text-2xl sm:text-3xl font-bold leading-tight">Product Gallery</h2>
        </FadeIn>

        <FadeIn delay={100}>
          {/* Row 1 — Turmeric-specific images */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            {GALLERY_ROW_1.map((item, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="relative aspect-[4/5] rounded-xl overflow-hidden bg-cream cursor-pointer group"
                aria-label={`View ${item.alt}`}
              >
                <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-300" />
              </button>
            ))}
          </div>

          {/* Row 2 — Shared images */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {GALLERY_ROW_2.map((item, i) => (
              <button
                key={i + 3}
                onClick={() => setLightbox(i + 3)}
                className="relative aspect-[4/5] rounded-xl overflow-hidden bg-cream cursor-pointer group"
                aria-label={`View ${item.alt}`}
              >
                <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-light z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div className="relative max-w-3xl w-full aspect-[4/5] rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <Image src={GALLERY_ITEMS[lightbox].src} alt={GALLERY_ITEMS[lightbox].alt} fill className="object-cover" sizes="90vw" />
          </div>
        </div>
      )}
    </section>
  );
}

/* ================================================================
   SECTION 7: FINAL PRODUCT CTA
   ================================================================ */

function FinalProductCta() {
  return (
    <section className="bg-forest py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="text-center max-w-xl mx-auto">
          <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight mb-4">
            Looking for Premium<br />Indonesian Turmeric?
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-8">
            Discuss your required quantity, packaging, destination, and export requirements directly with our team.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 mb-8">
            <Button asChild className="bg-gold hover:bg-gold-light text-white font-bold text-sm px-6 h-11 rounded-xl w-full sm:w-auto">
              <a href="/request-quote">Request a Quote</a>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white font-bold text-sm px-6 h-11 rounded-xl hover:bg-white/10 w-full sm:w-auto">
              <a
                href="https://wa.me/6285196245196"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4 mr-2" />
                Contact via WhatsApp
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   FLOATING WHATSAPP
   ================================================================ */

function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <a
      href="https://wa.me/6285196245196"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, box-shadow 0.2s, scale 0.2s',
      }}
    >
      <svg viewBox="0 0 32 32" className="size-5.5" fill="currentColor" aria-hidden="true">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.052 9.378L1.054 31.29l6.118-1.962A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.34 22.616c-.392 1.106-1.942 2.026-3.19 2.292-.852.18-1.964.324-5.71-1.228-4.792-1.986-7.878-6.844-8.116-7.158-.23-.314-1.934-2.574-1.934-4.908s1.226-3.482 1.66-3.962c.434-.48.948-.6 1.264-.6.316 0 .632.004.908.016.29.016.68-.11 1.064.812.392.942 1.334 3.266 1.452 3.502.118.236.198.512.04.826-.158.314-.236.508-.47.784-.236.276-.496.616-.708.826-.236.236-.482.492-.206.964.274.472 1.222 2.016 2.624 3.266 1.804 1.606 3.326 2.104 3.798 2.34.472.236.748.198 1.022-.118.274-.316 1.184-1.38 1.5-1.856.316-.476.632-.394 1.064-.236.434.158 2.746 1.296 3.218 1.532.472.236.788.354.906.55.118.196.118 1.14-.274 2.246z" />
      </svg>
    </a>
  );
}

/* ================================================================
   STICKY MOBILE CTA
   ================================================================ */

function StickyMobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-border-warm px-4 py-3 sm:hidden">
      <div className="flex items-center gap-2.5">
        <Button asChild className="flex-1 bg-forest hover:bg-forest-dark text-white font-bold text-sm h-10 rounded-xl">
          <a href="/request-quote">Request Quote</a>
        </Button>
        <a
          href="https://wa.me/6285196245196"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-border-warm text-forest hover:bg-cream transition-colors shrink-0"
          aria-label="Contact via WhatsApp"
        >
          <MessageCircle className="size-4.5" />
        </a>
      </div>
    </div>
  );
}

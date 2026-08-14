'use client';

import { useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Menu,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  MapPin,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/fade-in';
import { Footer } from '@/components/footer';
import { FloatingActions } from '@/components/floating-actions';

/* ================================================================
   SCROLL & MOUNTED HELPERS
   ================================================================ */

const SCROLL_THRESHOLD = 20;

function subscribeScroll(cb: () => void) {
  window.addEventListener('scroll', cb, { passive: true });
  return () => window.removeEventListener('scroll', cb);
}
function getScrolled() { return window.scrollY > SCROLL_THRESHOLD; }
function getServerFalse() { return false; }

/* ================================================================
   NAV ITEMS (full paths for sub-page compatibility)
   ================================================================ */

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'Products', href: '/products/long-pepper', hasDropdown: true,
    children: [
      { label: 'Long Pepper', href: '/products/long-pepper' },
      { label: 'Turmeric', href: '/products/turmeric' },
    ],
  },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/* ================================================================
   MOBILE MENU
   ================================================================ */

function MobileMenu({ scrolled, mobileOpen, setMobileOpen, productsOpen, setProductsOpen }: {
  scrolled: boolean; mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
  productsOpen: boolean; setProductsOpen: (v: boolean) => void;
}) {
  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <button
          className={cn(
            'p-2 rounded-lg transition-colors duration-200',
            scrolled ? 'text-text-main hover:bg-cream' : 'text-text-main hover:bg-white/50'
          )}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-white p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-6 h-[72px] border-b border-border-warm">
            <img src="/logo.png" alt="Erka Agro" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-semibold text-base text-text-main">Erka Agro</span>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setProductsOpen(!productsOpen)}
                        className="flex items-center justify-between w-full px-6 py-3 text-[15px] font-medium text-text-main hover:bg-cream transition-colors"
                      >
                        {item.label}
                        <ChevronDown className={cn('size-4 text-text-muted transition-transform duration-200', productsOpen && 'rotate-180')} />
                      </button>
                      {productsOpen && item.children && (
                        <div className="pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-6 py-2.5 text-sm text-text-muted hover:text-forest hover:bg-cream/50 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-3 text-[15px] font-medium text-text-main hover:bg-cream transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-5 border-t border-border-warm">
            <Button asChild className="w-full bg-forest hover:bg-forest-dark text-white font-bold text-[15px] h-11 rounded-xl transition-colors duration-200">
              <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ================================================================
   NAVBAR (same visual design, full-path links)
   ================================================================ */

function PageNavbar() {
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerFalse);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-border-warm shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-[1240px] flex items-center justify-between px-6 lg:px-16 h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Erka Agro" className="w-9 h-9 rounded-lg object-cover" />
          <span className={cn('font-semibold text-lg tracking-tight transition-colors duration-300', scrolled ? 'text-text-main' : 'text-forest')}>
            Erka Agro
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="relative group">
              {item.hasDropdown ? (
                <button
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-[15px] font-medium rounded-lg transition-colors duration-200 cursor-pointer',
                    scrolled ? 'text-text-main hover:bg-cream hover:text-forest' : 'text-text-main/80 hover:bg-white/50 hover:text-forest'
                  )}
                >
                  {item.label}
                  <ChevronDown className="size-3.5 opacity-60" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-[15px] font-medium rounded-lg transition-colors duration-200 block',
                    scrolled ? 'text-text-main hover:bg-cream hover:text-forest' : 'text-text-main/80 hover:bg-white/50 hover:text-forest'
                  )}
                >
                  {item.label}
                </Link>
              )}
              {item.hasDropdown && item.children && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl border border-border-warm shadow-lg py-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} className="block px-4 py-2.5 text-sm text-text-main hover:bg-cream hover:text-forest transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button asChild className="bg-forest hover:bg-forest-dark text-white font-bold text-[15px] px-5 h-10 rounded-xl transition-colors duration-200">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className={cn('lg:hidden', !mounted && 'invisible')}>
          {mounted && (
            <MobileMenu
              scrolled={scrolled}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              productsOpen={productsOpen}
              setProductsOpen={setProductsOpen}
            />
          )}
        </div>
      </nav>
    </header>
  );
}

/* ================================================================
   SECTION 1 — ABOUT HERO
   ================================================================ */

function AboutHero() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text Content */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">About Us</p>
                <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
              </div>
              <h1 className="text-forest text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-5">
                Selected Indonesian Spices
                <br className="hidden sm:block" />
                {' '}for Global Markets
              </h1>
              <p className="text-text-muted text-base sm:text-[15px] leading-relaxed mb-8 max-w-lg">
                PT. Erka Agro Niaga is an Indonesian agricultural trading and export company based in East Java, specializing in Long Pepper and Turmeric for international B2B buyers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl w-full sm:w-auto">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="size-3.5 ml-2" />
                  </Link>
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

            {/* Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ivory">
              <Image
                src="/about/why-erka-agro.jpg"
                alt="Erka Agro - Indonesian Spice Exporter"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 — WHO WE ARE + COMPANY SNAPSHOT
   ================================================================ */

function WhoWeAre() {
  const snapshotItems = [
    ['Business', 'Agricultural Trading & Export'],
    ['Based In', 'East Java, Indonesia'],
    ['Main Commodities', 'Long Pepper & Turmeric'],
    ['Market Focus', 'International B2B'],
    ['Commercial Brand', 'Erka Agro'],
    ['Legal Entity', 'PT. Erka Agro Niaga'],
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        {/* Who We Are Text */}
        <FadeIn className="max-w-3xl mb-16 lg:mb-20">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Who We Are
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-6">
            An Indonesian Partner
            <br className="hidden sm:block" />
            {' '}for Agricultural Trade
          </h2>
          <div className="space-y-4">
            <p className="text-text-main text-sm sm:text-[15px] leading-relaxed">
              PT. Erka Agro Niaga is an Indonesian company engaged in agricultural trading and export activities.
            </p>
            <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed">
              Through our commercial brand, Erka Agro, we focus on connecting international buyers with selected Indonesian agricultural commodities while coordinating supply, product preparation, quality requirements, packaging, documentation, and shipment arrangements.
            </p>
            <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed">
              Our approach is built around clear communication, practical coordination, and long-term business relationships.
            </p>
          </div>
        </FadeIn>

        {/* Company Snapshot Strip */}
        <FadeIn delay={100}>
          <div className="bg-cream/60 rounded-2xl border border-border-warm/40 p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0">
              {snapshotItems.map(([label, value], i) => (
                <div
                  key={label}
                  className={cn(
                    'py-3 sm:py-4',
                    i < snapshotItems.length - 1 && 'lg:border-r lg:border-border-warm/50',
                    i >= 2 && 'border-t border-border-warm/50 sm:border-t-0',
                    (i === 2 || i === 4) && 'sm:border-l sm:border-border-warm/50'
                  )}
                >
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-1">
                    {label}
                  </p>
                  <p className="text-forest text-xs sm:text-sm font-bold leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 3 — WHAT WE DO
   ================================================================ */

const ACTIVITIES = [
  {
    num: '01',
    title: 'Product Sourcing',
    desc: 'Identifying suitable products through selected farmers, suppliers, and processing partners.',
  },
  {
    num: '02',
    title: 'Supplier Coordination',
    desc: 'Coordinating availability, preparation, quantity, and commercial requirements with relevant supply partners.',
  },
  {
    num: '03',
    title: 'Product Preparation',
    desc: 'Coordinating applicable sorting, cleaning, drying, slicing, grinding, or other preparation according to product requirements.',
  },
  {
    num: '04',
    title: 'Quality Coordination',
    desc: 'Aligning product preparation and inspection with agreed buyer specifications.',
  },
  {
    num: '05',
    title: 'Export Documentation',
    desc: 'Coordinating applicable commercial and export-related documentation according to shipment requirements.',
  },
  {
    num: '06',
    title: 'Shipment Coordination',
    desc: 'Supporting order preparation and shipment arrangements from Indonesia to international markets.',
  },
];

function WhatWeDo() {
  return (
    <section className="bg-cream/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Our Role
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
            More Than Connecting
            <br className="hidden sm:block" />
            {' '}Buyer and Supplier
          </h2>
          <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed">
            Our role is to coordinate the key commercial and operational stages needed to prepare Indonesian agricultural products for international transactions.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {ACTIVITIES.map((item, i) => (
            <FadeIn key={item.num} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-border-warm/50 p-6 sm:p-7 h-full">
                <span className="text-gold/60 text-xs font-bold tracking-wider">{item.num}</span>
                <h3 className="text-forest text-base sm:text-lg font-bold mt-2 mb-3">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4 — OUR DIRECTION
   ================================================================ */

const MISSION_ITEMS = [
  'Connect selected Indonesian agricultural commodities with global buyers.',
  'Develop reliable and responsible supply partnerships.',
  'Coordinate products according to agreed quality requirements.',
  'Support clear and efficient export processes.',
  'Build sustainable long-term business relationships.',
];

function OurDirection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Our Direction
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight">
            Built for Long-Term
            <br className="hidden sm:block" />
            {' '}Business Relationships
          </h2>
        </FadeIn>

        <div className="lg:grid lg:grid-cols-3 lg:gap-10 xl:gap-14">
          {/* Vision */}
          <FadeIn delay={100}>
            <div className="mb-10 lg:mb-0">
              <h3 className="text-forest text-sm font-bold uppercase tracking-[0.1em] mb-4">Vision</h3>
              <p className="text-text-main text-sm sm:text-[15px] leading-relaxed">
                To become a trusted Indonesian agricultural trading and export partner recognized for reliability, product consistency, and long-term cooperation.
              </p>
            </div>
          </FadeIn>

          {/* Mission */}
          <FadeIn delay={200}>
            <div className="mb-10 lg:mb-0">
              <h3 className="text-forest text-sm font-bold uppercase tracking-[0.1em] mb-4">Mission</h3>
              <ul className="space-y-3">
                {MISSION_ITEMS.map((item, i) => (
                  <li key={i} className="flex gap-3 text-text-muted text-sm sm:text-[15px] leading-relaxed">
                    <span className="text-gold mt-1.5 shrink-0">
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" aria-hidden="true">
                        <circle cx="3" cy="3" r="3" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Business Approach */}
          <FadeIn delay={300}>
            <div>
              <h3 className="text-forest text-sm font-bold uppercase tracking-[0.1em] mb-4">Business Approach</h3>
              <p className="text-text-main text-sm sm:text-[15px] leading-relaxed">
                Reliable sourcing, transparent communication, quality awareness, and buyer-oriented coordination.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5 — OUR VALUES
   ================================================================ */

const VALUES = [
  {
    num: '01',
    name: 'Integrity',
    desc: 'We prioritize clear and responsible communication throughout every business transaction.',
  },
  {
    num: '02',
    name: 'Reliability',
    desc: 'We aim to coordinate supply and commercial requirements according to agreed expectations.',
  },
  {
    num: '03',
    name: 'Quality Awareness',
    desc: 'We pay close attention to product requirements, preparation, inspection, and applicable quality parameters.',
  },
  {
    num: '04',
    name: 'Partnership',
    desc: 'We value long-term cooperation and mutual understanding over one-time transactions.',
  },
];

function OurValues() {
  return (
    <section className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Our Values
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight">
            Principles Behind
            <br className="hidden sm:block" />
            {' '}How We Work
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {VALUES.map((v, i) => (
            <FadeIn key={v.num} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-border-warm/40 p-6 sm:p-7 h-full">
                <div className="w-8 h-px bg-gold mb-5" aria-hidden="true" />
                <span className="text-text-muted/50 text-xs font-bold tracking-wider">{v.num}</span>
                <h3 className="text-forest text-base font-bold mt-1.5 mb-3">{v.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6 — RESPONSIBLE SOURCING APPROACH
   ================================================================ */

const SOURCING_PRINCIPLES = [
  {
    title: 'Selected Supply Partners',
    desc: 'Working with suitable farmers, suppliers, and processors based on product and transaction requirements.',
  },
  {
    title: 'Clear Product Origin',
    desc: 'Maintaining relevant sourcing information where available.',
  },
  {
    title: 'Partnership-Based Coordination',
    desc: 'Building practical working relationships throughout the supply chain.',
  },
  {
    title: 'Buyer Requirement Alignment',
    desc: 'Coordinating product preparation based on confirmed commercial requirements.',
  },
];

function ResponsibleSourcing() {
  return (
    <section className="bg-cream/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <div className="lg:grid lg:grid-cols-[7fr_13fr] lg:gap-12 xl:gap-20">
          <FadeIn className="mb-10 lg:mb-0">
            <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
              Our Sourcing Approach
            </p>
            <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight">
              Strong Relationships
              <br className="hidden sm:block" />
              {' '}Begin at the Source
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed mb-8 max-w-2xl">
              We believe reliable agricultural supply begins with effective coordination at the source. Erka Agro works with selected supply partners and aims to maintain clear communication regarding product availability, origin, preparation, and buyer requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SOURCING_PRINCIPLES.map((item, i) => (
                <div key={item.title} className="flex gap-3.5">
                  <span className="text-gold mt-1 shrink-0">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" aria-hidden="true">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-forest text-sm font-bold mb-1">{item.title}</p>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 7 — HOW WE WORK
   ================================================================ */

const PROCESS_STEPS = [
  { num: '01', title: 'Understand Requirements', desc: 'Product, form, quantity, specifications, packaging, destination, and commercial terms.' },
  { num: '02', title: 'Coordinate Supply', desc: 'Suitable sourcing and availability are reviewed.' },
  { num: '03', title: 'Confirm Requirements', desc: 'Product and commercial details are aligned before order preparation.' },
  { num: '04', title: 'Prepare & Inspect', desc: 'Applicable product preparation and quality checks are coordinated.' },
  { num: '05', title: 'Documents & Logistics', desc: 'Commercial documentation and shipping arrangements are prepared.' },
  { num: '06', title: 'Shipment', desc: 'Product is coordinated for export according to the agreed transaction.' },
];

function HowWeWork() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            How We Work
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight">
            A Clear Process
            <br className="hidden sm:block" />
            {' '}from Inquiry to Shipment
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-10 lg:mb-14">
          {PROCESS_STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 60}>
              <div className="flex gap-4">
                <span className="text-gold/50 text-xs font-bold tracking-wider mt-0.5 shrink-0">{step.num}</span>
                <div>
                  <h3 className="text-forest text-sm font-bold mb-1.5">{step.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ================================================================
   SECTION 8 — OUR PRODUCTS
   ================================================================ */

function OurProducts() {
  return (
    <section id="our-products" className="bg-cream/50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Our Commodities
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
            Selected Indonesian Spices
          </h2>
          <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed">
            Our current product focus includes selected agricultural commodities from East Java, Indonesia.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Long Pepper */}
          <FadeIn delay={100}>
            <article className="bg-white rounded-2xl border border-border-warm/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <div className="relative aspect-[5/3] overflow-hidden bg-cream">
                <img
                  src="/about/long-pepper-card.jpg"
                  alt="Indonesian Whole Dried Long Pepper"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <p className="text-text-muted text-xs italic tracking-wide mb-1">Piper retrofractum</p>
                <h3 className="text-forest text-xl sm:text-2xl font-bold leading-tight mb-4">Indonesian Long Pepper</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[['Form', 'Whole Dried'], ['Origin', 'East Java'], ['MOQ', '1 Ton']].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-0.5">{l}</p>
                      <p className="text-text-main text-xs sm:text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                  A distinctive Indonesian spice with a strong characteristic aroma and warm pungent taste.
                </p>
                <Button asChild className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl w-full sm:w-auto group/btn">
                  <Link href="/products/long-pepper">
                    Explore Long Pepper
                    <ArrowRight className="size-3.5 ml-2 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </article>
          </FadeIn>

          {/* Turmeric */}
          <FadeIn delay={250}>
            <article className="bg-white rounded-2xl border border-border-warm/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <div className="relative aspect-[5/3] overflow-hidden bg-cream">
                <img
                  src="/about/turmeric-card.jpg"
                  alt="Indonesian Turmeric"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <p className="text-text-muted text-xs italic tracking-wide mb-1">Curcuma longa</p>
                <h3 className="text-forest text-xl sm:text-2xl font-bold leading-tight mb-4">Indonesian Turmeric</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[['Forms', 'Sliced / Powder'], ['Origin', 'East Java'], ['MOQ', '1 Ton']].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-0.5">{l}</p>
                      <p className="text-text-main text-xs sm:text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                  Indonesian turmeric with its natural yellow-orange appearance and characteristic aroma.
                </p>
                <Button asChild className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl w-full sm:w-auto group/btn">
                  <Link href="/products/turmeric">
                    Explore Turmeric
                    <ArrowRight className="size-3.5 ml-2 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 9 — WHY INTERNATIONAL BUYERS WORK WITH US
   ================================================================ */

const BUYER_REASONS = [
  { title: 'Clear Communication', desc: 'Practical communication throughout inquiry, preparation, and shipment.' },
  { title: 'Flexible Coordination', desc: 'Product and commercial requirements can be discussed according to supply capability.' },
  { title: 'Export-Oriented Process', desc: 'Commercial documentation and shipment requirements are considered from the beginning.' },
  { title: 'Quality Awareness', desc: 'Product specifications and applicable inspection requirements are aligned before shipment.' },
  { title: 'Long-Term Mindset', desc: 'We aim to develop repeat business and dependable supply relationships.' },
];

function WhyBuyers() {
  return (
    <section className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Why Erka Agro
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight">
            A Practical Approach
            <br className="hidden sm:block" />
            {' '}to International Sourcing
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {BUYER_REASONS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 60} className={i >= 3 ? 'sm:col-span-1 lg:col-span-1' : ''}>
              <div className={cn(
                'bg-white rounded-2xl border border-border-warm/40 p-6 sm:p-7 h-full',
                i >= 3 && 'lg:col-start-1'
              )}>
                <h3 className="text-forest text-sm font-bold mb-2.5">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 10 — PARTNERSHIP SECTION
   ================================================================ */

function PartnershipSection() {
  return (
    <section id="partnership" className="bg-forest py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mx-auto text-center">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Work With Us
          </p>
          <h2 className="text-white text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-6">
            Built for Partnership,
            <br className="hidden sm:block" />
            {' '}Not Just Transactions
          </h2>
          <p className="text-white/70 text-sm sm:text-[15px] leading-relaxed mb-3">
            We welcome cooperation with importers, distributors, manufacturers, wholesalers, processors, and trading companies seeking agricultural products from Indonesia.
          </p>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Whether you are evaluating a new supplier, developing a product, or looking for additional sourcing options, our team is ready to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-white text-forest hover:bg-cream font-bold text-sm px-6 h-11 rounded-xl w-full sm:w-auto">
              <Link href="/contact">
                Discuss Your Requirements
                <ArrowRight className="size-3.5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold text-sm px-6 h-11 rounded-xl w-full sm:w-auto">
              <a
                href="https://wa.me/6285196245196?text=Hello%20Mr.%20Riswan%2C%20I%20would%20like%20to%20discuss%20a%20potential%20sourcing%20partnership%20with%20Erka%20Agro."
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
   SECTION 11 — COMPANY INFORMATION
   ================================================================ */

function CompanyInformation() {
  return (
    <section className="bg-cream/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-4">
            Company Information
          </p>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight">
            PT. Erka Agro Niaga
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="bg-white rounded-2xl border border-border-warm/40 p-6 sm:p-8 lg:p-10 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-1">Commercial Brand</p>
                <p className="text-text-main text-sm font-semibold">Erka Agro</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-1">Legal Company</p>
                <p className="text-text-main text-sm font-semibold">PT. Erka Agro Niaga</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-1">Business</p>
                <p className="text-text-main text-sm font-semibold">Agricultural Trading & Export</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-1">Contact Person</p>
                <p className="text-text-main text-sm font-semibold">Mr. Riswan <span className="text-text-muted font-normal">— Director</span></p>
              </div>
            </div>

            <div className="border-t border-border-warm/50 mt-8 pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-text-muted/70 mb-2">Address</p>
                  <address className="not-italic text-text-main text-sm leading-relaxed">
                    Perum Absolute Place Blok D4<br />
                    Kel. Karang Semanding<br />
                    Tuban, East Java<br />
                    Indonesia
                  </address>
                </div>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/6285196245196"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-text-muted text-sm hover:text-forest transition-colors duration-200 group"
                  >
                    <Phone className="size-3.5 text-text-muted/50 group-hover:text-forest/60 transition-colors" />
                    +62 851-9624-5196
                  </a>
                  <a
                    href="mailto:sales@erkaagro.com"
                    className="flex items-center gap-2.5 text-text-muted text-sm hover:text-forest transition-colors duration-200 group"
                  >
                    <Mail className="size-3.5 text-text-muted/50 group-hover:text-forest/60 transition-colors" />
                    sales@erkaagro.com
                  </a>
                  <div className="flex items-center gap-2.5 text-text-muted text-sm">
                    <Globe className="size-3.5 text-text-muted/50" />
                    erkaagro.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 12 — FINAL CTA
   ================================================================ */

function FinalCta() {
  return (
    <section className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <FadeIn className="max-w-2xl mx-auto text-center">
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
            Looking for a Reliable
            <br className="hidden sm:block" />
            {' '}Indonesian Supply Partner?
          </h2>
          <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed mb-8 max-w-lg mx-auto">
            Talk with our team about Long Pepper, Turmeric, sourcing requirements, specifications, packaging, or export arrangements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl w-full sm:w-auto">
              <Link href="/request-quote">
                Request a Quote
                <ArrowRight className="size-3.5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-border-warm text-forest font-bold text-sm px-6 h-11 rounded-xl hover:bg-cream w-full sm:w-auto">
              <a href="#our-products">View Our Products</a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN EXPORT
   ================================================================ */

export function AboutContent() {
  return (
    <>
      <PageNavbar />
      <main className="pt-[72px]">
        <AboutHero />
        <WhoWeAre />
        <WhatWeDo />
        <OurDirection />
        <OurValues />
        <ResponsibleSourcing />
        <HowWeWork />
        <OurProducts />
        <WhyBuyers />
        <PartnershipSection />
        <CompanyInformation />
        <FinalCta />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, ChevronRight, Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/* ================================================================
   SCROLL SUBSCRIPTION (SSR-safe)
   ================================================================ */

const SCROLL_THRESHOLD = 20;

function subscribeToScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}
function getScrolledSnapshot() { return window.scrollY > SCROLL_THRESHOLD; }
function getServerFalse() { return false; }

/* ================================================================
   NAV ITEMS
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
          className={cn('p-2 rounded-lg transition-colors duration-200', scrolled ? 'text-text-main hover:bg-cream' : 'text-text-main hover:bg-white/50')}
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
                      <button onClick={() => setProductsOpen(!productsOpen)} className="flex items-center justify-between w-full px-6 py-3 text-[15px] font-medium text-text-main hover:bg-cream transition-colors">
                        {item.label}
                        <ChevronDown className={cn('size-4 text-text-muted transition-transform duration-200', productsOpen && 'rotate-180')} />
                      </button>
                      {productsOpen && item.children && (
                        <div className="pl-4">
                          {item.children.map((child) => (
                            <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)} className="block px-6 py-2.5 text-sm text-text-muted hover:text-forest hover:bg-cream/50 transition-colors">
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href} onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-[15px] font-medium text-text-main hover:bg-cream transition-colors">
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
   NAVBAR
   ================================================================ */

function PageNavbar() {
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolledSnapshot, getServerFalse);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-border-warm shadow-sm' : 'bg-transparent')}>
      <nav className="mx-auto max-w-[1240px] flex items-center justify-between px-6 lg:px-16 h-[72px]">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Erka Agro" className="w-9 h-9 rounded-lg object-cover" />
          <span className={cn('font-semibold text-lg tracking-tight transition-colors duration-300', scrolled ? 'text-text-main' : 'text-forest')}>Erka Agro</span>
        </Link>
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="relative group">
              {item.hasDropdown ? (
                <button className={cn('flex items-center gap-1 px-3 py-2 text-[15px] font-medium rounded-lg transition-colors duration-200 cursor-pointer', scrolled ? 'text-text-main hover:bg-cream hover:text-forest' : 'text-text-main/80 hover:bg-white/50 hover:text-forest')}>
                  {item.label}<ChevronDown className="size-3.5 opacity-60" />
                </button>
              ) : (
                <Link href={item.href} className={cn('px-3 py-2 text-[15px] font-medium rounded-lg transition-colors duration-200 block', scrolled ? 'text-text-main hover:bg-cream hover:text-forest' : 'text-text-main/80 hover:bg-white/50 hover:text-forest')}>
                  {item.label}
                </Link>
              )}
              {item.hasDropdown && item.children && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl border border-border-warm shadow-lg py-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} className="block px-4 py-2.5 text-sm text-text-main hover:bg-cream hover:text-forest transition-colors">{child.label}</Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <Button asChild className="bg-forest hover:bg-forest-dark text-white font-bold text-[15px] px-5 h-10 rounded-xl transition-colors duration-200">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
        <div className={cn('lg:hidden', !mounted && 'invisible')}>
          {mounted && <MobileMenu scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} productsOpen={productsOpen} setProductsOpen={setProductsOpen} />}
        </div>
      </nav>
    </header>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */

function PageFooter() {
  return (
    <footer className="bg-forest-dark text-white">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] gap-10 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Erka Agro" className="w-9 h-9 rounded-lg object-cover bg-white p-0.5" />
              <span className="font-bold text-lg tracking-tight">ERKA AGRO</span>
            </div>
            <p className="text-white/40 text-xs font-medium tracking-wide uppercase mb-3">PT. Erka Agro Niaga</p>
            <p className="text-white/60 text-sm leading-relaxed mb-2 max-w-xs">
              Indonesian agricultural trading and export company supplying selected Long Pepper and Turmeric for international markets.
            </p>
            <p className="text-white/35 text-[13px] leading-relaxed italic">Selected Indonesian Spices for Global Markets</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">Products</h3>
            <ul className="space-y-2.5">
              <li><Link href="/products/long-pepper" className="text-white/60 text-sm hover:text-gold transition-colors duration-200">Long Pepper</Link></li>
              <li><Link href="/products/turmeric" className="text-white/60 text-sm hover:text-gold transition-colors duration-200">Turmeric</Link></li>
              <li><Link href="/contact" className="text-white/60 text-sm hover:text-gold transition-colors duration-200">Request a Quote</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-white/60 text-sm hover:text-gold transition-colors duration-200">About Us</Link></li>
              <li><Link href="/contact" className="text-white/60 text-sm hover:text-gold transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">Contact</h3>
            <div className="space-y-3">
              <div><p className="text-white text-sm font-medium">Mr. Riswan</p><p className="text-white/50 text-xs">Director</p></div>
              <a href="https://wa.me/6285196245196" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/60 text-sm hover:text-gold transition-colors duration-200 group">
                <span className="size-3.5 text-white/30 group-hover:text-gold/60">☎</span>+62 851-9624-5196
              </a>
              <a href="mailto:sales@erkaagro.com" className="flex items-center gap-2.5 text-white/60 text-sm hover:text-gold transition-colors duration-200 group">
                <span className="size-3.5 text-white/30 group-hover:text-gold/60">✉</span>sales@erkaagro.com
              </a>
              <div className="flex items-center gap-2.5 text-white/60 text-sm">
                <span className="size-3.5 text-white/30">🌐</span>erkaagro.com
              </div>
              <address className="not-italic mt-4 pt-4 border-t border-white/10">
                <p className="text-white/50 text-[13px] leading-relaxed">Perum Absolute Place Blok D4<br />Kel. Karang Semanding<br />Tuban, East Java<br />Indonesia</p>
              </address>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/40 text-xs sm:text-[13px]">&copy; 2026 PT. Erka Agro Niaga. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-white/40 text-xs sm:text-[13px] hover:text-white/70 transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="text-white/40 text-xs sm:text-[13px] hover:text-white/70 transition-colors duration-200">Terms / Legal</Link>
          </div>
        </div>
      </div>
    </footer>
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
      href="https://wa.me/6285196245196?text=Hello%20Mr.%20Riswan%2C%20I%20would%20like%20to%20inquire%20about%20Erka%20Agro%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, box-shadow 0.2s, scale 0.2s' }}
    >
      <svg viewBox="0 0 32 32" className="size-5.5" fill="currentColor" aria-hidden="true">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.052 9.378L1.054 31.29l6.118-1.962A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.34 22.616c-.392 1.106-1.942 2.026-3.19 2.292-.852.18-1.964.324-5.71-1.228-4.792-1.986-7.878-6.844-8.116-7.158-.23-.314-1.934-2.574-1.934-4.908s1.226-3.482 1.66-3.962c.434-.48.948-.6 1.264-.6.316 0 .632.004.908.016.29.016.68-.11 1.064.812.392.942 1.334 3.266 1.452 3.502.118.236.198.512.04.826-.158.314-.236.508-.47.784-.236.276-.496.616-.708.826-.236.236-.482.492-.206.964.274.472 1.222 2.016 2.624 3.266 1.804 1.606 3.326 2.104 3.798 2.34.472.236.748.198 1.022-.118.274-.316 1.184-1.38 1.5-1.856.316-.476.632-.394 1.064-.236.434.158 2.746 1.296 3.218 1.532.472.236.788.354.906.55.118.196.118 1.14-.274 2.246z" />
      </svg>
    </a>
  );
}

/* ================================================================
   EXPORTED LAYOUT
   ================================================================ */

export function PlaceholderLayout({ children, title, breadcrumbs }: { children: React.ReactNode; title: string; breadcrumbs?: { label: string; href?: string }[] }) {
  const crumbs = breadcrumbs || [{ label: title }];
  return (
    <>
      <PageNavbar />
      <main className="pt-[72px] min-h-[70vh]">
        <div className="bg-ivory">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16 py-16 sm:py-20 lg:py-24">
            <nav className="flex items-center gap-1.5 text-sm mb-10">
              <Link href="/" className="text-text-muted hover:text-forest transition-colors">Home</Link>
              {crumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3 text-text-muted/50" />
                  {crumb.href && i < crumbs.length - 1 ? (
                    <Link href={crumb.href} className="text-text-muted hover:text-forest transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="text-forest font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
            {children}
          </div>
        </div>
      </main>
      <PageFooter />
      <FloatingWhatsApp />
    </>
  );
}

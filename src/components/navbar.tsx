'use client';

import { useState, useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '#products',
    hasDropdown: true,
    children: [
      { label: 'Long Pepper', href: '/products/long-pepper' },
      { label: 'Turmeric', href: '/products/turmeric' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

const SCROLL_THRESHOLD = 20;

function subscribeToScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

function getScrolledSnapshot() {
  return window.scrollY > SCROLL_THRESHOLD;
}

function getServerScrolledSnapshot() {
  return false;
}

function MobileMenu({
  scrolled,
  mobileOpen,
  setMobileOpen,
  productsOpen,
  setProductsOpen,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  productsOpen: boolean;
  setProductsOpen: (v: boolean) => void;
}) {
  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <button
          className={cn(
            'p-2 rounded-lg transition-colors duration-200',
            scrolled
              ? 'text-text-main hover:bg-cream'
              : 'text-text-main hover:bg-white/50'
          )}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-white p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div className="flex items-center gap-2 px-6 h-[72px] border-b border-border-warm">
            <img src="/logo.png" alt="Erka Agro" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-semibold text-base text-text-main">
              Erka Agro
            </span>
          </div>

          {/* Mobile nav items */}
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
                        <ChevronDown
                          className={cn(
                            'size-4 text-text-muted transition-transform duration-200',
                            productsOpen && 'rotate-180'
                          )}
                        />
                      </button>
                      {productsOpen && item.children && (
                        <div className="pl-4">
                          {item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-6 py-2.5 text-sm text-text-muted hover:text-forest hover:bg-cream/50 transition-colors"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-3 text-[15px] font-medium text-text-main hover:bg-cream transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile CTA */}
          <div className="px-6 py-5 border-t border-border-warm">
            <Button
              asChild
              className="w-full bg-forest hover:bg-forest-dark text-white font-bold text-[15px] h-11 rounded-xl transition-colors duration-200"
            >
              <a href="/request-quote" onClick={() => setMobileOpen(false)}>
                Request a Quote
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Navbar() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolledSnapshot,
    getServerScrolledSnapshot
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Erka Agro" className="w-9 h-9 rounded-lg object-cover" />
          <span
            className={cn(
              'font-semibold text-lg tracking-tight transition-colors duration-300',
              scrolled ? 'text-text-main' : 'text-forest'
            )}
          >
            Erka Agro
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="relative group">
              {item.hasDropdown ? (
                <button
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-[15px] font-medium rounded-lg transition-colors duration-200 cursor-pointer',
                    scrolled
                      ? 'text-text-main hover:bg-cream hover:text-forest'
                      : 'text-text-main/80 hover:bg-white/50 hover:text-forest'
                  )}
                >
                  {item.label}
                  <ChevronDown className="size-3.5 opacity-60" />
                </button>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-[15px] font-medium rounded-lg transition-colors duration-200 block',
                    scrolled
                      ? 'text-text-main hover:bg-cream hover:text-forest'
                      : 'text-text-main/80 hover:bg-white/50 hover:text-forest'
                  )}
                >
                  {item.label}
                </a>
              )}

              {/* Dropdown for Products */}
              {item.hasDropdown && item.children && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl border border-border-warm shadow-lg py-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-text-main hover:bg-cream hover:text-forest transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            className="bg-forest hover:bg-forest-dark text-white font-bold text-[15px] px-5 h-10 rounded-xl transition-colors duration-200"
          >
            <a href="/request-quote">Request a Quote</a>
          </Button>
        </div>

        {/* Mobile Menu — client-only to avoid Radix hydration mismatch */}
        <div className={cn('lg:hidden', !mounted && 'invisible')}>          {mounted && (
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

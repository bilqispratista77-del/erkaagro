'use client';

import { Phone, Mail, Globe, MapPin, Linkedin, Instagram } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

const PRODUCT_LINKS = [
  { label: 'Long Pepper', href: '/products/long-pepper' },
  { label: 'Turmeric', href: '/products/turmeric' },
  { label: 'Request a Quote', href: '/request-quote' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-forest-dark text-white">
      {/* Main Footer Grid */}
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16 py-14 sm:py-16 lg:py-20">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] gap-10 lg:gap-8">

            {/* Column 1 — Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo.png" alt="Erka Agro" className="w-9 h-9 rounded-lg object-cover bg-white p-0.5" />
                <span className="font-bold text-lg tracking-tight text-white">
                  ERKA AGRO
                </span>
              </div>
              <p className="text-white/40 text-xs font-medium tracking-wide uppercase mb-3">
                PT. Erka Agro Niaga
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-2 max-w-xs">
                Indonesian agricultural trading and export company supplying selected Long Pepper and Turmeric for international markets.
              </p>
              <p className="text-white/35 text-[13px] leading-relaxed italic">
                Selected Indonesian Spices for Global Markets
              </p>
              <div className="hidden lg:flex items-center gap-3 mt-4">
              <a
                href="https://www.linkedin.com/company/erka-agro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-8 rounded-full bg-white/10 hover:bg-gold/20 text-white/50 hover:text-gold transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="https://www.instagram.com/erkaagro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-8 rounded-full bg-white/10 hover:bg-gold/20 text-white/50 hover:text-gold transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
            </div>

            {/* Column 2 — Products */}
            <div>
              <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
                Products
              </h3>
              <ul className="space-y-2.5">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 text-sm hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Company */}
            <div>
              <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 text-sm hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Contact */}
            <div>
              <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
                Contact
              </h3>
              <div className="space-y-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/6285196245196"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/60 text-sm hover:text-gold transition-colors duration-200 group"
                >
                  <Phone className="size-3.5 text-white/30 group-hover:text-gold/60 transition-colors duration-200" />
                  +62 851-9624-5196
                </a>

                {/* Email */}
                <a
                  href="mailto:sales@erkaagro.com"
                  className="flex items-center gap-2.5 text-white/60 text-sm hover:text-gold transition-colors duration-200 group"
                >
                  <Mail className="size-3.5 text-white/30 group-hover:text-gold/60 transition-colors duration-200" />
                  sales@erkaagro.com
                </a>

                {/* Website */}
                <div className="flex items-center gap-2.5 text-white/60 text-sm">
                  <Globe className="size-3.5 text-white/30" />
                  erkaagro.com
                </div>

                {/* Address */}
                <address className="not-italic mt-4 pt-4 border-t border-white/10">
                  <div className="flex gap-2.5">
                    <MapPin className="size-3.5 text-white/30 mt-0.5 shrink-0" />
                    <p className="text-white/50 text-[13px] leading-relaxed">
                      Perum Absolute Place Blok D4<br />
                      Kel. Karang Semanding<br />
                      Tuban, East Java<br />
                      Indonesia
                    </p>
                  </div>
                </address>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/40 text-xs sm:text-[13px]">
            &copy; 2026 PT. Erka Agro Niaga. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy"
              className="text-white/40 text-xs sm:text-[13px] hover:text-white/70 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-white/40 text-xs sm:text-[13px] hover:text-white/70 transition-colors duration-200"
            >
              Terms / Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

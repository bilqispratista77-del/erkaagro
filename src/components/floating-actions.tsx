'use client';

import { useState, useEffect, useSyncExternalStore, useCallback } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

/* ---- Scroll subscription for SSR-safe useSyncExternalStore ---- */

const SCROLL_SHOW_THRESHOLD = 600;

function subscribeToScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

function getShowBackTopSnapshot() {
  return window.scrollY > SCROLL_SHOW_THRESHOLD;
}

function getServerSnapshotFalse() {
  return false;
}

/* ---- WhatsApp Button ---- */

function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/6285196245196?text=Hello%20Mr.%20Riswan%2C%20I%20would%20like%20to%20inquire%20about%20Erka%20Agro%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, box-shadow 0.2s, scale 0.2s',
      }}
    >
      <svg
        viewBox="0 0 32 32"
        className="size-5.5 sm:size-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.052 9.378L1.054 31.29l6.118-1.962A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.34 22.616c-.392 1.106-1.942 2.026-3.19 2.292-.852.18-1.964.324-5.71-1.228-4.792-1.986-7.878-6.844-8.116-7.158-.23-.314-1.934-2.574-1.934-4.908s1.226-3.482 1.66-3.962c.434-.48.948-.6 1.264-.6.316 0 .632.004.908.016.29.016.68-.11 1.064.812.392.942 1.334 3.266 1.452 3.502.118.236.198.512.04.826-.158.314-.236.508-.47.784-.236.276-.496.616-.708.826-.236.236-.482.492-.206.964.274.472 1.222 2.016 2.624 3.266 1.804 1.606 3.326 2.104 3.798 2.34.472.236.748.198 1.022-.118.274-.316 1.184-1.38 1.5-1.856.316-.476.632-.394 1.064-.236.434.158 2.746 1.296 3.218 1.532.472.236.788.354.906.55.118.196.118 1.14-.274 2.246z" />
      </svg>
    </a>
  );
}

/* ---- Back to Top Button ---- */

function BackToTopButton({ show }: { show: boolean }) {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-forest shadow-md shadow-black/10 hover:bg-white hover:shadow-lg active:scale-95 transition-all duration-200"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(8px)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity 0.25s ease, transform 0.25s ease, box-shadow 0.2s, scale 0.2s, background-color 0.2s',
      }}
    >
      <ArrowUp className="size-4" />
    </button>
  );
}

/* ---- Combined Floating Actions ---- */

export function FloatingActions() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const showBackTop = useSyncExternalStore(
    subscribeToScroll,
    getShowBackTopSnapshot,
    getServerSnapshotFalse
  );

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      <BackToTopButton show={showBackTop} />
      <WhatsAppButton />
    </div>
  );
}

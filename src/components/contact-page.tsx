'use client';

import { useState, useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+62 851-9624-5196',
    href: 'tel:+6285196245196',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sales@erkaagro.com',
    href: 'mailto:sales@erkaagro.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Perum Absolute Place Blok D4, Kel. Karang Semanding, Tuban, East Java, Indonesia',
    href: null,
  },
];

function ContactForm() {
  const isMounted = useIsMounted();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: '', email: '', phone: '', message: '' });
      }
    } finally {
      setSending(false);
    }
  };

  if (!isMounted) return null;

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
          <svg className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-forest">Message Sent</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSent(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={update('name')}
          placeholder="Your full name"
          className="w-full rounded-xl border border-border-warm/50 bg-ivory/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-forest/30 focus:border-forest"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update('email')}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border-warm/50 bg-ivory/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-forest/30 focus:border-forest"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={update('phone')}
            placeholder="Your phone number"
            className="w-full rounded-xl border border-border-warm/50 bg-ivory/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-forest/30 focus:border-forest"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={update('message')}
          placeholder="How can we help you?"
          className="w-full resize-none rounded-xl border border-border-warm/50 bg-ivory/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-forest/30 focus:border-forest"
        />
      </div>

      <Button
        type="submit"
        disabled={sending}
        className="w-full bg-forest text-white hover:bg-forest/90"
      >
        {sending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        {sending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

export function ContactContent() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero */}
        <section className="bg-ivory py-14 sm:py-20">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center px-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                Contact Us
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-forest sm:text-5xl">
                Get in Touch
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Have a question or want to work with us? We&apos;d love to hear from you.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left – Info */}
              <FadeIn direction="left" className="lg:col-span-5">
                <div className="space-y-8">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/10">
                        <Icon className="h-5 w-5 text-forest" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-0.5 block text-sm font-medium text-foreground transition hover:text-forest"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm text-foreground/80 leading-relaxed">
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Right – Form */}
              <FadeIn direction="right" className="lg:col-span-7">
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

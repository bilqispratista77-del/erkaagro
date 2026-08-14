'use client';

import { useSyncExternalStore } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/fade-in';

interface FAQ {
  q: string;
  a: string;
  notes?: { label: string; text: string }[];
}

const FAQS: FAQ[] = [
  {
    q: 'What is your minimum order quantity?',
    a: 'Our standard minimum order quantity is 1 metric ton for both Indonesian Long Pepper and Indonesian Turmeric. Different requirements can still be discussed depending on the product, packaging, and commercial conditions.',
  },
  {
    q: 'Can I request a product sample?',
    a: 'Yes. Product samples can be discussed for evaluation before a commercial order. Sample availability, quantity, courier cost, and delivery arrangements will be confirmed based on the selected product and destination.',
  },
  {
    q: 'Can you follow buyer-specific product specifications?',
    a: 'Yes. Product requirements can be discussed before order preparation. Specifications are subject to product availability, processing capability, testing arrangements, and agreed commercial terms.',
  },
  {
    q: 'What Long Pepper form do you supply?',
    a: 'We currently supply Indonesian Long Pepper in Whole Dried form only.',
  },
  {
    q: 'What Turmeric forms are available?',
    a: 'Indonesian Turmeric is available in Dried Sliced and Powder forms. Powder mesh size can be discussed based on buyer requirements.',
  },
  {
    q: 'Where do your products come from?',
    a: 'Our Indonesian Long Pepper and Turmeric are sourced from East Java, Indonesia, through selected supply partners.',
  },
  {
    q: 'Are the products available year-round?',
    a: 'Both Long Pepper and Turmeric are listed as available year-round, subject to actual crop conditions, product availability, and confirmed order requirements.',
  },
  {
    q: 'What shipping terms do you offer?',
    a: 'For Indonesian Long Pepper, the currently listed shipping term is FOB. For Indonesian Turmeric, FOB and CIF can be discussed based on the transaction and destination.',
  },
  {
    q: 'Which port do you ship from?',
    a: 'Our primary loading port is Tanjung Perak, Surabaya, East Java, Indonesia.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Payment terms can be arranged using T/T or L/C, subject to the agreed transaction and commercial terms.',
  },
  {
    q: 'What export documents can be provided?',
    a: 'Applicable commercial and export documents can include Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate, Certificate of Analysis, and Bill of Lading, depending on the product, destination, and shipment requirements.',
  },
  {
    q: 'Can laboratory testing be arranged?',
    a: 'Yes. Relevant laboratory testing can be arranged upon request based on the product, buyer requirements, and destination-market requirements.',
  },
  {
    q: 'Can you provide custom packaging?',
    a: 'Packaging requirements can be discussed based on product type, quantity, supplier capability, and export requirements.',
    notes: [
      { label: 'Long Pepper', text: '25 kg / 50 kg polypropylene sack or based on buyer requirement.' },
      { label: 'Turmeric', text: 'Packaging based on buyer requirement.' },
    ],
  },
  {
    q: 'What information should I provide when requesting a quotation?',
    a: 'To help us review your inquiry efficiently, please provide the product, required form, quantity, specification, packaging requirement, destination country, destination port, preferred shipping term, and required documents.',
  },
  {
    q: 'How can I contact Erka Agro directly?',
    a: 'You can send a product inquiry through the Request a Quote form or contact Mr. Riswan directly via WhatsApp at +62 851-9624-5196 or email sales@erkaagro.com.',
  },
];

function FAQItem({ faq, value }: { faq: FAQ; value: string }) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className="border-b border-border-warm/40 last:border-b-0"
    >
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-4 sm:py-5 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:ring-offset-2 focus-visible:rounded-lg transition-colors duration-200">
          <span className="text-forest text-[15px] sm:text-[17px] font-semibold leading-snug pr-2 group-data-[state=open]:text-forest transition-colors duration-200">
            {faq.q}
          </span>
          <span className="shrink-0 w-7 h-7 rounded-full border border-border-warm/60 bg-ivory/60 flex items-center justify-center group-data-[state=open]:border-gold/40 group-data-[state=open]:bg-gold/5 transition-all duration-200">
            <Plus className="size-3.5 text-forest/40 group-data-[state=open]:hidden transition-all duration-200" />
            <Minus className="size-3.5 text-gold hidden group-data-[state=open]:block transition-all duration-200" />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pb-5 sm:pb-6">
          <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed">
            {faq.a}
          </p>
          {faq.notes && faq.notes.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {faq.notes.map((note, i) => (
                <p key={i} className="text-text-muted text-xs sm:text-[13px] leading-relaxed">
                  <span className="font-semibold text-forest/70">{note.label}:</span>{' '}
                  {note.text}
                </p>
              ))}
            </div>
          )}
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

const FAQStructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      }),
    }}
  />
);

export function FAQSection() {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  return (
    <section className="bg-ivory py-20 sm:py-24 lg:py-28">
      <FAQStructuredData />
      <div className="mx-auto max-w-[1000px] px-5 sm:px-6 lg:px-8">

        <FadeIn className="text-center mb-12 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">
              Frequently Asked Questions
            </p>
            <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
          </div>
          <h2 className="text-forest text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
            Common Questions
            <br className="hidden sm:block" />
            {' '}from International Buyers
          </h2>
          <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed max-w-xl mx-auto">
            Find quick answers about product requirements, order quantities, shipping, documentation, and export coordination.
          </p>
        </FadeIn>

        {mounted ? (
          <FadeIn delay={100}>
            <AccordionPrimitive.Root
              type="single"
              collapsible
              defaultValue="0"
              className="border-t border-border-warm/50"
            >
              {FAQS.map((faq, i) => (
                <FAQItem key={i} faq={faq} value={String(i)} />
              ))}
            </AccordionPrimitive.Root>
          </FadeIn>
        ) : (
          <div className="h-96" />
        )}

        <FadeIn delay={200} className="mt-12 sm:mt-14 pt-8 border-t border-border-warm/40 text-center">
          <h3 className="text-forest text-base sm:text-lg font-bold leading-snug mb-1.5">
            Still Have a Question?
          </h3>
          <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed max-w-md mx-auto mb-6">
            Our team can help review your product, specification, shipping, or documentation requirements.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
            <Button
              asChild
              className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 h-11 rounded-xl transition-all duration-200 group/cta w-full sm:w-auto"
            >
              <a
                href="https://wa.me/6285196245196?text=Hello%20Mr.%20Riswan%2C%20I%20have%20a%20question%20about%20Erka%20Agro%20products%20and%20export%20requirements."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4 mr-2" />
                Ask Our Team
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border-warm text-forest font-bold text-sm px-6 h-11 rounded-xl hover:bg-cream transition-all duration-200 group/sec w-full sm:w-auto"
            >
              <a href="/request-quote">
                Request a Quote
                <ArrowRight className="size-3.5 ml-1.5 transition-transform duration-200 group-hover/sec:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

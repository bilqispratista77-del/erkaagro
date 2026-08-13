import type { Metadata } from 'next';
import { ContactContent } from '@/components/contact-page';

export const metadata: Metadata = {
  title: 'Contact Erka Agro | Indonesian Spice Supplier & Exporter',
  description:
    'Contact Erka Agro for Indonesian Long Pepper and Turmeric sourcing, quotations, samples, product specifications, and export inquiries from East Java, Indonesia.',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://erkaagro.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: 'https://erkaagro.com/contact',
    },
  ],
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PT. Erka Agro Niaga',
  alternateName: 'Erka Agro',
  url: 'https://erkaagro.com',
  email: 'sales@erkaagro.com',
  telephone: '+62 851-9624-5196',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Perum Absolute Place Blok D4, Kel. Karang Semanding',
    addressLocality: 'Tuban',
    addressRegion: 'East Java',
    addressCountry: 'ID',
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <ContactContent />
    </>
  );
}

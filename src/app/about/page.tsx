import type { Metadata } from 'next';
import { AboutContent } from '@/components/about-page';

export const metadata: Metadata = {
  title: 'About Erka Agro | Indonesian Agricultural Export Company',
  description:
    'Learn about Erka Agro, the commercial brand of PT. Erka Agro Niaga, an Indonesian agricultural trading and export company supplying Long Pepper and Turmeric from East Java.',
  keywords: [
    'Erka Agro',
    'PT. Erka Agro Niaga',
    'Indonesian agricultural exporter',
    'Indonesian spice supplier',
    'agricultural trading company Indonesia',
    'East Java spice supplier',
    'Indonesian Long Pepper supplier',
    'Indonesian Turmeric supplier',
  ],
  openGraph: {
    title: 'About Erka Agro | Indonesian Agricultural Export Company',
    description:
      'Learn about Erka Agro, the commercial brand of PT. Erka Agro Niaga, an Indonesian agricultural trading and export company supplying Long Pepper and Turmeric from East Java.',
    type: 'website',
    siteName: 'Erka Agro',
  },
};

/* Organization Structured Data */
const organizationJsonLd = {
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

/* Breadcrumb Structured Data */
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
      name: 'About Us',
      item: 'https://erkaagro.com/about',
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutContent />
    </>
  );
}

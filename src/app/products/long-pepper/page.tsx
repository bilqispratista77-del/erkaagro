import type { Metadata } from 'next';
import { LongPepperContent } from '@/components/long-pepper-page';

export const metadata: Metadata = {
  title: 'Indonesian Long Pepper Supplier & Exporter | Erka Agro',
  description:
    'Source Whole Dried Indonesian Long Pepper (Piper retrofractum) from East Java, Indonesia. MOQ 1 ton, 40 tons/month capacity, FOB shipment from Tanjung Perak Surabaya.',
  keywords: [
    'Indonesian Long Pepper',
    'Whole Dried Long Pepper',
    'Piper retrofractum',
    'Long Pepper Supplier Indonesia',
    'Long Pepper Exporter Indonesia',
    'East Java Long Pepper',
    'Indonesian Spice Supplier',
    'B2B Long Pepper',
    'Long Pepper Export',
  ],
  openGraph: {
    title: 'Indonesian Long Pepper Supplier & Exporter | Erka Agro',
    description:
      'Source Whole Dried Indonesian Long Pepper (Piper retrofractum) from East Java, Indonesia. MOQ 1 ton, 40 tons/month capacity.',
    type: 'website',
    siteName: 'Erka Agro',
  },
};

export default function LongPepperPage() {
  return <LongPepperContent />;
}

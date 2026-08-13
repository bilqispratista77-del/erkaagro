import type { Metadata } from 'next';
import { TurmericContent } from '@/components/turmeric-page';

export const metadata: Metadata = {
  title: 'Indonesian Turmeric Supplier & Exporter | Erka Agro',
  description: 'Source Dried Sliced and Powder Indonesian Turmeric from East Java. FOB and CIF shipping available. Contact Erka Agro for quotation.',
};

export default function TurmericPage() {
  return <TurmericContent />;
}

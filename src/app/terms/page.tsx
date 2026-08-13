import type { Metadata } from 'next';
import { PlaceholderLayout } from '@/components/placeholder-page-layout';

export const metadata: Metadata = {
  title: 'Terms / Legal | Erka Agro',
  description: 'Terms and legal information for PT. Erka Agro Niaga.',
};

export default function TermsPage() {
  return (
    <PlaceholderLayout title="Terms / Legal">
      <div className="max-w-2xl">
        <h1 className="text-forest text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-8">Terms & Legal</h1>
        <div className="prose prose-sm text-text-muted space-y-4 text-[15px] leading-relaxed">
          <p>
            <strong className="text-text-main">Company:</strong> PT. Erka Agro Niaga
          </p>
          <p>
            <strong className="text-text-main">Commercial Brand:</strong> Erka Agro
          </p>
          <p>
            <strong className="text-text-main">Address:</strong> Perum Absolute Place Blok D4, Kel. Karang Semanding, Tuban, East Java, Indonesia
          </p>
          <h2 className="text-forest text-lg font-bold mt-8 mb-3">General</h2>
          <p>
            All product descriptions, specifications, and trade information provided on this website are for general reference. Actual product specifications may vary depending on crop conditions and agreed buyer requirements. All commercial terms are subject to negotiation and confirmation between PT. Erka Agro Niaga and the buyer.
          </p>
          <h2 className="text-forest text-lg font-bold mt-8 mb-3">Products & Orders</h2>
          <p>
            Product availability, pricing, and shipment terms are subject to confirmation at the time of order. Minimum order quantities and supply capacity are indicative and may vary based on current stock and order requirements.
          </p>
          <h2 className="text-forest text-lg font-bold mt-8 mb-3">Limitation of Liability</h2>
          <p>
            PT. Erka Agro Niaga coordinates product sourcing, preparation, and export through selected supply partners. All transactions are subject to the agreed commercial terms between the parties.
          </p>
          <h2 className="text-forest text-lg font-bold mt-8 mb-3">Contact</h2>
          <p>
            For legal inquiries, please contact us at <a href="mailto:sales@erkaagro.com" className="text-forest hover:text-gold transition-colors">sales@erkaagro.com</a>.
          </p>
        </div>
      </div>
    </PlaceholderLayout>
  );
}
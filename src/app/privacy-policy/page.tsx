import type { Metadata } from 'next';
import { PlaceholderLayout } from '@/components/placeholder-page-layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Erka Agro',
  description: 'Privacy Policy of PT. Erka Agro Niaga.',
};

export default function PrivacyPolicyPage() {
  return (
    <PlaceholderLayout title="Privacy Policy">
      <div className="max-w-2xl">
        <h1 className="text-forest text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-sm text-text-muted space-y-4 text-[15px] leading-relaxed">
          <p>
            <strong className="text-text-main">Effective Date:</strong> January 1, 2026
          </p>
          <p>
            This Privacy Policy describes how PT. Erka Agro Niaga (&quot;Erka Agro&quot;, &quot;we&quot;, &quot;us&quot;) collects, uses, and protects personal information provided through our website (erkaagro.com) and related communication channels.
          </p>
          <h2 className="text-forest text-lg font-bold mt-8 mb-3">Information We Collect</h2>
          <p>We may collect the following types of information when you interact with our services:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Contact information (name, email, phone, company name)</li>
            <li>Business requirements (product, quantity, destination, packaging)</li>
            <li>Website usage data (pages visited, browser type, general location)</li>
          </ul>
          <h2 className="text-forest text-lg font-bold mt-8 mb-3">How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Respond to product inquiries and quotation requests</li>
            <li>Coordinate export orders and shipments</li>
            <li>Improve our website and communication</li>
          </ul>
          <h2 className="text-forest text-lg font-bold mt-8 mb-3">Data Protection</h2>
          <p>We take reasonable measures to protect your personal information. Your data is not sold to third parties. Information may be shared with logistics partners, testing laboratories, or government authorities as required for export compliance.</p>
          <h2 className="text-forest text-lg font-bold mt-8 mb-3">Contact</h2>
          <p>For privacy-related inquiries, please contact us at <a href="mailto:sales@erkaagro.com" className="text-forest hover:text-gold transition-colors">sales@erkaagro.com</a>.</p>
        </div>
      </div>
    </PlaceholderLayout>
  );
}

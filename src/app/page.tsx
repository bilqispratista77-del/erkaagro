import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { TrustStrip } from '@/components/trust-strip';
import { ProductsSection } from '@/components/products-section';
import { ValuePropositionSection } from '@/components/value-proposition-section';
import { WhyChooseUsSection } from '@/components/why-choose-us-section';
import { OriginToShipmentSection } from '@/components/origin-to-shipment-section';
import { QualityCommitmentSection } from '@/components/quality-commitment-section';
import { RequestQuoteSection } from '@/components/request-quote-section';
import { FAQSection } from '@/components/faq-section';
import { FinalCtaSection } from '@/components/final-cta-section';
import { Footer } from '@/components/footer';
import { FloatingActions } from '@/components/floating-actions';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <ProductsSection />
        <ValuePropositionSection />
        <WhyChooseUsSection />
        <OriginToShipmentSection />
        <QualityCommitmentSection />
        <RequestQuoteSection />
        <FAQSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

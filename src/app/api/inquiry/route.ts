import { NextRequest, NextResponse } from 'next/server';
import { sendInquiryEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName, companyName, email, phone, country, website,
      product, productForm, quantity, quantityUnit, packaging,
      destinationPort, shippingTerms, timeline, sample,
      documents, additionalNotes,
    } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    // Save to database (non-blocking, don't fail if DB unavailable)
    import('@/lib/db').then(({ db }) => {
      return db.productInquiry.create({
        data: {
          fullName, companyName, email, phone, country, website,
          product, productForm, quantity, quantityUnit, packaging,
          destinationPort, shippingTerms, timeline, sample,
          documents, additionalNotes,
        },
      });
    }).catch((err) => {
      console.error('[Inquiry DB Error]', err?.message || err);
    });

    // Send email notification
    await sendInquiryEmail(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Inquiry API Error]', err);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Save to database (non-blocking, don't fail if DB unavailable)
    import('@/lib/db').then(({ db }) => {
      return db.contactMessage.create({ data: { name, email, phone, message } });
    }).catch((err) => {
      console.error('[Contact DB Error]', err?.message || err);
    });

    // Send email notification
    await sendContactEmail({ name, email, phone, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

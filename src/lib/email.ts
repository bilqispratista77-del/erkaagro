import { Resend } from 'resend';

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getToEmail(): string {
  return process.env.CONTACT_EMAIL || 'sales@erkaagro.com';
}

function getFromEmail(): string {
  return process.env.FROM_EMAIL || 'onboarding@resend.dev';
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[Contact Email] Skipped: RESEND_API_KEY not set');
    return;
  }

  const to = getToEmail();
  const from = getFromEmail();
  const subject = `[Erka Agro] New Contact Message from ${data.name}`;

  await resend.emails.send({
    from: `Erka Agro Website <${from}>`,
    to: [to],
    replyTo: data.email,
    subject,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #123F2D; margin-bottom: 20px;">New Contact Message</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">Name</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;"><a href="mailto:${data.email}" style="color: #123F2D;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Phone</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;"><a href="tel:${data.phone}" style="color: #123F2D;">${data.phone}</a></td>
          </tr>
        </table>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 16px;">
          <p style="color: #666; font-size: 13px; margin-bottom: 8px; font-weight: 600;">Message</p>
          <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">This message was sent from the Erka Agro contact form.</p>
      </div>
    `,
  });
}

export async function sendInquiryEmail(data: Record<string, string>) {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[Inquiry Email] Skipped: RESEND_API_KEY not set');
    return;
  }

  const to = getToEmail();
  const from = getFromEmail();
  const subject = `[Erka Agro] Product Inquiry from ${data.fullName}`;

  const fieldLabel: Record<string, string> = {
    fullName: 'Full Name',
    companyName: 'Company Name',
    email: 'Email',
    phone: 'WhatsApp / Phone',
    country: 'Country',
    website: 'Website',
    product: 'Product',
    productForm: 'Product Form',
    quantity: 'Quantity',
    quantityUnit: 'Unit',
    packaging: 'Packaging',
    destinationPort: 'Destination Port',
    shippingTerms: 'Shipping Terms',
    timeline: 'Timeline',
    sample: 'Sample Required',
    documents: 'Required Documents',
    additionalNotes: 'Additional Notes',
  };

  const rows = Object.entries(data)
    .filter(([key]) => fieldLabel[key] && key !== 'additionalNotes')
    .map(([key, val]) => {
      const label = fieldLabel[key];
      if (!label || !val) return '';
      const displayVal = key === 'quantity' && data.quantityUnit
        ? `${val} ${data.quantityUnit}`
        : val;
      return `<tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; width: 180px; vertical-align: top;">${label}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${displayVal}</td>
      </tr>`;
    })
    .join('');

  await resend.emails.send({
    from: `Erka Agro Website <${from}>`,
    to: [to],
    replyTo: data.email,
    subject,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #123F2D; margin-bottom: 20px;">New Product Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          ${rows}
        </table>
        ${data.additionalNotes ? `
        <div style="background: #f9f9f9; border-radius: 8px; padding: 16px;">
          <p style="color: #666; font-size: 13px; margin-bottom: 8px; font-weight: 600;">Additional Notes</p>
          <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${data.additionalNotes}</p>
        </div>` : ''}
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">This inquiry was submitted from the Erka Agro website.</p>
      </div>
    `,
  });
}
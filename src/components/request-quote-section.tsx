'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, Check, MessageCircle, Mail, Phone, Globe, User, Loader2 } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

const COUNTRIES = [
  'United Arab Emirates', 'Saudi Arabia', 'India', 'Pakistan', 'Bangladesh',
  'China', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Thailand', 'Vietnam',
  'Indonesia', 'Philippines', 'Australia', 'United States', 'Canada',
  'Germany', 'Netherlands', 'United Kingdom', 'France', 'Italy', 'Spain',
  'Poland', 'Turkey', 'Brazil', 'South Africa', 'Nigeria', 'Egypt',
  'Jordan', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Sri Lanka', 'Nepal',
  'Myanmar', 'Cambodia', 'Taiwan', 'New Zealand', 'Other',
];

const DOCUMENTS = [
  'Commercial Invoice', 'Packing List', 'Certificate of Origin',
  'Phytosanitary Certificate', 'Certificate of Analysis', 'Other',
];

const LONG_PEPPER_FORMS = ['Whole Dried'];
const TURMERIC_FORMS = ['Dried Sliced', 'Powder'];

const TIMELINE_OPTIONS = [
  'As Soon as Possible', 'Within 1 Month', '1–3 Months', '3–6 Months', 'Planning / Research Stage',
];

const SAMPLE_OPTIONS = ['Yes', 'No', 'Need to Discuss'];

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  product: string;
  productForm: string;
  quantity: string;
  quantityUnit: string;
  packaging: string;
  packagingDetail: string;
  destCountry: string;
  destPort: string;
  shippingTerm: string;
  documents: string[];
  otherDocument: string;
  specification: string;
  timeline: string;
  sample: string;
  _hp: string;
}

interface FormErrors {
  fullName?: string;
  companyName?: string;
  email?: string;
  country?: string;
  phone?: string;
  product?: string;
  productForm?: string;
  quantity?: string;
  destCountry?: string;
}

const initialForm: FormData = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  country: '',
  website: '',
  product: '',
  productForm: '',
  quantity: '',
  quantityUnit: 'Metric Ton',
  packaging: '',
  packagingDetail: '',
  destCountry: '',
  destPort: '',
  shippingTerm: '',
  documents: [],
  otherDocument: '',
  specification: '',
  timeline: '',
  sample: '',
  _hp: '',
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!data.companyName.trim()) errors.companyName = 'Please enter your company name.';
  if (!data.email.trim()) {
    errors.email = 'Please enter your business email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid business email.';
  }
  if (!data.country.trim()) errors.country = 'Please enter your country.';
  if (!data.phone.trim()) errors.phone = 'Please enter your WhatsApp / Phone number.';
  if (!data.product) errors.product = 'Please select a product.';
  if (!data.productForm) errors.productForm = 'Please select a product form.';
  if (!data.quantity.trim()) errors.quantity = 'Please enter the required quantity.';
  if (!data.destCountry) errors.destCountry = 'Please select a destination country.';
  return errors;
}

function inputCls(error?: string) {
  return `
    w-full h-12 sm:h-[52px] px-4 rounded-xl text-sm font-medium text-text-main
    bg-white border ${error ? 'border-red-400/70' : 'border-border-warm'} 
    placeholder:text-text-muted/50
    focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20
    transition-all duration-200
  `;
}

function selectTriggerCls(error?: string) {
  return `
    w-full h-12 sm:h-[52px] px-4 rounded-xl text-sm font-medium text-text-main
    bg-white border ${error ? 'border-red-400/70' : 'border-border-warm'}
    focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20
    transition-all duration-200 data-[placeholder]:text-text-muted/50
  `;
}

function labelCls() {
  return 'block text-[11px] sm:text-xs font-semibold tracking-[0.04em] uppercase text-text-muted mb-1.5';
}

function errorCls() {
  return 'text-[11px] sm:text-xs text-red-500/80 mt-1 font-medium';
}

export function RequestQuoteSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const productForms = form.product === 'Indonesian Turmeric' ? TURMERIC_FORMS : LONG_PEPPER_FORMS;

  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'product') {
        const forms = value === 'Indonesian Turmeric' ? TURMERIC_FORMS : LONG_PEPPER_FORMS;
        next.productForm = forms.includes(prev.productForm) ? prev.productForm : '';
      }
      return next;
    });
    if (touched.has(key)) {
      const updated = { ...form, [key]: value };
      if (key === 'product') {
        const forms = value === 'Indonesian Turmeric' ? TURMERIC_FORMS : LONG_PEPPER_FORMS;
        updated.productForm = forms.includes(updated.productForm) ? updated.productForm : '';
      }
      const errs = validate(updated);
      setErrors(errs);
    }
  }, [form, touched]);

  const handleBlur = useCallback((key: string) => {
    setTouched(prev => new Set(prev).add(key));
    const errs = validate(form);
    setErrors(errs);
  }, [form]);

  const toggleDocument = useCallback((doc: string) => {
    setForm(prev => ({
      ...prev,
      documents: prev.documents.includes(doc)
        ? prev.documents.filter(d => d !== doc)
        : [...prev.documents, doc],
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (form._hp) return;
    const errs = validate(form);
    setErrors(errs);
    setTouched(new Set(Object.keys(initialForm).filter(k => k !== '_hp')));
    if (Object.keys(errs).length === 0) {
      setSending(true);
      setSubmitError(false);
      try {
        // Build documents string from array
        let docsStr = form.documents.filter(d => d !== 'Other').join(', ');
        if (form.documents.includes('Other') && form.otherDocument.trim()) {
          docsStr += (docsStr ? ', ' : '') + form.otherDocument.trim();
        } else if (form.documents.includes('Other')) {
          docsStr += (docsStr ? ', ' : '') + 'Other';
        }

        // Build packaging string with detail
        let packagingStr = form.packaging;
        if (form.packaging === 'Buyer-Specific Packaging' && form.packagingDetail.trim()) {
          packagingStr += ': ' + form.packagingDetail.trim();
        }

        const payload = {
          fullName: form.fullName,
          companyName: form.companyName,
          email: form.email,
          phone: form.phone,
          country: form.country,
          website: form.website || undefined,
          product: form.product,
          productForm: form.productForm,
          quantity: form.quantity,
          quantityUnit: form.quantityUnit,
          packaging: packagingStr || undefined,
          destinationPort: form.destPort || undefined,
          shippingTerms: form.shippingTerm || undefined,
          documents: docsStr || undefined,
          additionalNotes: form.specification || undefined,
          timeline: form.timeline || undefined,
          sample: form.sample || undefined,
        };

        const res = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setSubmitted(true);
        } else {
          setSubmitError(true);
        }
      } catch {
        setSubmitError(true);
      } finally {
        setSending(false);
      }
    }
  }, [form]);

  return (
    <section id="request-quote" className="bg-forest py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-16">
        <div className="lg:grid lg:grid-cols-[7fr_13fr] lg:gap-10 xl:gap-14 items-start">

          {/* LEFT SIDE */}
          <FadeIn className="mb-10 lg:mb-0">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-gold font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">
                  Request a Quote
                </p>
                <span className="w-8 h-px bg-gold/40" aria-hidden="true" />
              </div>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight mb-4">
                Tell Us What
                <br />
                You're Looking For
              </h2>
              <p className="text-white/70 text-sm sm:text-[15px] leading-relaxed mb-3">
                Share your product requirements, quantity, packaging, and destination.
                Our team will review your inquiry and coordinate a suitable supply option.
              </p>
              <p className="text-white/50 text-xs sm:text-[13px] leading-relaxed mb-8">
                Product specifications and commercial terms can be discussed according to
                your market requirements.
              </p>

              <div className="mb-8">
                <h3 className="text-white font-bold text-sm sm:text-[15px] leading-snug mb-1.5">
                  Start a Product Inquiry
                </h3>
                <p className="text-white/60 text-xs sm:text-[13px] leading-relaxed mb-4">
                  Whether you are sourcing Long Pepper or Turmeric, provide the key details
                  below so we can understand your requirements before discussing quotation
                  and shipment options.
                </p>
                <ul className="space-y-2" aria-label="Inquiry benefits">
                  {['Direct B2B inquiry', 'Buyer-specific requirements', 'Export-oriented coordination', 'Sample discussion available'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="size-3.5 text-gold shrink-0" />
                      <span className="text-white/70 text-xs sm:text-[13px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] mb-4">
                  Prefer Direct Communication?
                </p>
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="size-3.5 text-gold/70 shrink-0" />
                    <span className="text-white/80 text-xs sm:text-[13px]">
                      <span className="font-semibold text-white/90">WhatsApp:</span> +62 851-9624-5196
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="size-3.5 text-gold/70 shrink-0" />
                    <span className="text-white/80 text-xs sm:text-[13px]">
                      <span className="font-semibold text-white/90">Email:</span> sales@erkaagro.com
                    </span>
                  </div>

                </div>
                <Button
                  asChild
                  className="bg-white/10 hover:bg-white/15 text-white font-bold text-sm px-5 h-11 rounded-xl border border-white/15 transition-all duration-200 group/wa w-full sm:w-auto"
                >
                  <a
                    href="https://wa.me/6285196245196?text=Hello%20Mr.%20Riswan%2C%20I%20am%20interested%20in%20Erka%20Agro%20products%20and%20would%20like%20to%20discuss%20a%20product%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4 mr-2" />
                    Contact via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT SIDE - FORM */}
          <FadeIn delay={100}>
            <div className="bg-white rounded-2xl p-5 sm:p-7 lg:p-8 shadow-sm">
              {submitted ? (
                <div className="py-8 sm:py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-5">
                    <Check className="size-7 text-forest" />
                  </div>
                  <h3 className="text-forest text-xl sm:text-2xl font-bold leading-tight mb-3">
                    Thank You for Your Inquiry
                  </h3>
                  <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed max-w-md mx-auto mb-8">
                    We have received your product requirements. Our team will review
                    the information and contact you using the details provided.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
                    <Button
                      asChild
                      className="bg-white/10 hover:bg-white/15 text-white font-bold text-sm px-5 h-11 rounded-xl border border-white/15 transition-all duration-200 w-full sm:w-auto"
                    >
                      <a
                        href="https://wa.me/6285196245196?text=Hello%20Mr.%20Riswan%2C%20I%20am%20interested%20in%20Erka%20Agro%20products%20and%20would%20like%20to%20discuss%20a%20product%20inquiry."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4 mr-2" />
                        Contact via WhatsApp
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-border-warm text-forest font-bold text-sm px-5 h-11 rounded-xl hover:bg-cream transition-all duration-200 w-full sm:w-auto"
                    >
                      <a href="#products">
                        Back to Products
                        <ArrowRight className="size-3.5 ml-1.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <div className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <input
                      type="text"
                      name="_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form._hp}
                      onChange={e => updateField('_hp', e.target.value)}
                    />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-forest text-base sm:text-lg font-bold leading-snug">
                      Product Inquiry
                    </h3>
                    <p className="text-text-muted text-xs mt-1">
                      Fields marked with <span className="text-gold">*</span> are required.
                    </p>
                  </div>

                  {/* 01 BUYER INFORMATION */}
                  <div className="mb-7">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/50 mb-4">
                      01 Buyer Information
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls()}>Full Name <span className="text-gold">*</span></label>
                        <input
                          type="text"
                          className={inputCls(touched.has('fullName') ? errors.fullName : undefined)}
                          placeholder="Your full name"
                          value={form.fullName}
                          onChange={e => updateField('fullName', e.target.value)}
                          onBlur={() => handleBlur('fullName')}
                        />
                        {touched.has('fullName') && errors.fullName && <p className={errorCls()}>{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className={labelCls()}>Company Name <span className="text-gold">*</span></label>
                        <input
                          type="text"
                          className={inputCls(touched.has('companyName') ? errors.companyName : undefined)}
                          placeholder="Your company name"
                          value={form.companyName}
                          onChange={e => updateField('companyName', e.target.value)}
                          onBlur={() => handleBlur('companyName')}
                        />
                        {touched.has('companyName') && errors.companyName && <p className={errorCls()}>{errors.companyName}</p>}
                      </div>
                      <div>
                        <label className={labelCls()}>Business Email <span className="text-gold">*</span></label>
                        <input
                          type="email"
                          className={inputCls(touched.has('email') ? errors.email : undefined)}
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={e => updateField('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                        />
                        {touched.has('email') && errors.email && <p className={errorCls()}>{errors.email}</p>}
                      </div>
                      <div>
                        <label className={labelCls()}>WhatsApp / Phone <span className="text-gold">*</span></label>
                        <input
                          type="tel"
                          className={inputCls(touched.has('phone') ? errors.phone : undefined)}
                          placeholder="+1 234 567 890"
                          value={form.phone}
                          onChange={e => updateField('phone', e.target.value)}
                        />
                        {touched.has('phone') && errors.phone && <p className={errorCls()}>{errors.phone}</p>}
                      </div>
                      <div>
                        <label className={labelCls()}>Country <span className="text-gold">*</span></label>
                        <input
                          type="text"
                          className={inputCls(touched.has('country') ? errors.country : undefined)}
                          placeholder="e.g. United Arab Emirates"
                          value={form.country}
                          onChange={e => updateField('country', e.target.value)}
                        />
                        {touched.has('country') && errors.country && <p className={errorCls()}>{errors.country}</p>}
                      </div>
                      <div>
                        <label className={labelCls()}>Company Website</label>
                        <input
                          type="url"
                          className={inputCls()}
                          placeholder="https://yourcompany.com"
                          value={form.website}
                          onChange={e => updateField('website', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 02 PRODUCT REQUIREMENT */}
                  <div className="mb-7 pt-7 border-t border-border-warm/50">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/50 mb-4">
                      02 Product Requirement
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={labelCls()}>Product <span className="text-gold">*</span></label>
                        <Select value={form.product} onValueChange={v => updateField('product', v)}>
                          <SelectTrigger className={selectTriggerCls(touched.has('product') ? errors.product : undefined)}>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Indonesian Long Pepper">Indonesian Long Pepper</SelectItem>
                            <SelectItem value="Indonesian Turmeric">Indonesian Turmeric</SelectItem>
                          </SelectContent>
                        </Select>
                        {touched.has('product') && errors.product && <p className={errorCls()}>{errors.product}</p>}
                      </div>
                      <div>
                        <label className={labelCls()}>Product Form <span className="text-gold">*</span></label>
                        <Select value={form.productForm} onValueChange={v => updateField('productForm', v)} disabled={!form.product}>
                          <SelectTrigger className={selectTriggerCls(touched.has('productForm') ? errors.productForm : undefined)}>
                            <SelectValue placeholder={form.product ? 'Select form' : 'Select product first'} />
                          </SelectTrigger>
                          <SelectContent>
                            {productForms.map(f => (
                              <SelectItem key={f} value={f}>{f}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {touched.has('productForm') && errors.productForm && <p className={errorCls()}>{errors.productForm}</p>}
                      </div>
                    </div>

                    {/* Quantity + Unit */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className={labelCls()}>Required Quantity <span className="text-gold">*</span></label>
                        <input
                          type="number"
                          min="0"
                          className={inputCls(touched.has('quantity') ? errors.quantity : undefined)}
                          placeholder="e.g. 5"
                          value={form.quantity}
                          onChange={e => updateField('quantity', e.target.value)}
                          onBlur={() => handleBlur('quantity')}
                        />
                        {touched.has('quantity') && errors.quantity && <p className={errorCls()}>{errors.quantity}</p>}
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className={labelCls()}>Unit</label>
                        <Select value={form.quantityUnit} onValueChange={v => updateField('quantityUnit', v)}>
                          <SelectTrigger className={selectTriggerCls()}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="Metric Ton">Metric Ton</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-[11px] text-text-muted/50 mt-1">Standard MOQ: 1 Metric Ton</p>
                      </div>
                    </div>

                    {/* Packaging */}
                    <div className="mb-4">
                      <label className={labelCls()}>Packaging Requirement</label>
                      <Select value={form.packaging} onValueChange={v => updateField('packaging', v)}>
                        <SelectTrigger className={selectTriggerCls()}>
                          <SelectValue placeholder="Select packaging" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Standard Export Packaging">Standard Export Packaging</SelectItem>
                          <SelectItem value="Buyer-Specific Packaging">Buyer-Specific Packaging</SelectItem>
                          <SelectItem value="Not Sure Yet">Not Sure Yet</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.packaging === 'Buyer-Specific Packaging' && (
                        <div className="mt-3">
                          <input
                            type="text"
                            className={inputCls()}
                            placeholder="Describe packaging requirement"
                            value={form.packagingDetail}
                            onChange={e => updateField('packagingDetail', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 03 SHIPPING & DESTINATION */}
                  <div className="mb-7 pt-7 border-t border-border-warm/50">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/50 mb-4">
                      03 Shipping & Destination
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={labelCls()}>Destination Country <span className="text-gold">*</span></label>
                        <Select value={form.destCountry} onValueChange={v => updateField('destCountry', v)}>
                          <SelectTrigger className={selectTriggerCls(touched.has('destCountry') ? errors.destCountry : undefined)}>
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRIES.map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {touched.has('destCountry') && errors.destCountry && <p className={errorCls()}>{errors.destCountry}</p>}
                      </div>
                      <div>
                        <label className={labelCls()}>Destination Port</label>
                        <input
                          type="text"
                          className={inputCls()}
                          placeholder="e.g. Jebel Ali Port, Dubai"
                          value={form.destPort}
                          onChange={e => updateField('destPort', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls()}>Preferred Shipping Term</label>
                      <Select value={form.shippingTerm} onValueChange={v => updateField('shippingTerm', v)}>
                        <SelectTrigger className={selectTriggerCls()}>
                          <SelectValue placeholder="Select shipping term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FOB">FOB</SelectItem>
                          <SelectItem value="CIF">CIF</SelectItem>
                          <SelectItem value="Not Sure Yet">Not Sure Yet</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.product === 'Indonesian Long Pepper' && form.shippingTerm === 'CIF' && (
                        <p className="text-[11px] text-text-muted/60 mt-1.5 italic">
                          Shipping terms are subject to product and transaction confirmation.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 04 ADDITIONAL REQUIREMENTS */}
                  <div className="mb-7 pt-7 border-t border-border-warm/50">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted/50 mb-4">
                      04 Additional Requirements
                    </p>

                    {/* Documents */}
                    <div className="mb-5">
                      <label className={labelCls()}>Required Documents</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2.5 mt-1">
                        {DOCUMENTS.map(doc => (
                          <label key={doc} className="flex items-center gap-2.5 cursor-pointer group">
                            <Checkbox
                              checked={form.documents.includes(doc)}
                              onCheckedChange={() => toggleDocument(doc)}
                              className="data-[state=checked]:bg-forest data-[state=checked]:border-forest size-4 rounded-[4px]"
                            />
                            <span className="text-text-main text-xs sm:text-[13px] group-hover:text-forest transition-colors">{doc}</span>
                          </label>
                        ))}
                      </div>
                      {form.documents.includes('Other') && (
                        <div className="mt-3">
                          <input
                            type="text"
                            className={inputCls()}
                            placeholder="Additional document requirement"
                            value={form.otherDocument}
                            onChange={e => updateField('otherDocument', e.target.value)}
                          />
                        </div>
                      )}
                    </div>

                    {/* Specification */}
                    <div className="mb-5">
                      <label className={labelCls()}>Product Specification / Additional Requirements</label>
                      <textarea
                        className="w-full min-h-[100px] px-4 py-3 rounded-xl text-sm font-medium text-text-main bg-white border border-border-warm placeholder:text-text-muted/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 resize-y"
                        placeholder="Tell us your required quality parameters, packaging, size, mesh, testing, or other product requirements."
                        value={form.specification}
                        onChange={e => updateField('specification', e.target.value)}
                      />
                    </div>

                    {/* Timeline + Sample */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls()}>Expected Purchase Timeline</label>
                        <Select value={form.timeline} onValueChange={v => updateField('timeline', v)}>
                          <SelectTrigger className={selectTriggerCls()}>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIMELINE_OPTIONS.map(t => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className={labelCls()}>Do You Require a Sample?</label>
                        <Select value={form.sample} onValueChange={v => updateField('sample', v)}>
                          <SelectTrigger className={selectTriggerCls()}>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {SAMPLE_OPTIONS.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.sample === 'Yes' && (
                          <p className="text-[11px] text-text-muted/60 mt-1.5 italic">
                            Sample availability, courier cost, and sample terms will be discussed after inquiry review.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-6 border-t border-border-warm/50">
                    {submitError && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                        Something went wrong. Please try again or contact us via WhatsApp.
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={sending}
                      className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-7 h-12 rounded-xl transition-all duration-200 group/sub w-full sm:w-auto disabled:opacity-70"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                          <>
                          Send Product Inquiry
                          <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover/sub:translate-x-0.5" />
                        </>
                      )}
                    </Button>
                    <p className="text-text-muted/50 text-[11px] sm:text-xs mt-3 leading-relaxed">
                      Your inquiry will be reviewed by our team before quotation and commercial terms are confirmed.
                    </p>
                  </div>

                  {/* Privacy */}
                  <p className="text-text-muted/40 text-[10px] sm:text-[11px] mt-5 leading-relaxed">
                    By submitting this form, you agree that Erka Agro may contact you regarding your product inquiry.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

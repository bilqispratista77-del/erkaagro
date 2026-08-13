# Erka Agro Website - Panduan Deploy

## Persiapan Sebelum Deploy

### 1. Setup Resend (Email Service)

1. Buka [resend.com](https://resend.com) dan login
2. **Verifikasi Domain** `erkaagro.com` di menu **Domains** → Add Domain
3. Tambahkan DNS record yang diminta Resend ke domain Anda (di Cloudflare/Namecheap/dll)
4. Setelah domain terverifikasi, buat **API Key** baru di menu **API Keys** → Create API Key
5. Buka menu **Emails** → **Verified** → pastikan email penerima sudah terverifikasi

### 2. Siapkan Foto-Foto

Ganti semua foto placeholder di folder `public/` dengan foto asli:

```
public/
  logo.png                          ← Logo Erka Agro
  hero-main.png                     ← Hero homepage
  hero-long-pepper.png              ← Hero Long Pepper
  hero-turmeric.png                  ← Hero Turmeric
  about/
    why-erka-agro.jpg                ← About hero
    quality-commitment.jpg           ← About quality
    accent.jpg                       ← About accent
  products/
    long-pepper-featured.jpg         ← Long Pepper featured
    long-pepper-closeup.jpg          ← Long Pepper closeup
    long-pepper-bulk.jpg             ← Long Pepper bulk
    long-pepper-gal-1.jpg            ← Gallery 1
    long-pepper-gal-2.jpg            ← Gallery 2
    long-pepper-gal-3.jpg            ← Gallery 3
    long-pepper-gal-4.jpg            ← Gallery 4
    long-pepper-gal-5.jpg            ← Gallery 5
    long-pepper-gal-6.jpg            ← Gallery 6
    turmeric-featured.jpg            ← Turmeric featured
    turmeric-powder.jpg               ← Turmeric powder
    turmeric-gal-1.jpg                ← Turmeric gallery 1
    turmeric-gal-2.jpg                ← Turmeric gallery 2
    turmeric-gal-3.jpg                ← Turmeric gallery 3
    sourcing.jpg                      ← Sourcing
    quality-inspection.jpg            ← Quality inspection
    supply-chain.jpg                  ← Supply chain
    cta-partnership.jpg               ← CTA section
    export-documentation.jpg          ← Export doc
  contact/
    hero-contact.jpg                  ← Contact hero
    inquiry-desk.jpg                  ← Contact inquiry
  quality/
    hero-inspection.jpg               ← Quality hero
```

---

## Opsi A: Deploy ke Vercel (Direkomendasikan)

### Langkah 1: Upload ke GitHub

1. Buat repository baru di GitHub (misal: `erka-agro-website`)
2. Di terminal komputer Anda:

```bash
cd erka-agro-website
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/erka-agro-website.git
git branch -M main
git push -u origin main
```

### Langkah 2: Import di Vercel

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik **Add New Project**
3. Import repository `erka-agro-website`
4. Konfigurasi:
   - **Framework Preset**: Next.js (otomatis terdeteksi)
   - **Build Command**: `prisma generate && next build`
   - **Output Directory**: (kosongkan, biarkan default)
   - **Install Command**: `npm install` atau `bun install`

### Langkah 3: Set Environment Variables

Di Vercel dashboard → Settings → Environment Variables, tambahkan:

| Variable | Value | Contoh |
|----------|-------|-------|
| `RESEND_API_KEY` | API key dari Resend | `re_xxxxxxxxxxxx` |
| `CONTACT_EMAIL` | Email penerima | `abdullahaniq61@gmail.com` |
| `FROM_EMAIL` | Pengirim (setelah domain terverifikasi) | `noreply@erkaagro.com` |

### Langkah 4: Deploy

Klik **Deploy** dan tunggu. Website akan live di `erka-agro-website.vercel.app`.

### Custom Domain (Opsional)

1. Di Vercel → Settings → Domains → Add domain `erkaagro.com`
2. Tambahkan DNS record di Cloudflare:
   - **CNAME**: `www` → `cname.vercel-dns.com`
   - **A**: `@` → `76.76.21.21`

---

## Opsi B: Deploy ke Cloudflare Pages

### Langkah 1: Setup

```bash
cd erka-agro-website
npm install @opennextjs/cloudflare wrangler -D
```

### Langkah 2: Tambahkan konfigurasi

Buat file `wrangler.toml`:

```toml
name = "erka-agro"
compatibility_date = "2025-01-01"

[vars]
CONTACT_EMAIL = "abdullahaniq61@gmail.com"
FROM_EMAIL = "noreply@erkaagro.com"
```

### Langkah 3: Deploy

```bash
npx opennextjs-cloudflare build
npx wrangler pages deploy .open-next/worker.js
```

### Langkah 4: Set Secrets

```bash
npx wrangler secret put RESEND_API_KEY
# Paste API key saat diminta
```

---

## Environment Variables Reference

Salin `.env.example` menjadi `.env.local` untuk development:

```bash
cp .env.example .env.local
```

| Variable | Wajib? | Keterangan |
|----------|--------|------------|
| `RESEND_API_KEY` | Ya | API key dari Resend |
| `CONTACT_EMAIL` | Ya | Email yang menerima notifikasi |
| `FROM_EMAIL` | Ya | Email pengirim (`noreply@erkaagro.com` setelah domain verifikasi) |

---

## Catatan Penting

### Database

Website ini tidak memerlukan database untuk fungsi utama (email notifikasi). Data form tetap disimpan jika database tersedia. Untuk Vercel/Cloudflare, fitur simpan data form bersifat opsional — **email notifikasi tetap dikirim**.

### FROM_EMAIL

- **Saat development**: Gunakan `onboarding@resend.dev` (test sender Resend)
- **Saat production**: WAJIB ganti ke `noreply@erkaagro.com` setelah domain terverifikasi di Resend

### Quota Email (Free Tier Resend)

- 100 email/hari, 3.000 email/bulan
- Cukup untuk website perusahaan
- Upgrade di Resend jika butuh lebih banyak

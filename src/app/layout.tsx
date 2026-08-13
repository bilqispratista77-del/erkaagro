import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Erka Agro — Indonesian Long Pepper & Turmeric Export",
  description:
    "PT. Erka Agro Niaga — Reliable Indonesian agricultural export of premium Long Pepper and Turmeric. Sourcing, quality control, and export support for international markets.",
  keywords: [
    "Indonesian Long Pepper",
    "Indonesian Turmeric",
    "agricultural export",
    "spice exporter",
    "Indonesia spices",
    "B2B spice trading",
    "PT Erka Agro Niaga",
    "Erka Agro",
  ],
  authors: [{ name: "PT. Erka Agro Niaga" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Erka Agro — Indonesian Long Pepper & Turmeric Export",
    description:
      "Sourcing and exporting selected Indonesian Long Pepper and Turmeric with reliable supply coordination, buyer-specific requirements, and export support.",
    url: "https://erkaagro.com",
    siteName: "Erka Agro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} font-sans antialiased bg-ivory text-text-main`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

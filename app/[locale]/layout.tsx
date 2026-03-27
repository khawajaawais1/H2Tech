import type { Metadata } from "next";
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/src/i18n/routing';
import { Inter } from "next/font/google";
import path from 'path';
import fs from 'fs';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://happy2tech.fi"),

  title: {
    default: "Happy2Tech (H2Tech) — Smart Scalable Technology Solutions",
    template: "%s | Happy2Tech",
  },

  description:
    "Happy2Tech (H2Tech) builds scalable software, cloud infrastructure, mobile apps, web platforms, hosting, SEO, design, and digital solutions for modern businesses worldwide.",

  keywords: [
    "Happy2Tech",
    "happy2tech",
    "H2Tech",
    "h2tech",
    "software development",
    "custom software",
    "custom apps",
    "web applications",
    "web development",
    "mobile app",
    "mobile development",
    "mobile apps",
    "app design",
    "iOS",
    "Android",
    "cloud",
    "cloud services",
    "DevOps",
    "hosting",
    "web hosting",
    "infrastructure",
    "SEO",
    "graphic design",
    "content writing",
    "digital solutions",
    "smart scalable technology",
  ],

  applicationName: "Happy2Tech",
  creator: "Happy2Tech",
  publisher: "Happy2Tech",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Happy2Tech (H2Tech) — Smart Scalable Technology Solutions",
    description:
      "Technology solutions that help businesses grow globally through software, cloud, hosting, design, and digital services.",
    url: "https://happy2tech.fi",
    siteName: "Happy2Tech",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Happy2Tech",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Happy2Tech (H2Tech) — Smart Scalable Technology Solutions",
    description:
      "Technology solutions that help businesses grow globally.",
    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as 'en' | 'fi')) {
    notFound();
  }

  const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));

  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
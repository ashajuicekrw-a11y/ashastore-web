import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';

const font = Instrument_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PremiaAccounts - Premium Account Sharing Terpercaya',
  description: 'Dapatkan akses premium Netflix, Spotify, Canva, dan layanan premium lainnya dengan harga terjangkau. Garansi 100%, Proses Cepat, Support 24/7.',
  keywords: [
    'Netflix Premium',
    'Spotify Premium',
    'Canva Pro',
    'VPN',
    'Account Sharing',
    'Premium Murah',
    'Indonesia',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://premiaaccounts.id',
    siteName: 'PremiaAccounts',
    title: 'PremiaAccounts - Premium Account Sharing Terpercaya',
    description:
      'Dapatkan akses premium Netflix, Spotify, Canva, dan layanan premium lainnya dengan harga terjangkau.',
    images: [
      {
        url: 'https://premiaaccounts.id/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PremiaAccounts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PremiaAccounts - Premium Account Sharing Terpercaya',
    description:
      'Dapatkan akses premium Netflix, Spotify, Canva, dan layanan premium lainnya dengan harga terjangkau.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${font.className} bg-slate-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
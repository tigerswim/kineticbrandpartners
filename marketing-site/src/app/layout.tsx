// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import '../styles/globals.css';

// Configure fonts properly using Next.js font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Kinetic Brand Partners - Strategic Marketing Consulting',
  description: 'Strategic marketing consulting that drives measurable growth. We help B2B companies accelerate revenue through data-driven marketing strategies and proven methodologies.',
  keywords: 'marketing consulting, B2B marketing, growth strategy, lead generation, brand positioning',
  authors: [{ name: 'Kinetic Brand Partners' }],
  creator: 'Kinetic Brand Partners',
  publisher: 'Kinetic Brand Partners',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kineticbrandpartners.com',
    title: 'Kinetic Brand Partners - Strategic Marketing Consulting',
    description: 'Strategic marketing consulting that drives measurable growth for B2B companies.',
    siteName: 'Kinetic Brand Partners',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetic Brand Partners - Strategic Marketing Consulting',
    description: 'Strategic marketing consulting that drives measurable growth for B2B companies.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
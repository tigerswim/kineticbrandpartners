import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kinetic Brand Partners - Professional Marketing Consultant",
  description: "Expert marketing consulting services to help your business grow. Strategic branding, digital marketing, and business development solutions.",
  icons: {
    icon: [
      {
        url: '/Kinetic Brand Partners logo Favicon clear.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/Kinetic Brand Partners logo.png',
        sizes: 'any',
        type: 'image/png',
      }
    ],
    apple: '/Kinetic Brand Partners logo Favicon clear.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/Kinetic Brand Partners logo Favicon clear.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Kinetic Brand Partners logo Favicon clear.png" />
        <link rel="apple-touch-icon" href="/Kinetic Brand Partners logo Favicon clear.png" />
        <link rel="shortcut icon" href="/Kinetic Brand Partners logo Favicon clear.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

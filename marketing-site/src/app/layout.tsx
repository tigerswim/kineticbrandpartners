// app/layout.tsx
import '@/app/globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'

const siteUrl = 'https://kineticbrandpartners.com'

export const metadata: Metadata = {
  title: 'Dan Hoeller | Fractional CMO & Marketing Leader | Atlanta, GA',
  description: 'Fractional CMO and marketing leader with 15+ years building brands at Johnson & Johnson, Central Garden & Pet. Strategic marketing leadership for growth-stage companies. Atlanta-based.',
  keywords: ['fractional CMO', 'fractional CMO Atlanta', 'marketing consultant', 'part-time CMO', 'outsourced CMO', 'marketing leadership', 'brand strategy', 'growth marketing'],
  authors: [{ name: 'Dan Hoeller' }],
  creator: 'Dan Hoeller',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Kinetic Brand Partners',
    title: 'Dan Hoeller | Fractional CMO & Marketing Leader',
    description: 'Fractional CMO with 15+ years at J&J and Central Garden & Pet. Strategic marketing leadership for growth-stage companies without full-time overhead.',
    images: [
      {
        url: '/images/DJH-CGPT-Sketch.png',
        width: 300,
        height: 400,
        alt: 'Dan Hoeller - Fractional CMO and Marketing Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dan Hoeller | Fractional CMO & Marketing Leader',
    description: 'Fractional CMO with 15+ years at J&J and Central Garden & Pet. Strategic marketing leadership for growth-stage companies.',
    images: ['/images/DJH-CGPT-Sketch.png'],
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
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Dan Hoeller',
      jobTitle: 'Fractional CMO',
      description: 'Marketing leader with 15+ years building brands and driving growth at Fortune 500 companies.',
      url: siteUrl,
      image: `${siteUrl}/images/DJH-CGPT-Sketch.png`,
      sameAs: [
        'https://linkedin.com/in/danhoeller',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Kinetic Brand Partners',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'University of Virginia Darden School of Business',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Clemson University',
        },
      ],
      knowsAbout: [
        'Brand Strategy',
        'Marketing Leadership',
        'P&L Management',
        'Digital Marketing',
        'Team Building',
        'Growth Marketing',
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Kinetic Brand Partners',
      url: siteUrl,
      logo: `${siteUrl}/logos/kinetic-brand-partners.png`,
      founder: {
        '@id': `${siteUrl}/#person`,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Atlanta',
        addressRegion: 'GA',
        addressCountry: 'US',
      },
      areaServed: 'United States',
      serviceType: ['Fractional CMO', 'Marketing Consulting', 'Brand Strategy'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Kinetic Brand Partners',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Viewport and performance meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* Resource hints for external services */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />

        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W556XZSB');
          `}
        </Script>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W556XZSB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
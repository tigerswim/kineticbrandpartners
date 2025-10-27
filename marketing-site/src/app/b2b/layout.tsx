// src/app/b2b/layout.tsx

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B2B Brand Positioning | Strategic Marketing Leadership | Sales Enablement',
  description: 'Stop competing on price. B2B brand positioning and strategic marketing that commands premium pricing and shortens sales cycles.',
}

export default function B2BLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}

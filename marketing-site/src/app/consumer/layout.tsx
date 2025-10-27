// src/app/consumer/layout.tsx

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consumer Brand Strategy | CPG Launch Expert | Retail Marketing',
  description: 'Launch products that actually sell. Consumer brand strategy, retail partnerships, and CPG expertise. From $0 to $50M+ launches.',
}

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}

// app/layout.tsx
import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dan Hoeller | Marketing Leader | Kinetic Brand Partners',
  description: 'Marketing leader with 15+ years building brands and driving growth. Offering strategic marketing leadership to companies that need experience without the full-time overhead.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
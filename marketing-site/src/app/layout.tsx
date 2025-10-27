// app/layout.tsx
import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Strategy Consultant | Consumer & B2B Marketing | Kinetic Brand Partners',
  description: 'Transform forgettable brands into household names. 20+ years building consumer brands and B2B companies for Target, Walmart, Amazon, and more.',
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
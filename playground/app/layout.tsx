import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Component Library Playground',
  description: 'Interactive playground for testing components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
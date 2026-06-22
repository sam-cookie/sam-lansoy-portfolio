import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sam Lansoy — Portfolio',
  description: 'Full-stack developer, CS student, builder.',
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

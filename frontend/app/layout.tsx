import '../styles/globals.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Providers from '../components/Providers'

export const metadata: Metadata = {
  title: 'Token Discovery | Axiom Trade Replica',
  description: 'Real-time token discovery table with live price updates',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a0b0d" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './enhancements.css'

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif'
})

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'SACHITH & HANSIKA Wedding',
  description: 'Join us as we celebrate the wedding of SACHITH and HANSIKA on September 13, 2026.',
  generator: 'v0.app',
  icons: {
    icon: '/heart-icon.svg',
    apple: '/heart-icon.svg',
  },
  openGraph: {
    title: 'SACHITH & HANSIKA Wedding',
    description: 'Join us as we celebrate the wedding of SACHITH and HANSIKA on September 13, 2026.',
    url: 'https://sachith-hansika-wedding.com',
    siteName: 'SACHITH & HANSIKA Wedding',
    images: [
      {
        url: '/1.jpg',
        width: 1200,
        height: 630,
        alt: 'SACHITH & HANSIKA',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#AC8E73',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

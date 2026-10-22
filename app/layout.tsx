import type { Metadata } from 'next'
import type { Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WEDDING_CONFIG } from '@/lib/constants'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: '¡Nos casamos! | Elena & Fran',
  description: WEDDING_CONFIG.seo.description,
  openGraph: {
    title: '¡NOS CASAMOS!!!',
    description: 'Elena y Fran se casan el 17 de abril de 2027',
    type: 'website',
    locale: 'es_ES',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: '¡Nos casamos! Elena y Fran' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¡NOS CASAMOS!!!',
    description: 'Elena y Fran se casan el 17 de abril de 2027',
    images: ['/opengraph-image'],
  },
  generator: 'v0.app',
  icons: {
    icon: '/logo2.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <body className="relative isolate overflow-x-hidden font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <div aria-hidden="true" className="page-atmosphere" />
        <div className="relative z-10">{children}</div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

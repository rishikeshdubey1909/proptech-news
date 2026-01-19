import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StickyNewsletterCTA from '@/components/sections/StickyNewsletterCTA'

export const metadata: Metadata = {
  title: {
    default: 'PropTech News | Real Estate Technology Intelligence',
    template: '%s | PropTech News',
  },
  description: 'The leading source for PropTech news, funding rounds, startup insights, and real estate technology intelligence for founders, investors, and industry leaders.',
  keywords: ['PropTech', 'Real Estate Technology', 'Property Tech', 'Startups', 'Funding', 'Real Estate'],
  authors: [{ name: 'PropTech News' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://proptechnews.com',
    siteName: 'PropTech News',
    title: 'PropTech News | Real Estate Technology Intelligence',
    description: 'The leading source for PropTech news, funding rounds, startup insights, and real estate technology intelligence.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropTech News',
    description: 'The leading source for PropTech news and intelligence',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <StickyNewsletterCTA />
      </body>
    </html>
  )
}

import type React from "react"
import "./globals.css"
import { IBM_Plex_Sans, Outfit } from "next/font/google"
import type { Metadata } from "next"

// Load IBM Plex Sans font
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
})

// Load Outfit font for friendly yet modern headers
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lesmon Andres",
  description: "Tech Founder and Gen Z Yapper",
  metadataBase: new URL('https://lesmonandres.com'),
  icons: {
    icon: "/la-logo.png",
    apple: "/la-logo.png",
  },
  generator: 'v0.dev',
  openGraph: {
    title: "Lesmon Andres",
    description: "Tech Founder and Gen Z Yapper",
    url: "https://lesmonandres.com",
    siteName: "Lesmon Andres",
    images: [
      {
        url: "/la-logo.png",
        width: 1200,
        height: 630,
        alt: "Lesmon Andres",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lesmon Andres",
    description: "Tech Founder and Gen Z Yapper",
    site: "@lesmonandres",
    creator: "@lesmonandres",
    images: ["/la-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.className} ${outfit.variable}`}>{children}</body>
    </html>
  )
}

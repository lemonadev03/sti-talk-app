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
  title: "Lesmon Andres | Page",
  description: "Personal link page for Lesmon Andres",
  icons: {
    icon: "/la-logo.png",
    apple: "/la-logo.png",
  },
    generator: 'v0.dev'
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

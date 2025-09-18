import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SafeGuard - Privacy Protection Browser Extension",
  description:
    "Real-time website threat detection and blocking. Protect yourself from malicious, spam, phishing, and adult content with our advanced privacy-focused browser extension.",
  keywords: "privacy, browser extension, security, malware protection, phishing protection, safe browsing",
  authors: [{ name: "SafeGuard Team" }],
  creator: "SafeGuard",
  publisher: "SafeGuard",
  robots: "index, follow",
  openGraph: {
    title: "SafeGuard - Privacy Protection Browser Extension",
    description: "Real-time website threat detection and blocking for safer browsing",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeGuard - Privacy Protection Browser Extension",
    description: "Real-time website threat detection and blocking for safer browsing",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.variable};
  --font-mono: ${GeistMono.variable};
  --font-instrument-serif: ${instrumentSerif.variable};
}
        `}</style>
      </head>
      {/* <ThemeProvider forcedTheme="dark"> */}
        <body className={`${figtree.variable} ${instrumentSerif.variable}`}>
          {children}
        </body>
      {/* </ThemeProvider> */}
    </html>
  );
}

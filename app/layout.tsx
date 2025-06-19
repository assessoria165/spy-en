import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@/components/Analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SPY EN - WhatsApp Tracker",
  description: "Advanced WhatsApp tracking and monitoring system",
  viewport: "width=device-width, initial-scale=0.95, maximum-scale=0.95, user-scalable=0, viewport-fit=cover",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <Analytics />
          {children}
        </Suspense>
      </body>
    </html>
  )
}

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Configure Inter font with all the weights we need, but only the ones we actually use
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Reduced from ["300", "400", "500", "600", "700", "800"]
  display: "swap", // Add display swap for better performance
})

export const metadata = {
  title: "Eesti ratta reiting",
  description: "Estonian Bicycle Rating System",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

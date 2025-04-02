import "./globals.css"
import { Providers } from "./providers"

export const metadata = {
  title: "Parabolic Exchange",
  description: "Web3-based peer-to-peer cryptocurrency exchange platform",
  manifest: "/manifest.json",
  themeColor: "#6b21a8",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Parabolic Exchange",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}



import './globals.css'
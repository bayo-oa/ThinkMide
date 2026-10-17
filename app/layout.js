import './globals.css'

export const metadata = {
  title: 'Adebayo Victor | ThinkMide',
  description: 'Web developer building fast, bold websites.',
}
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#1c1c1e' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}

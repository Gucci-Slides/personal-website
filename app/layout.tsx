import type { Metadata } from "next"
import { Poppins } from 'next/font/google'
import "./globals.css"

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ARLISS — Software Engineer",
  description: "Portfolio of innovative software engineering and creative development",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-frozen-lake">
          <main>
            {children}
          </main>   
      </body>
    </html>
  )
}


import type { Metadata } from "next"
import { JetBrains_Mono } from 'next/font/google'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import "./globals.css"

const mono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: "arliss",
  description: "personal website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${mono.className} min-h-screen`}>
        <div className="flex min-h-screen">
          {/* Mobile Navigation */}
          <div className="md:hidden fixed top-4 left-4 z-50">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 glass-nav p-8">
                <div className="flex items-center gap-2 mb-12">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="4" fill="currentColor" />
                    <rect x="4" y="10" width="16" height="4" fill="currentColor" opacity="0.7" />
                    <rect x="4" y="16" width="16" height="4" fill="currentColor" opacity="0.4" />
                  </svg>
                  <span className="font-normal text-lg tracking-tight">ARLISS</span>
                </div>
                <div className="space-y-4 text-sm tracking-wide">
                  <a href="#" className="block text-white">ABOUT ME</a>
                  <a href="#designs" className="block text-zinc-400">DESIGNS</a>
                  <a href="#projects" className="block text-zinc-400">PROJECTS</a>
                  <a href="#socials" className="block text-zinc-400">SOCIALS</a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <nav className="fixed left-0 top-0 hidden md:flex h-screen w-64 flex-col glass-nav p-8">
            <div className="flex items-center gap-2 mb-12">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="4" fill="currentColor" />
                <rect x="4" y="10" width="16" height="4" fill="currentColor" opacity="0.7" />
                <rect x="4" y="16" width="16" height="4" fill="currentColor" opacity="0.4" />
              </svg>
              <span className="font-normal text-lg tracking-tight">ARLISS</span>
            </div>
            <div className="space-y-4 text-sm tracking-wide">
              <a href="#" className="block text-white">ABOUT ME</a>
              <a href="#designs" className="block text-zinc-400">DESIGNS</a>
              <a href="#projects" className="block text-zinc-400">PROJECTS</a>
              <a href="#socials" className="block text-zinc-400">SOCIALS</a>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 md:pl-64">{children}</main>
        </div>
      </body>
    </html>
  )
}


import type { Metadata } from 'next'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import ThemeSelector from "./components/ThemeSelector";
import { ThemeProvider } from './contexts/ThemeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Coursehub',
  description: 'CourseHub is a free platform where students can learn tech through clean, text-based lessons and earn shareable certificates. No paywalls, no friction — just sign in with GitHub and start learning.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <ThemeProvider>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <Show when="signed-out">
                <SignInButton mode="modal" />
                <SignUpButton mode="modal" />
              </Show>
              <Show when="signed-in">
                <UserButton/>
              </Show>
              <ThemeSelector />
            </header>
            {children}
          </ThemeProvider>
        </ClerkProvider>
        <footer aria-label="Site footer" className="p-4 mt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col gap-2 text-sm">
            <p>&copy; Coursehub.tech {new Date().getFullYear()} - All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms-of-service" className="text-purple-700 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-purple-700 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                Privacy Policy
              </Link>
            </div>
          </div>
      </footer>
      </body>
    </html>
  )
}

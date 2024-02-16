import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/providers/ThemeProvider'
import MotionProvider from '@/components/providers/MotionProvider'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const roboto_flex = Roboto_Flex({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Generative Arts #100',
  description: 'Generative Arts by Riku-Mono',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto_flex.className} flex min-h-screen flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50`}
      >
        <ThemeProvider>
          <Header />
          <MotionProvider>{children}</MotionProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

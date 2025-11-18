import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { CartProvider } from '@/lib/cart-context';
import { Toaster } from 'sonner'
import { ReduxProvider } from '@/components/redux-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Slooze - Food Ordering System',
  description: 'Fast, easy, and delicious food delivery',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ReduxProvider>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" theme="dark" richColors />
            <Analytics />
          </CartProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

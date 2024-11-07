import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ToasterProvider } from '@/app/components/providers/toaster-provider'
import { ModalProvider } from '@/app/components/providers/modal-provider'
import { CrispProvider } from '@/app/components/providers/crisp-provider'

import './globals.css';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/config';
import AppKitProvider from '@/context';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zelos',
  description: 'AI Platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <ClerkProvider>
      
      <html lang="en" suppressHydrationWarning>
        {/* <CrispProvider /> */}
        <body className={font.className}>
          <ToasterProvider />
          <ModalProvider />
          <AppKitProvider initialState={initialState}>
          {children}
          </AppKitProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

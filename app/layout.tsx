// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { ToasterProvider } from '@/app/components/providers/toaster-provider';
import { ModalProvider } from '@/app/components/providers/modal-provider';
// import { CrispProvider } from '@/components/providers/crisp-provider'; // Uncomment if needed

import './globals.css';
import { headers } from 'next/headers'; // Allowed in Server Components
import { cookieToInitialState } from 'wagmi';
import { config } from '@/config';
import AppKitProvider from '@/context';
import { ResourceModalProvider } from '@/app/context/ResourceModalContext'; // Correct import path

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zelos',
  description: 'AI Platform',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get('cookie') || '');

  return (
    <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={font.className}>
          <ResourceModalProvider>
            <AppKitProvider initialState={initialState}>
              {/* Include Client Components here */}
              <ModalProvider>
                <ToasterProvider />
                {children}
              </ModalProvider>
            </AppKitProvider>
            </ResourceModalProvider>
          </body>
        </html>
    </ClerkProvider>
  );
}

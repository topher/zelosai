import 'tailwindcss/tailwind.css';
import { VisualEditing } from '@sanity/visual-editing/next-pages-router';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { Metadata } from 'next';

const PreviewProvider = dynamic(() => import('@/app/(landing)/blog/components/PreviewProvider'), { ssr: false });

interface LayoutProps {
  children: ReactNode;
  // draftMode: boolean;
  // token: string;
}

export const metadata: Metadata = {
  title: 'Zelos AI | Blog',
  description: 'Navigate the Intersection of Sports, AI, and Digital Rights.',
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-white text-black">
      {children}
    </div>
  );
}

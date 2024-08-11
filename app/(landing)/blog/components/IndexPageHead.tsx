import { Metadata } from 'next'
import BlogMeta from '@/app/(landing)/blog/components/BlogMeta'
import * as demo from '@/lib/demo.data'
import { Settings } from '@/lib/sanity.queries'
import { toPlainText } from 'next-sanity'

export interface IndexPageHeadProps {
  settings: Settings
}

export const metadata: Metadata = {
  title: demo.title,
  description: toPlainText(demo.description),
  openGraph: {
    images: [
      {
        url: `${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ title: demo.ogImageTitle })}`,
        alt: demo.ogImageTitle,
      },
    ],
  },
}

export default function IndexPage({ settings }: IndexPageHeadProps) {
  const {
    title = demo.title,
    description = demo.description,
    ogImage = {},
  } = settings
  const ogImageTitle = ogImage?.title || demo.ogImageTitle

  return (
    <>
      <BlogMeta />
      {/* Other page content goes here */}
    </>
  )
}

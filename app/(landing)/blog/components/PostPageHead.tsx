import BlogMeta from '@/app/(landing)/blog/components/BlogMeta'
import * as demo from '@/lib/demo.data'
import { urlForImage } from '@/lib/sanity.image'
import { Post, Settings } from '@/lib/sanity.queries'
import { Metadata } from 'next'

export interface PostPageProps {
  settings: Settings
  post: Post
}

export function generateMetadata({ settings, post }: PostPageProps): Metadata {
  const title = settings.title ?? demo.title
  const pageTitle = post.title ? `${post.title} | ${title}` : title
  const ogImage = post.coverImage?.asset?._ref
    ? urlForImage(post.coverImage).width(1200).height(627).fit('crop').url()
    : undefined

  return {
    title: pageTitle,
    openGraph: {
      images: ogImage ? [{ url: ogImage, alt: post.title }] : [],
    },
  }
}

export default function PostPage({ settings, post }: PostPageProps) {
  return (
    <>
      <BlogMeta />
      {/* Other page content goes here */}
    </>
  )
}

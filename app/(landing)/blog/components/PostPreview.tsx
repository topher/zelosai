import Avatar from '@/app/(landing)/blog/components/AuthorAvatar'
import CoverImage from '@/app/(landing)/blog/components/CoverImage'
import Date from '@/app/(landing)/blog/components/PostDate'
import type { Post } from '@/lib/sanity.queries'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Omit<Post, '_id'>) {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden text-white shadow-lg m-6">
      {coverImage && (
        <div className="w-full h-auto rounded-t-2xl">
          <CoverImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={false}
            className="w-full h-auto rounded-t-2xl"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold leading-snug z-10">
          <Link href={`/blog/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="text-sm text-gray-400 mb-4">
          <Date dateString={date} />
        </div>
        {excerpt && (
          <p className="text-base leading-relaxed text-gray-300">
            {excerpt}
          </p>
        )}
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
    </div>
  )
}

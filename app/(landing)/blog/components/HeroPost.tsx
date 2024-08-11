import AuthorAvatar from '@/app/(landing)/blog/components/AuthorAvatar'
import CoverImage from '@/app/(landing)/blog/components/CoverImage'
import Date from '@/app/(landing)/blog/components/PostDate'
import type { Post } from '@/lib/sanity.queries'
import Link from 'next/link'

export default function HeroPost(
  props: Pick<
    Post,
    'title' | 'coverImage' | 'date' | 'mainContent' | 'excerpt' | 'author' | 'slug'
  >,
) {
  const { title, coverImage, date, mainContent, excerpt, author, slug } = props
  return (
    <section>
      <div className="mb-8 md:mb-12">
        <CoverImage slug={slug} title={title} image={coverImage} priority />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl text-balance">
            <Link href={`/blog/posts/${slug}`} className="hover:underline">
              {title || 'Untitled'}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          {excerpt && (
            <p className="mb-4 text-lg leading-relaxed text-pretty">
              {excerpt}
            </p>
          )}
          {author && (
            <AuthorAvatar name={author.name} picture={author.picture} />
          )}
        </div>
      </div>
    </section>
  )
}
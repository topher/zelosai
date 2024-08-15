import PostPreview from '@/app/(landing)/blog/components/PostPreview'
import type { Post } from '@/lib/sanity.queries'

export default function MoreStories({ posts }: { posts: Post[] }) {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter text-white">
        More Stories
      </h2>
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostPreview
            key={post._id}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            mainContent={post.mainContent}
          />
        ))}
      </div>
    </section>
  )
}



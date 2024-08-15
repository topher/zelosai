"use client";

import PostPreview from '@/app/(landing)/blog/components/PostPreview'
import type { Post } from '@/lib/sanity.queries'
import ScrollAnimationWrapper from '../../components/ScrollAnimationWrapper'

export default function MoreStories({ posts }: { posts: Post[] }) {
  return (
    <ScrollAnimationWrapper>
      <section className="bg-gray-900 text-white py-24 px-6">
        <h2 className="text-6xl text-center font-extrabold mb-12">
          More Stories
        </h2>
        <p className="text-center text-xl text-gray-400 mb-16 max-w-5xl mx-auto">
          Discover more insightful stories and keep up with the latest trends in AI, sports, and digital rights.
        </p>
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
    </ScrollAnimationWrapper>
  )
}

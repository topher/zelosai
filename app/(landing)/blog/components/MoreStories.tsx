"use client";

import { useState } from 'react';
import PostPreview from '@/app/(landing)/blog/components/PostPreview';
import type { Post } from '@/lib/sanity.queries';
import ScrollAnimationWrapper from '../../components/ScrollAnimationWrapper';
import { Montserrat } from 'next/font/google'

const font = Montserrat({ weight: '600', subsets: ['latin'] })

interface MoreStoriesProps {
  posts: Post[];
  title?: string; // Add an optional title prop
}

export default function MoreStories({ posts, title = "More Stories" }: MoreStoriesProps) {
  const [visiblePosts, setVisiblePosts] = useState(6); // Initial state shows 6 posts

  // Function to load more posts (up to 6 more at a time)
  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 6);
  };

  return (
    <ScrollAnimationWrapper>
      <section className="bg-gray-900 text-white py-24 px-6">
        <h2 className="text-6xl text-center font-extrabold mb-12">
          {title} {/* Use the dynamic title */}
        </h2>
        <p className="text-center text-xl text-gray-400 mb-16 max-w-5xl mx-auto">
          Discover more insightful stories and keep up with the latest trends in AI, sports, and digital rights.
        </p>
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, visiblePosts).map((post) => (
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
        {visiblePosts < posts.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMorePosts}
              className={`${font.className} px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-transparent transition-all duration-200 hover:bg-white/20 hover:border-white hover:shadow-md`}
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </ScrollAnimationWrapper>
  );
}

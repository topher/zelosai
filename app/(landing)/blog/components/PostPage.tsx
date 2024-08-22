import React from 'react';
import BlogHeader from '@/app/(landing)/blog/components/BlogHeader';
import Layout from '@/app/(landing)/blog/components/BlogLayout';
import MoreStories from '@/app/(landing)/blog/components/MoreStories';
import PostBody from '@/app/(landing)/blog/components/PostBody';
import PostHeader from '@/app/(landing)/blog/components/PostHeader';
import SectionSeparator from '@/app/(landing)/blog/components/SectionSeparator';
import PostTitle from '@/app/(landing)/blog/components/PostTitle';
import { Post } from '@/lib/sanity.queries';
import { LandingNavbar } from '@/components/landing-navbar';
import { Footer } from '../../components/Footer';
import styled from 'styled-components';

export interface PostPageProps {
  preview?: boolean;
  loading?: boolean;
  post: Post;
  morePosts: Post[];
  settings?: any;
}

const NavbarBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px; /* match navbar's height */
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  background-color: #111827;
  z-index: 49; /* Just below the navbar's z-index of 50 */
`;

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts, post, settings } = props;

  return (
    <>
      <Layout>
        <NavbarBackground />
        <LandingNavbar />
        {/* <BlogHeader title={settings?.title} level={2} /> */}

        {/* Header */}
        {post && (
          <div className="relative overflow-hidden w-full rounded-b-[50px]">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
            />
          </div>
        )}

        {/* Content */}
        {post ? (
          <>
            <PostBody content={post.mainContent} />
            {/* <SectionSeparator /> */}
            {morePosts.length > 0 && (
              <div className="related-posts">
                <MoreStories posts={morePosts} />
              </div>
            )}
          </>
        ) : (
          <PostTitle>Loading…</PostTitle>
        )}
        <div className='bg-darkGray'>
          <Footer />
        </div>
      </Layout>
    </>
  );
}

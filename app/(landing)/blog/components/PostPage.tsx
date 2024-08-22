import React from 'react';
import Container from '@/app/(landing)/blog/components/BlogContainer';
import BlogHeader from '@/app/(landing)/blog/components/BlogHeader';
import Layout from '@/app/(landing)/blog/components/BlogLayout';
import MoreStories from '@/app/(landing)/blog/components/MoreStories';
import PostBody from '@/app/(landing)/blog/components/PostBody';
import PostHeader from '@/app/(landing)/blog/components/PostHeader';
import SectionSeparator from '@/app/(landing)/blog/components/SectionSeparator';
import PostTitle from '@/app/(landing)/blog/components/PostTitle';
import styled from 'styled-components';
import { Post } from '@/lib/sanity.queries';
import { LandingNavbar } from '@/components/landing-navbar';

export interface PostPageProps {
  preview?: boolean;
  loading?: boolean;
  post: Post;
  morePosts: Post[];
  settings?: any;
}

const PostContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

const NavbarBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px; /* match navbar's height */
  background-color: #111827;
  z-index: 49; /* Just below the navbar's z-index of 50 */
`;

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts, post, settings } = props;

  return (
    <>
      <Layout>
        <LandingNavbar />
        <BlogHeader title={settings?.title} level={2} />

        {/* Ensure PostHeader takes full width */}
        {post && (
          <div className="w-full -mt-40">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
            />
          </div>
        )}

        {/* Content Container */}
        <PostContainer>
          {post ? (
            <>
              <PostBody content={post.mainContent} />
              <SectionSeparator />
              {morePosts.length > 0 && (
                <div className="related-posts">
                  <h1>More Stories</h1>
                  <MoreStories posts={morePosts} />
                </div>
              )}
            </>
          ) : (
            <PostTitle>Loading…</PostTitle>
          )}
        </PostContainer>
      </Layout>
    </>
  );
}

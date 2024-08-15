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

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts, post, settings } = props;

  return (
    <>
      <Layout>
        <Container>
          <LandingNavbar />
          <BlogHeader title={settings?.title} level={2} />
          <PostContainer>
            {post ? (
              <>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                />
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
        </Container>
      </Layout>
    </>
  );
}

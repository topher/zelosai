'use client' 
import PostPage from '@/app/(landing)/blog/components/PostPage';
import PreviewPostPage from '@/app/(landing)/blog/components/PreviewPostPage';
import { readToken } from '@/lib/sanity.api';
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getSettings,
} from '@/lib/sanity.client';
import { Post, Settings } from '@/lib/sanity.queries';
import { notFound } from 'next/navigation'; // Ensure this is correctly imported

interface PageProps {
  post: Post;
  morePosts: Post[];
  settings?: Settings;
  draftMode?: boolean;
  token?: string;
}

// async function generateStaticParams() {
//   const slugs = await getAllPostsSlugs();
//   return slugs?.map(({ slug }) => ({ slug })) || [];
// }

export default async function ProjectSlugRoute({ params }: { params: { slug: string } }) {
  console.log("hi there xxx")
  const draftMode = false;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const [settings, { post, morePosts }] = await Promise.all([
    getSettings(client),
    getPostAndMoreStories(client, params.slug),
  ]);

  if (!post) {
    notFound(); // Use this to trigger a 404 page
  }

  return (
    <PostPage post={post} morePosts={morePosts} settings={settings} />
  );
}

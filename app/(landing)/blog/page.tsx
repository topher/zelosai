// app/blog/page.tsx

import IndexPage from '@/app/(landing)/blog/components/IndexPage';
import PreviewIndexPage from '@/app/(landing)/blog/components/PreviewIndexPage';
import { LandingNavbar } from '@/components/landing-navbar';
import { readToken } from '@/lib/sanity.api';
import { getAllPosts, getClient, getSettings } from '@/lib/sanity.client';
import { Post, Settings } from '@/lib/sanity.queries';

interface PageProps {
  posts: Post[];
  settings: Settings;
  draftMode: boolean;
}

export default async function Page() {
  const draftMode = false; // Implement draftMode detection as needed
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
  ]);

  const props: PageProps = {
    posts,
    settings,
    draftMode,
  };

  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        <LandingNavbar />
        {draftMode ? (
          <PreviewIndexPage posts={props.posts} settings={props.settings} />
        ) : (
          <IndexPage posts={props.posts} settings={props.settings} />
        )}
      </div>
    </main>
  );
}
 
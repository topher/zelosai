import Container from '@/app/(landing)/blog/components/BlogContainer'
import BlogHeader from '@/app/(landing)/blog/components/BlogHeader'
import Layout from '@/app/(landing)/blog/components/BlogLayout'
import HeroPost from '@/app/(landing)/blog/components/HeroPost'
import IndexPageHead from '@/app/(landing)/blog/components/IndexPageHead'
import MoreStories from '@/app/(landing)/blog/components/MoreStories'
import * as demo from '@/lib/demo.data'
import type { Post, Settings } from '@/lib/sanity.queries'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const { title = demo.title, description = demo.description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />
      <div className="bg-gray-900 text-white min-h-screen">
        <Layout preview={preview} loading={loading}>
          <Container>
            <BlogHeader title={title} description={description} level={1} />
            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
                mainContent={heroPost.mainContent}
              />
            )}
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </Container>
        </Layout>
      </div>
    </>
  )
}


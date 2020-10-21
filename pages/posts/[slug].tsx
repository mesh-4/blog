import Head from 'next/head'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import { ArticleLayout } from 'layouts/article'

import { PostBody } from 'components/post/body'
import { PostHeader } from 'components/post/header'
import { PostSocial } from 'components/post/social'

import { getPostBySlug, getAllPosts } from 'src/api'
import markdownToHtml from 'src/convert'
import PostType from 'types/post'

type Props = {
  post: PostType
}

export default function Post({ post }: Props) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ArticleLayout>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | Senlima Sun's Blog</title>
              <meta name="description" content={post.excerpt} />
              <meta property="og:image" content={post.ogImage.url} />
            </Head>

            <PostHeader title={post.title} date={post.date} />
            <PostSocial
              url={`https://senlima.blog/posts/${post.slug}`}
              title={post.title}
            />

            <PostBody content={post.content} />
          </article>
        </>
      )}
    </ArticleLayout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'excerpt',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])

  return {
    paths: posts.map(posts => {
      return {
        params: {
          slug: posts.slug,
        },
      }
    }),
    fallback: false,
  }
}

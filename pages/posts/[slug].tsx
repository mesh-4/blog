import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
// @ts-ignore
import hydrate from 'next-mdx-remote/hydrate'

import { ArticleLayout } from 'layouts/article'

import { PostHeader } from 'components/post/header'
import { PostSocial } from 'components/post/social'
import { MDXProvider } from 'components/MDXProvider'

type Post = {
  data: Record<string, any>
  content: string
}

type Props = {
  post: Post
}

export default function Post({ post }: Props) {
  const router = useRouter()
  const content = hydrate(post.content)

  return (
    <ArticleLayout>
      <NextSeo
        title={`${post.data.title} | Senlima Sun's Blog`}
        description={post.data.excerpt}
        canonical={`https://senlima.blog${router.pathname}`}
        openGraph={{
          type: 'article',
          site_name: "Senlima Sun's Blog",
          url: `https://senlima.blog${router.pathname}`,
          title: post.data.title,
          description: post.data.excerpt,
          images: [
            {
              url: 'https://senlima.blog/assets/cover.jpg',
            },
          ],
        }}
        twitter={{
          handle: '@senlima4',
          site: '@senlima4',
          cardType: 'summary_large_image',
        }}
      />
      <article>
        <PostHeader
          title={post.data.title}
          excerpt={post.data.excerpt}
          date={post.data.date}
        />
        <PostSocial
          title={post.data.title}
          url={`https://senlima.blog/posts/${router.pathname}`}
        />
        <MDXProvider>{content}</MDXProvider>
      </article>
    </ArticleLayout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

// @ts-ignore
import renderToString from 'next-mdx-remote/render-to-string'

import { getPost, getAllPostSlugs } from 'src/api'

export async function getStaticPaths() {
  const paths = await getAllPostSlugs()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: Params) {
  const { data, content } = await getPost(params.slug)
  const mdxSource = await renderToString(content, {
    scope: data,
  })
  return {
    props: {
      post: {
        data,
        content: mdxSource,
      },
    },
  }
}

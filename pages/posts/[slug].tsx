import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
// @ts-ignore
import hydrate from 'next-mdx-remote/hydrate'

import { ArticleLayout } from 'layouts/article'
import { PostHeader } from 'components/post/header'
import { PostSocial } from 'components/post/social'
import { components } from 'components/mdx/components'

const DynamicMDX = dynamic(async () => {
  const mod = await import('components/mdx/provider')
  return mod.MDXProvider
})

type Props = {
  mdxSource: string
  frontMatter: Record<string, any>
}

export default function Post({ frontMatter, mdxSource }: Props) {
  const router = useRouter()
  const content = hydrate(mdxSource, { components })

  return (
    <ArticleLayout frontMatter={frontMatter}>
      <PostHeader
        date={frontMatter.date}
        title={frontMatter.title}
        excerpt={frontMatter.excerpt}
      />
      <PostSocial
        title={frontMatter.title}
        url={`https://senlima.blog/posts/${router.query.slug}`}
      />
      <DynamicMDX>{content}</DynamicMDX>
    </ArticleLayout>
  )
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

export async function getStaticProps({
  params,
}: {
  params: { slug: string }
}) {
  const { data, content } = await getPost(params.slug)
  const mdxSource = await renderToString(content)
  return {
    props: {
      mdxSource,
      frontMatter: data,
    },
  }
}

import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

export function SEO({
  type = 'website',
  title = "Senlima Sun's Blog",
  excerpt = '一些紀錄和心路歷程',
}) {
  const router = useRouter()
  const isPost = type === 'article'
  const url = `https://senlima.blog${
    isPost ? `/posts/${router.query.slug}` : ''
  }`

  return (
    <NextSeo
      title={title}
      description={excerpt}
      canonical={url}
      openGraph={{
        type: type,
        site_name: "Senlima Sun's Blog",
        url: url,
        title: title,
        description: excerpt,
        images: [{ url: 'https://senlima.blog/assets/cover.jpg' }],
      }}
      twitter={{
        site: '@senlima4',
        handle: '@senlima4',
        cardType: 'summary_large_image',
      }}
    />
  )
}

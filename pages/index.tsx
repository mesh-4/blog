import Link from 'next/link'
import { NextSeo } from 'next-seo'

import Post from 'types/post'
import { getAllPosts } from 'src/api'
import { generateRSS } from 'src/rss'
import { DefaultLayout } from 'layouts/default'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const articleBlock = {
    borderBottom: '1px solid #8a8a8a',
  }

  return (
    <>
      <DefaultLayout>
        <NextSeo
          title="Senlima Sun's Blog"
          description="一些紀錄和心路歷程"
          canonical="https://senlima.blog"
          openGraph={{
            type: 'website',
            url: 'https://senlima.blog',
            title: "Senlima Sun's Blog",
            description: '一些紀錄和心路歷程',
            images: [{ url: '/assets/cover.jpg' }],
            site_name: "Senlima Sun's Blog",
          }}
          twitter={{
            handle: '@senlima4',
            site: '@senlima4',
            cardType: 'summary_large_image',
          }}
        />
        <header className="w-4/5 max-w-2xl mx-auto h-56 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Senlima Sun's Blog
            </h1>
            <h2 className="text-sm md:text-base">
              太過有感才會發，也有可能隨便發一些網頁技術的文章
            </h2>
            <p className="text-xs font-thin">
              您可以透過最下面的資訊和我聯絡，目前可接案
            </p>
          </div>
        </header>
        <main className="w-4/5 max-w-2xl mx-auto mb-12">
          {allPosts &&
            allPosts.map((post, i) => (
              <article
                key={post.slug}
                className="py-6"
                style={i === allPosts.length - 1 ? {} : articleBlock}
              >
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                  </a>
                </Link>
                <time className="text-sm text-gray-600">{post.date}</time>
                <section>{post.excerpt}</section>
              </article>
            ))}
        </main>
      </DefaultLayout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'content',
    'excerpt',
  ])

  await generateRSS(allPosts)

  return {
    props: { allPosts },
  }
}

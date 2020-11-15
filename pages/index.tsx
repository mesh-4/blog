import { NextSeo } from 'next-seo'
import {
  Box,
  Flex,
  Heading,
  VStack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react'
import crs from 'crypto-random-string'

import { DefaultLayout } from 'layouts/default'
import { PostItem } from 'components/post/item'
import { ASide } from 'components/common/aside'

type Item = {
  slug: string
  data: Record<string, any>
}

type Props = {
  allPosts: Item[]
}

export default function Index({ allPosts }: Props) {
  const dividerColor = useColorModeValue('black', 'white')
  return (
    <>
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
      <DefaultLayout>
        <Box as="header" mb="5vh">
          <Flex align="flex-start" justify="space-between">
            <Heading as="h1" size="lg" mb="0.5rem">
              Senlima Sun's Blog
            </Heading>
            <ASide />
          </Flex>
          <Heading as="h2" size="sm" fontWeight="300">
            太過有感才有可能隨便發一些網頁技術的文章
          </Heading>
        </Box>
        <VStack
          divider={
            <StackDivider
              key={crs({ length: 5 })}
              borderColor={dividerColor}
            />
          }
          spacing="0.5rem"
          align="stretch"
        >
          {allPosts?.map((post, i) => (
            <PostItem
              key={post.slug}
              slug={post.slug}
              post={post.data}
              index={i}
            />
          ))}
        </VStack>
      </DefaultLayout>
    </>
  )
}

import { getAllPosts } from 'src/api'
import { generateRSS } from 'src/rss'

export async function getStaticProps() {
  const allPosts = await getAllPosts()
  const rssData = allPosts.map(post => {
    return {
      slug: post.slug,
      title: post.data.title,
      excerpt: post.data.excerpt,
      date: post.data.date,
    }
  })
  await generateRSS(rssData)
  return {
    props: { allPosts },
  }
}

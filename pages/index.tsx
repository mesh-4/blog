import { Box, Flex, Heading } from '@chakra-ui/react'

import { DefaultLayout } from 'layouts/default'
import { PostList } from 'components/post/list'
import { ASide } from 'components/common/aside'

type Item = {
  slug: string
  data: Record<string, any>
}

type Props = {
  allPosts: Item[]
}

export default function Index({ allPosts }: Props) {
  return (
    <DefaultLayout>
      <Box as="header" mb="5vh">
        <Flex align="flex-start" justify="space-between">
          <Heading as="h1" size="lg" mb="0.5rem">
            Senlima Sun's Blog
          </Heading>
          <ASide />
        </Flex>
        <Heading as="h2" size="sm" fontWeight="300">
          一些文章
        </Heading>
      </Box>
      <PostList posts={allPosts} />
    </DefaultLayout>
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

import { VStack, StackDivider, useColorModeValue } from '@chakra-ui/react'
import crs from 'crypto-random-string'

import { PostItem } from './item'

type Item = {
  slug: string
  data: Record<string, any>
}

export function PostList({ posts }: { posts: Item[] }) {
  return (
    <VStack
      align="stretch"
      spacing="0.5rem"
      divider={
        <StackDivider
          key={crs({ length: 5 })}
          borderColor={useColorModeValue('black', 'white')}
        />
      }
    >
      {posts?.map((post, i) => (
        <PostItem
          key={post.slug}
          slug={post.slug}
          post={post.data}
          index={i}
        />
      ))}
    </VStack>
  )
}

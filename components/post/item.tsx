import { Box, Heading, Text, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type PropTypes = {
  slug: string
  post: Record<string, any>
  index: number
}

export function PostItem({ slug, post, index }: PropTypes) {
  const variants = {
    hidden: () => ({
      opacity: 0,
    }),
    visible: () => ({
      opacity: 1,
      transition: { delay: index * 0.25 },
    }),
  }

  return (
    <Box as="article" py="1em">
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <Link
          d="block"
          w="min-content"
          href={`http://localhost:3000/posts/${slug}`}
          fontSize="1.25rem"
          fontWeight="600"
        >
          <Heading as="h3" size="md" w="max-content">
            {post.title}
          </Heading>
        </Link>
        <Text as="time" color="gray.300" fontSize="0.85rem">
          {post.date}
        </Text>
        <Text as="section" mt="0.5rem">
          {post.excerpt}
        </Text>
      </motion.div>
    </Box>
  )
}
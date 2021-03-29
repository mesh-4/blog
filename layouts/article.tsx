import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Box, Center } from '@chakra-ui/react'

import { SEO } from 'components/common/seo'
import { Header } from 'components/common/header'

export function ArticleLayout({
  children,
  frontMatter,
}: {
  children: React.ReactNode
  frontMatter: Record<string, any>
}) {
  return (
    <>
      <SEO
        type="article"
        title={`${frontMatter.title} | Senlima Sun's Blog`}
        excerpt={frontMatter.excerpt as string}
      />
      <Box minH="100vh" pos="relative">
        <Box as="main" mx="auto" pos="relative" w="90%" maxW="680px" py="5vh">
          <Header />
          {children}
        </Box>
      </Box>
      <Center w="100%" h="100px">
        © 2020. All rights reserved.
      </Center>
    </>
  )
}

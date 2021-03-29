import { Box, Center } from '@chakra-ui/react'

import { SEO } from 'components/common/seo'

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SEO />
      <Box minH="100vh" pos="relative">
        <Box as="main" mx="auto" pos="relative" w="90%" maxW="680px" py="5vh">
          {children}
        </Box>
      </Box>
      <Center left="0" bottom="0" w="100%" h="100px">
        © 2020. All rights reserved.
      </Center>
    </>
  )
}

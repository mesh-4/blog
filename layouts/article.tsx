import { Box, Center } from '@chakra-ui/react'

import { Header } from 'components/common/header'

type Props = {
  children: React.ReactNode
}

export function ArticleLayout({ children }: Props) {
  return (
    <>
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

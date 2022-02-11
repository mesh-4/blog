import * as React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Navbar from './navbar'
import Footer from './footer'

const CommonLayout: React.FC = ({ children }) => {
  return (
    <Flex w="full" minH="100vh" flexDir="column">
      <Navbar />
      <Box w="full" mb="auto">
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}

export default CommonLayout

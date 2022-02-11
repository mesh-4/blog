import * as React from 'react'
import { Flex, Box } from '@chakra-ui/react'

import Sidebar from './sidebar'

interface PropTypes {
  email?: string
}

const DashboardLayout: React.FC<PropTypes> = ({ email, children }) => {
  return (
    <Flex pos="relative" w="full" h="100vh">
      <Box flex="none" w="300px">
        <Sidebar email={email} />
      </Box>
      <Box flex="auto" w="full">
        {children}
      </Box>
    </Flex>
  )
}

export default DashboardLayout

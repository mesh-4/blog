import * as React from 'react'
import { Box, Heading } from '@chakra-ui/react'

interface PropTypes {
  title: string
}

const DashboardFeatureLayout: React.FC<PropTypes> = ({ title, children }) => {
  return (
    <Box w="80%" h="full" pt={6} pb={2} mx="auto">
      <Heading mb={4} size="md">
        {title}
      </Heading>
      {children}
    </Box>
  )
}

export default DashboardFeatureLayout

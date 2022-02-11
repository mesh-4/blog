import * as React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const Footer: React.FC = () => {
  return (
    <Flex
      as="footer"
      w="full"
      py={2}
      fontSize="sm"
      align="center"
      justify="center"
      flexDir="column"
    >
      <Text>Copyright © 2022 Senlima Sun</Text>
      <Text>Made with remix, chakra ui and supabase</Text>
    </Flex>
  )
}

export default Footer

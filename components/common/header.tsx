import { Flex } from '@chakra-ui/react'

import { HomeButton } from './homeButton'
import { ASide } from './aside'

export function Header() {
  return (
    <Flex align="center" justify="space-between">
      <HomeButton />
      <ASide />
    </Flex>
  )
}

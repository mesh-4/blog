import { useRouter } from 'next/router'
import { Flex, Button } from '@chakra-ui/react'

import { ASide } from './aside'

export function Header() {
  const router = useRouter()

  return (
    <Flex align="center" justify="space-between">
      <Button
        variant="link"
        aria-label="blog home page"
        fontSize="2rem"
        colorScheme="black"
        onClick={() => router.push('/')}
      >
        S.
      </Button>

      <ASide />
    </Flex>
  )
}

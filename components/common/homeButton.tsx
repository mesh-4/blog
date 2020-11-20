import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Button } from '@chakra-ui/react'

export function HomeButton() {
  const [isFull, setFull] = useState(false)
  const router = useRouter()

  return (
    <Box pos="relative" fontSize="2rem">
      <Box
        w={isFull ? '117.333px' : '1.2rem'}
        overflow="hidden"
        transition="width .5s ease-in-out"
      >
        <Button
          variant="link"
          fontSize="2rem"
          colorScheme="black"
          aria-label="blog home page"
          onClick={() => router.push('/')}
          onMouseOut={() => setFull(false)}
          onMouseOver={() => setFull(true)}
        >
          <Text>Senlima</Text>
        </Button>
      </Box>
      <Text pos="absolute" right="-10px" bottom="-5px" userSelect="none">
        .
      </Text>
    </Box>
  )
}

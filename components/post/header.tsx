import { Heading, Text } from '@chakra-ui/react'
type Props = {
  title: string
  excerpt: string
  date: string
}

export function PostHeader({ title, excerpt, date }: Props) {
  return (
    <>
      <Heading as="h1" mt="2.5vh">
        {title}
      </Heading>
      <Heading as="h2" size="md" fontWeight="400">
        {excerpt}
      </Heading>
      <Text as="time" fontSize="0.85rem">
        {date}
      </Text>
    </>
  )
}

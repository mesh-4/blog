import {
  chakra,
  Kbd,
  Text,
  Link,
  Alert,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import { CodeBlock } from './codeBlock'

export const rootComponents = {
  h1: props => <Heading as="h1" mt="3" mb="2" {...props} />,
  h2: props => <Heading as="h2" size="lg" mt="3" mb="2" {...props} />,
  h3: props => <Heading as="h3" size="md" mt="3" mb="2" {...props} />,
  h4: props => <Heading as="h4" size="md" mt="3" mb={2} {...props} />,
  hr: () => <chakra.hr apply="mdx.hr" />,
  p: props => <Text as="p" mb="2" lineHeight="2" {...props} />,
  a: props => <Link as="a" color="green" fontWeight="bold" {...props} />,
  ul: props => <chakra.ul apply="mdx.ul" {...props} />,
  ol: props => <chakra.ol apply="mdx.ul" {...props} />,
  li: props => <chakra.li {...props} />,
  blockquote: props => (
    <Alert
      as="blockquote"
      role="none"
      mt="4"
      my="1.5rem"
      rounded="4px"
      variant="left-accent"
      {...props}
    />
  ),
  kbd: Kbd,
  pre: props => <chakra.div my="2em" borderRadius="sm" {...props} />,
  code: CodeBlock,
  inlineCode: props => (
    <chakra.code
      apply="mdx.code"
      color={useColorModeValue('purple.500', 'purple.200')}
      {...props}
    />
  ),
}

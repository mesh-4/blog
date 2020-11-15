import { ReactNode } from 'react'
import { MDXProvider as BaseProvider } from '@mdx-js/react'
import {
  Heading,
  Text,
  Link,
  Code,
  Divider,
  OrderedList,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

type CodeProps = {
  className?: string
  children: string
}

export function MDXProvider({ children }: Props) {
  const state = {
    h1: (props: string) => <Heading as="h1" mt="3" mb="2" {...props} />,
    h2: (props: string) => (
      <Heading as="h2" size="lg" mt="3" mb="2" {...props} />
    ),
    h3: (props: string) => (
      <Heading as="h3" size="md" mt="3" mb="2" {...props} />
    ),
    h4: (props: string) => (
      <Heading as="h4" size="md" mt="3" mb={2} {...props} />
    ),
    p: (props: string) => <Text as="p" mb="2" lineHeight="2" {...props} />,
    a: (props: string) => (
      <Link as="a" color="green" fontWeight="bold" {...props} />
    ),
    code: (props: CodeProps) => (
      <Code w="100%" p="0.5em" my="1.5rem" {...props} />
    ),
    hr: () => <Divider my="2.5rem" />,
    ul: (props: CodeProps) => <UnorderedList {...props} />,
    ol: (props: CodeProps) => <OrderedList {...props} />,
    li: (props: CodeProps) => <ListItem {...props} />,
  }

  return <BaseProvider components={state}>{children}</BaseProvider>
}

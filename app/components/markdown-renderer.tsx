import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Code,
  Divider,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  Image,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react'

type GetCoreProps = {
  children?: React.ReactNode
  'data-sourcepos'?: any
}

function getCoreProps(props: GetCoreProps): any {
  return props['data-sourcepos']
    ? { 'data-sourcepos': props['data-sourcepos'] }
    : {}
}

interface PropTypes {
  content: string
}

const MarkdownRenderer: React.FC<PropTypes> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        p: props => {
          const { children } = props
          return <Text mb={2}>{children}</Text>
        },
        em: props => {
          const { children } = props
          return <Text as="em">{children}</Text>
        },
        blockquote: props => {
          const { children } = props
          return (
            <Code as="blockquote" p={2}>
              {children}
            </Code>
          )
        },
        code: props => {
          const { inline, children, className } = props

          if (inline) {
            return <Code p={2} children={children} />
          }

          return (
            <Code
              className={className}
              whiteSpace="break-spaces"
              d="block"
              w="full"
              p={2}
              children={children}
            />
          )
        },
        del: props => {
          const { children } = props
          return <Text as="del">{children}</Text>
        },
        hr: props => {
          return <Divider />
        },
        a: Link,
        img: Image,
        text: props => {
          const { children } = props
          return <Text as="span">{children}</Text>
        },
        ul: props => {
          const { ordered, children, depth } = props
          const attrs = getCoreProps(props)
          let Element = UnorderedList
          let styleType = 'disc'
          if (ordered) {
            Element = OrderedList
            styleType = 'decimal'
          }
          if (depth === 1) styleType = 'circle'
          return (
            <Element
              spacing={2}
              as={ordered ? 'ol' : 'ul'}
              styleType={styleType}
              pl={4}
              {...attrs}
            >
              {children}
            </Element>
          )
        },
        ol: props => {
          const { ordered, children, depth } = props
          const attrs = getCoreProps(props)
          let Element = UnorderedList
          let styleType = 'disc'
          if (ordered) {
            Element = OrderedList
            styleType = 'decimal'
          }
          if (depth === 1) styleType = 'circle'
          return (
            <Element
              spacing={2}
              as={ordered ? 'ol' : 'ul'}
              styleType={styleType}
              pl={4}
              {...attrs}
            >
              {children}
            </Element>
          )
        },
        li: props => {
          const { children, checked } = props
          let checkbox = null
          if (checked !== null && checked !== undefined) {
            checkbox = (
              <Checkbox isChecked={checked} isReadOnly>
                {children}
              </Checkbox>
            )
          }
          return (
            <ListItem
              {...getCoreProps(props)}
              listStyleType={checked !== null ? 'none' : 'inherit'}
            >
              {checkbox || children}
            </ListItem>
          )
        },
        h1: props => {
          const { level, children } = props
          return (
            <Heading as="h1" size="xl" {...getCoreProps(props)}>
              {children}
            </Heading>
          )
        },
        h2: props => {
          const { level, children } = props
          return (
            <Heading as="h2" size="lg" {...getCoreProps(props)}>
              {children}
            </Heading>
          )
        },
        h3: props => {
          const { level, children } = props
          return (
            <Heading as="h3" size="md" {...getCoreProps(props)}>
              {children}
            </Heading>
          )
        },
        h4: props => {
          const { level, children } = props
          return (
            <Heading as="h4" size="sm" {...getCoreProps(props)}>
              {children}
            </Heading>
          )
        },
        h5: props => {
          const { level, children } = props
          return (
            <Heading as="h5" size="xs" {...getCoreProps(props)}>
              {children}
            </Heading>
          )
        },
        pre: props => {
          const { children } = props
          return <chakra.pre {...getCoreProps(props)}>{children}</chakra.pre>
        },
        table: Table,
        thead: Thead,
        tbody: Tbody,
        tr: props => <Tr>{props.children}</Tr>,
        td: props => <Td>{props.children}</Td>,
        th: props => <Th>{props.children}</Th>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer

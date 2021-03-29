import { Box, Text } from '@chakra-ui/react'
import theme from 'prism-react-renderer/themes/nightOwl'
import Highlight, { defaultProps } from 'prism-react-renderer'

export function CodeBlock(props) {
  const { className, children } = props

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children}
      language={className.split('-')[1]}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box
          as="pre"
          className={className}
          style={style}
          p="0.5em"
          my="1em"
          overflow="scroll"
          textAlign="left"
        >
          {tokens.map((line, i) => (
            <Box
              key={i}
              display="table-row"
              {...getLineProps({ line, key: i })}
            >
              <Text
                as="span"
                d="table-cell"
                pr="1em"
                align="right"
                userSelect="none"
                opacity="0.5"
              >
                {i + 1}
              </Text>
              <Text as="span" d="table-cell">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Highlight>
  )
}

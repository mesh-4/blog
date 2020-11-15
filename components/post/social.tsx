import { Box, Flex } from '@chakra-ui/react'
import { FiTwitter } from 'react-icons/fi'
import { BiCoffeeTogo } from 'react-icons/bi'
import { TwitterShareButton } from 'react-share'

type Props = {
  url: string
  title: string
}

export function PostSocial({ url, title }: Props) {
  return (
    <Flex as="aside" my="2.5vh" align="center" fontSize="0.9rem">
      <TwitterShareButton
        url={url}
        title={title}
        style={{ marginRight: '1em' }}
      >
        <Box d="none">twitter</Box>
        <FiTwitter />
      </TwitterShareButton>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.buymeacoffee.com/senlima"
      >
        <Box d="none">buy me a coffee</Box>
        <BiCoffeeTogo />
      </a>
    </Flex>
  )
}

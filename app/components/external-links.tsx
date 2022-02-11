import * as React from 'react'
import { Button } from '@chakra-ui/react'

import { FiTwitter, FiFileText, FiGithub, FiMail } from 'react-icons/fi'

const ExternalLinks: React.FC = () => {
  return (
    <>
      <a href="mailto:senlima0430@gmail.com">
        <Button colorScheme="red" leftIcon={<FiMail />}>
          Email
        </Button>
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://twitter.com/senlima4"
      >
        <Button colorScheme="twitter" leftIcon={<FiTwitter />}>
          Twitter
        </Button>
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/senlima4"
      >
        <Button colorScheme="purple" leftIcon={<FiGithub />}>
          Github
        </Button>
      </a>
      <a target="_blank" rel="noopener" href="https://about.senlima.dev">
        <Button colorScheme="teal" leftIcon={<FiFileText />}>
          Portfolio
        </Button>
      </a>
    </>
  )
}

export default ExternalLinks

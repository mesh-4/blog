import { Flex, Link, IconButton, useColorMode, Text } from '@chakra-ui/react'
import { FiGithub, FiTwitter } from 'react-icons/fi'
import { FaRegSun, FaRegMoon } from 'react-icons/fa'

export function ASide() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex as="aside" align="center">
      <Link href="https://twitter.com/senlima4" d="block" mr="1em" isExternal>
        <Text d="none">twitter</Text>
        <FiTwitter />
      </Link>
      <Link href="https://github.com/senlima0430" d="block" isExternal>
        <Text d="none">github</Text>
        <FiGithub />
      </Link>
      <IconButton
        variant="unstyled"
        ml="1em"
        aria-label="switch color mode"
        colorScheme={colorMode === 'light' ? 'black' : 'light'}
        icon={colorMode === 'light' ? <FaRegMoon /> : <FaRegSun />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}

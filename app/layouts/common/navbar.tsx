import * as React from 'react'
import type { Variants } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, Link } from 'remix'
import {
  Flex,
  useDisclosure,
  useMediaQuery,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { FiSearch, FiHome } from 'react-icons/fi'

import ColorModeSwitcher from '~/components/color-mode-switch'
import ExternalLinks from '~/components/external-links'

import SearchForm from '~/features/articles/search-form'

const barVariants: Variants = {
  hide: {
    translateY: '-150%',
    opacity: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.3,
    },
  },
  show: {
    translateY: 0,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
  leave: {
    translateY: '150%',
    opacity: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.3,
    },
  },
}

interface PropTypes {
  q?: string
}

const Navbar: React.FC<PropTypes> = ({ q }) => {
  const { isOpen: searchOpen, onToggle: toggleSearch } = useDisclosure()
  const [moreThan700] = useMediaQuery('(min-width: 700px)')
  const { pathname } = useLocation()

  return (
    <Flex
      as="nav"
      px={2}
      py={2}
      w="full"
      h="60px"
      align="center"
      justify="center"
      top={0}
      pos="sticky"
      zIndex="docked"
      overflowY="hidden"
      sx={{ backdropFilter: 'blur(4px)' }}
      className="hide-scrollbar"
    >
      <AnimatePresence exitBeforeEnter>
        {searchOpen ? (
          <motion.div
            key="search-input"
            variants={barVariants}
            initial="hide"
            animate="show"
            exit="leave"
          >
            <SearchForm onCancel={toggleSearch} />
          </motion.div>
        ) : (
          <motion.div
            key="feature-bar"
            variants={barVariants}
            initial="hide"
            animate="show"
            exit="leave"
          >
            <ButtonGroup size="sm" variant="ghost">
              {pathname !== '/' && (
                <Link to="/">
                  <Button leftIcon={<FiHome />}>Home</Button>
                </Link>
              )}

              <Button leftIcon={<FiSearch />} onClick={toggleSearch}>
                Search
              </Button>

              {moreThan700 && <ExternalLinks />}

              <ColorModeSwitcher />
            </ButtonGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default Navbar

import * as React from 'react'
import { useFetcher, NavLink } from 'remix'
import { FiBox, FiHome, FiGrid } from 'react-icons/fi'
import { Text, Button, Flex, VStack } from '@chakra-ui/react'

interface NavLinkButtonProps {
  to: string
  title: string
  icon: JSX.Element
}

const NavLinkButton: React.FC<NavLinkButtonProps> = ({ to, title, icon }) => {
  return (
    <NavLink to={to} style={{ width: '100%' }}>
      {({ isActive }) => (
        <Button
          variant={isActive ? 'solid' : 'ghost'}
          isFullWidth
          size="sm"
          leftIcon={icon}
          justifyContent="flex-start"
        >
          {title}
        </Button>
      )}
    </NavLink>
  )
}

const LogoutButton: React.FC = () => {
  const logout = useFetcher()
  return (
    <logout.Form method="post" action="/auth/logout">
      <Button
        type="submit"
        colorScheme="red"
        variant="ghost"
        isFullWidth
        isLoading={logout.state === 'loading' || logout.state === 'submitting'}
      >
        Logout
      </Button>
    </logout.Form>
  )
}

interface SidebarPropTypes {
  email?: string
}

const Sidebar: React.FC<SidebarPropTypes> = ({ email }) => {
  if (!email) return null
  return (
    <Flex
      h="full"
      flexDir="column"
      borderRight="1px"
      borderRightColor="gray.200"
    >
      <Text px={6} mt={6} mb={3} fontWeight="semibold">
        {email}
      </Text>

      <VStack pos="relative" spacing={1} mb={2} px={6} align="flex-start">
        <Text fontSize="sm" fontWeight="semibold">
          Pages
        </Text>
        <NavLinkButton to="/" title="Landing" icon={<FiHome />} />
        <NavLinkButton to="/dashboard" title="Dashboard" icon={<FiGrid />} />
      </VStack>

      <VStack pos="relative" spacing={1} mb="auto" px={6} align="flex-start">
        <Text fontSize="sm" fontWeight="semibold">
          Management
        </Text>

        <NavLinkButton
          to="/dashboard/articles"
          title="Articles"
          icon={<FiBox />}
        />
      </VStack>

      <LogoutButton />
    </Flex>
  )
}

export default Sidebar

import * as React from 'react'
import { useColorMode, Button } from '@chakra-ui/react'
import { FiSun, FiMoon } from 'react-icons/fi'

const ColorModeSwitcher: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button
      leftIcon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
      onClick={toggleColorMode}
      variant="ghost"
      color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
    >
      {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}

export default ColorModeSwitcher

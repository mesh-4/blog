import * as React from 'react'
import { Form } from 'remix'
import {
  Box,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'

import { FiSearch, FiX } from 'react-icons/fi'

interface PropTypes {
  q?: string
  onCancel?: () => void
}

const SearchForm: React.FC<PropTypes> = ({ q, onCancel }) => {
  return (
    <Box as={Form} method="get" action="/">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiSearch} />
        </InputLeftElement>
        <Input name="q" defaultValue={q || ''} placeholder="搜尋文章..." />
        <InputRightElement>
          <IconButton
            aria-label="cancel search"
            variant="ghost"
            size="sm"
            icon={<FiX />}
            onClick={onCancel}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

export default SearchForm

import * as React from 'react'
import { useFetcher } from 'remix'
import {
  Flex,
  Input,
  Button,
  Textarea,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react'

const CreatorForm: React.FC = () => {
  const { Form, state } = useFetcher()

  return (
    <Flex
      as={Form}
      flexDir="column"
      method="post"
      action="/dashboard/articles/new"
    >
      <FormControl mb={2} isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input id="title" name="title" required />
      </FormControl>

      <FormControl mb={2} isRequired>
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <Input id="slug" name="slug" required />
        <FormHelperText>Article's url name</FormHelperText>
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea id="description" name="description" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Textarea id="content" name="content" />
      </FormControl>

      <Button
        mt={6}
        type="submit"
        isLoading={state === 'loading' || state === 'submitting'}
      >
        Create
      </Button>
    </Flex>
  )
}

export default CreatorForm

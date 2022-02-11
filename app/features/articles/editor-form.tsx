import * as React from 'react'
import { useFetcher } from 'remix'
import {
  Flex,
  Input,
  Button,
  Checkbox,
  Textarea,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react'

import type { Article } from '~/types'

interface PropTypes {
  data: Article
}

const EditorForm: React.FC<PropTypes> = ({ data }) => {
  const { Form, state } = useFetcher()

  return (
    <Flex
      as={Form}
      flexDir="column"
      method="put"
      action={`/dashboard/articles/${data.id}`}
    >
      <FormControl mb={2}>
        <Checkbox
          id="is_public"
          name="is_public"
          defaultIsChecked={data.is_public}
        >
          Public
        </Checkbox>
      </FormControl>

      <FormControl mb={2} isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input id="title" name="title" required defaultValue={data.title} />
      </FormControl>

      <FormControl mb={2} isRequired>
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <Input id="slug" name="slug" required defaultValue={data.slug} />
        <FormHelperText>Article's url name</FormHelperText>
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          name="description"
          defaultValue={data.description}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Textarea id="content" name="content" defaultValue={data.content} />
      </FormControl>

      <Button
        mt={6}
        type="submit"
        isLoading={state === 'loading' || state === 'submitting'}
      >
        Submit
      </Button>
    </Flex>
  )
}

export default EditorForm

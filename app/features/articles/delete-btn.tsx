import * as React from 'react'
import { useFetcher } from 'remix'
import { Button } from '@chakra-ui/react'

interface PropTypes {
  articleId: string
}

const DeleteBtn: React.FC<PropTypes> = ({ articleId }) => {
  const { Form, state } = useFetcher()

  return (
    <Form method="delete" action={`/dashboard/articles/${articleId}`}>
      <Button
        size="sm"
        type="submit"
        isLoading={state === 'loading' || state === 'submitting'}
      >
        Delete
      </Button>
    </Form>
  )
}

export default DeleteBtn

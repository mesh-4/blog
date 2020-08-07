import React from 'react'
import { Button } from '@material-ui/core'

import { useArticleEditorContext } from '../context'

export function ArticleUpdateButton() {
  const { updateEditorContent } = useArticleEditorContext()

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={() => updateEditorContent()}
    >
      Save
    </Button>
  )
}

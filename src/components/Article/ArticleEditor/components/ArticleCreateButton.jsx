import React from 'react'
import { Button } from '@material-ui/core'

import { useArticleEditorContext } from '@/context'

export function ArticleCreateButton() {
  const { createArticle } = useArticleEditorContext()

  return (
    <Button
      fullWidth
      color="primary"
      variant="contained"
      onClick={() => createArticle()}
    >
      New Draft
    </Button>
  )
}

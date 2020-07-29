import React, { useState } from 'react'
import { Button } from '@material-ui/core'

import { ArticleDeleteModal } from './ArticleDeleteModal'

export function ArticleDeleteButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        size="small"
        color="secondary"
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <ArticleDeleteModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

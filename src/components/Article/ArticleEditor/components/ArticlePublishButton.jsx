import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

import { useArticleEditorContext } from '@/context'
import { ArticlePublishModal } from './ArticlePublishModal'

export function ArticlePublishButton({ disabled }) {
  const [open, setOpen] = useState(false)
  const { updateEditorContent } = useArticleEditorContext()

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        disabled={disabled}
        onClick={async () => {
          await updateEditorContent()
          setOpen(true)
        }}
      >
        Publish
      </Button>
      <ArticlePublishModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

ArticlePublishButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
}

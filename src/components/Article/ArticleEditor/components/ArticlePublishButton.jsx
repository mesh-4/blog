import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

import { ArticlePublishModal } from './ArticlePublishModal'

export function ArticlePublishButton({ disabled }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        size="small"
        color="secondary"
        variant="contained"
        disabled={disabled}
        onClick={() => setOpen(true)}
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

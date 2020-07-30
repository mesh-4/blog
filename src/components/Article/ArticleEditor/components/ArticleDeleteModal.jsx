import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography } from '@material-ui/core'

import { useArticleEditorContext } from '@/context'
import deleteImage from '@/assets/deleteImage.png'
import { ModalContainer } from '@/components/Layout/ModalContainer'

const useStyles = makeStyles(theme => ({
  image: {
    margin: '0 30%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '40%',
    height: 'auto',
  },
}))

export function ArticleDeleteModal({ open, onClose }) {
  const classes = useStyles()
  const { deleteArticle } = useArticleEditorContext()

  return (
    <ModalContainer open={open} onClose={onClose}>
      <Typography variant="h4">Delete article?</Typography>

      <img
        className={classes.image}
        src={deleteImage}
        alt="a human delete somthing"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => deleteArticle()}
      >
        Confirm
      </Button>
    </ModalContainer>
  )
}

ArticleDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

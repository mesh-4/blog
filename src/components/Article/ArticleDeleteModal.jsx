// TODO Delete modal for article
import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { makeStyles } from '@material-ui/styles'
import { Modal, Button, Typography } from '@material-ui/core'

import { editorAtom } from '@/store'
import deleteImage from '@/assets/deleteImage.png'
import { firestore } from '../FirebaseProvider'

const useStyles = makeStyles(theme => ({
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    width: '40vw',
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
    outline: 'none',
    borderRadius: '8px',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '95vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '75vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50vw',
    },
  },
  image: {
    margin: '0 30%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '40%',
    height: 'auto',
  },
}))

const articleShape = {
  id: '',
  slug: '',
  cover: '',
  title: '',
  subtitle: '',
  content: '',
  draft: true,
}

export function ArticleDeleteModal({ open, onClose }) {
  const classes = useStyles()
  const [currentArticle, setArticle] = useRecoilState(editorAtom)

  const handleDelete = async () => {
    try {
      await firestore.collection('markdowns').doc(currentArticle.id).delete()
      setArticle(articleShape)

      toast.success('🗑 Delete article successfully')
      onClose()
    } catch (err) {
      toast.error(`Delete article failed: ${err}`)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.content}>
        <Typography variant="h4">Delete article?</Typography>

        <img
          className={classes.image}
          src={deleteImage}
          alt="a human delete somthing"
        />

        <Button variant="contained" color="primary" onClick={handleDelete}>
          Confirm
        </Button>
      </div>
    </Modal>
  )
}

ArticleDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

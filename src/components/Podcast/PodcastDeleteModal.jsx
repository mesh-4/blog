import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography, Modal } from '@material-ui/core'

import deleteImage from '@/assets/deleteImage.png'
import { storage, firestore } from '../FirebaseProvider'

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

export function PodcastDeleteModal({ open, onClose, target }) {
  const classes = useStyles()

  const handleDelete = async () => {
    await firestore.collection('audio').doc(target.id).delete()
    await storage.ref(`audio/${target.fileName}`).delete()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.content}>
        <Typography variant="h4">Delete {target.fileName}?</Typography>

        <img className={classes.image} src={deleteImage} alt="delete" />

        <Button variant="contained" color="primary" onClick={handleDelete}>
          Confirm
        </Button>
      </div>
    </Modal>
  )
}

PodcastDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
  }).isRequired,
}

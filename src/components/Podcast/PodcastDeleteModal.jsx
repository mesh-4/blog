import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useFirebase, useFirestore } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography } from '@material-ui/core'

import imageUrl from '@/images/throw_trash.svg'
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

export function PodcastDeleteModal({ open, onClose, target }) {
  const classes = useStyles()
  const firebase = useFirebase()
  const firestore = useFirestore()

  const handleDelete = async () => {
    try {
      await firestore.collection('audio').doc(target.id).delete()
      await firebase.storage().ref(`audio/${target.fileName}`).delete()
      toast.success('Delete audio success!')
      onClose()
    } catch (err) {
      toast.error(`Failed on delete audio: ${err.message}`)
      onClose()
    }
  }

  return (
    <ModalContainer open={open} onClose={onClose}>
      <Typography variant="h4">Delete {target.fileName}?</Typography>

      <img className={classes.image} src={imageUrl} alt="delete" />

      <Button variant="contained" color="primary" onClick={handleDelete}>
        Confirm
      </Button>
    </ModalContainer>
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

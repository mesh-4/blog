import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { storage, firestore } from 'firebase/app'
import { Button, Typography } from '@material-ui/core'

import imageUrl from '@/images/throw_trash.svg'
import { ModalContainer } from '@common/components/ModalContainer'

export function AudioDeleteModal({ open, onClose, target }) {
  const handleDelete = async () => {
    try {
      await firestore().collection('audio').doc(target.id).delete()
      await storage().ref(`audio/${target.fileName}`).delete()

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

      <img
        className="py-4"
        style={{ margin: '0 30%', width: '40%', height: 'auto' }}
        src={imageUrl}
        alt="delete"
      />

      <Button variant="contained" color="primary" onClick={handleDelete}>
        Confirm
      </Button>
    </ModalContainer>
  )
}

AudioDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
  }).isRequired,
}

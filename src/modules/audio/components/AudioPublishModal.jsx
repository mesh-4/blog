import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { firestore } from 'firebase/app'
import { Button, Typography } from '@material-ui/core'

import imageUrl from '@/images/put_files.svg'
import { ModalContainer } from '@common/components/ModalContainer'

export function AudioPublishModal({ open, onClose, target }) {
  const handlePublish = async () => {
    try {
      await firestore()
        .collection('audio')
        .doc(target.id)
        .update({ draft: false })

      onClose()
    } catch (err) {
      toast.error(`Failed on publish podcast: ${err.message}`)
      onClose()
    }
  }

  return (
    <ModalContainer open={open} onClose={onClose}>
      <Typography variant="h4">Publish {target.fileName}?</Typography>

      <img
        className="py-4"
        style={{ margin: '0 30%', width: '40%', height: 'auto' }}
        src={imageUrl}
        alt="publish"
      />

      <Button variant="contained" color="primary" onClick={handlePublish}>
        Continue
      </Button>
    </ModalContainer>
  )
}

AudioPublishModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
  }).isRequired,
}

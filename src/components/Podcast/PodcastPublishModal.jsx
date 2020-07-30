import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useFirestore } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography } from '@material-ui/core'

import publishImage from '@/assets/publishImage.png'
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

export function PodcastPublishModal({ open, onClose, target }) {
  const classes = useStyles()
  const firestore = useFirestore()

  const handlePublish = async () => {
    try {
      await firestore.collection('audio').doc(target.id).update({ draft: false })
      onClose()
    } catch (err) {
      toast.error(`Failed on publish podcast: ${err.message}`)
      onClose()
    }
  }

  return (
    <ModalContainer open={open} onClose={onClose}>
      <Typography variant="h4">Publish {target.fileName}?</Typography>

      <img className={classes.image} src={publishImage} alt="publish" />

      <Button variant="contained" color="primary" onClick={handlePublish}>
        Continue
      </Button>
    </ModalContainer>
  )
}

PodcastPublishModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
  }).isRequired,
}

import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography, Modal } from '@material-ui/core'

import publishImage from '@/assets/publishImage.png'
import { firestore } from './FirebaseProvider'

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

export function AudioPublishModal({ open, onClose, target }) {
  const classes = useStyles()

  const handlePublish = async () => {
    await firestore.collection('audio').doc(target.id).update({
      draft: false,
    })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.content}>
        <Typography variant="h4">Publish {target.fileName}?</Typography>

        <img className={classes.image} src={publishImage} alt="publish" />

        <Button variant="contained" color="primary" onClick={handlePublish}>
          Continue
        </Button>
      </div>
    </Modal>
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

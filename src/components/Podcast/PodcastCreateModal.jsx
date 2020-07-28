import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography, Modal, LinearProgress } from '@material-ui/core'

import uploadImage from '@/assets/uploadImage.png'
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
  uploadImage: {
    margin: '0 30%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '40%',
    height: 'auto',
  },
}))

export function PodcastCreateModal({ open, onClose }) {
  const classes = useStyles()
  const uploadRef = createRef()
  const [uploading, setUploading] = useState(false)
  const [uploadPercent, setPercent] = useState(false)

  const focusUpload = () => uploadRef.current.click()

  const handleUpload = e => {
    const file = e.target.files[0]
    const audioRef = storage.ref(`audio/${file.name}`)

    const uploadTask = audioRef.put(file)
    uploadTask.on(
      'state_changed',
      snapshot => {
        setUploading(true)
        setPercent(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        )
      },
      err => {
        setPercent(0)
        setUploading(false)
        toast.error(`Upload audio failed: ${err.code}`)
      },
      () => {
        setUploading(false)
        setPercent(0)
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          firestore.collection('audio').add({
            title: file.name,
            description: '',
            url: downloadURL,
            fileName: file.name,
            draft: true,
            createdAt: new Date(),
          })
        })
        onClose()
      }
    )
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.content}>
        <Typography variant="h4">Upload audio file</Typography>

        <img className={classes.uploadImage} src={uploadImage} alt="upload" />

        <div style={{ margin: '1em 5%', width: '90%' }}>
          {uploading && (
            <LinearProgress variant="determinate" value={uploadPercent} />
          )}
        </div>

        <Button variant="contained" color="primary" onClick={focusUpload}>
          Upload
        </Button>
        <input
          ref={uploadRef}
          type="file"
          accept=".mp3"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>
    </Modal>
  )
}

PodcastCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

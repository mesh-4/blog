import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useFirebase, useFirestore } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography, LinearProgress } from '@material-ui/core'

import uploadImage from '@/assets/uploadImage.png'
import { ModalContainer } from '@/components/Layout/ModalContainer'

const useStyles = makeStyles(theme => ({
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
  const firebase = useFirebase()
  const firestore = useFirestore()
  const [uploading, setUploading] = useState(false)
  const [uploadPercent, setPercent] = useState(false)

  const focusUpload = () => uploadRef.current.click()

  const handleUpload = e => {
    const file = e.target.files[0]
    const fileRef = firebase.storage().ref(`audio/${file.name}`)
    const uploadTask = fileRef.put(file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        setUploading(true)
        setPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
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
          firestore.collection('audios').add({
            url: downloadURL,
            fileName: file.name,
            title: file.name,
            description: '',
            draft: true,
            createdAt: new Date(),
          })
        })
        onClose()
      }
    )
  }

  return (
    <ModalContainer open={open} onClose={onClose}>
      <Typography variant="h4">Upload audio file</Typography>

      <img className={classes.uploadImage} src={uploadImage} alt="upload" />

      <div style={{ margin: '1em 5%', width: '90%' }}>
        {uploading && <LinearProgress variant="determinate" value={uploadPercent} />}
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
    </ModalContainer>
  )
}

PodcastCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useFirebase, useFirestore } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography, LinearProgress } from '@material-ui/core'

import imageUrl from '@/images/upload_file.svg'
import { useArticleEditorContext } from '@/context'
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

export function ArticlePublishModal({ open, onClose }) {
  const classes = useStyles()
  const uploadRef = createRef()
  const firebase = useFirebase()
  const firestore = useFirestore()
  const {
    markdown,
    updateMarkdown,
    publishArticle,
  } = useArticleEditorContext()
  const articleRef = firestore.collection('markdowns').doc(markdown.id)
  const [uploading, setUploading] = useState(false)
  const [uploadPercent, setPercent] = useState(0)

  function focusUpload() {
    uploadRef.current.click()
  }

  const handleUpload = e => {
    const file = e.target.files[0]
    const audioRef = firebase.storage().ref(`images/${file.name}`)

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

        toast.error(`Upload article cover failed: ${err.code}`)
      },
      () => {
        setUploading(false)
        setPercent(0)
        uploadTask.snapshot.ref.getDownloadURL().then(async downloadURL => {
          await articleRef.update({ cover: downloadURL })
          updateMarkdown(draft => {
            draft.cover = downloadURL
          })
          toast.success('Upload article cover successfully')
        })
      }
    )
  }

  const handlePublish = async () => {
    await publishArticle()
  }

  return (
    <ModalContainer open={open} onClose={onClose}>
      <Typography variant="h4">Publish article?</Typography>

      <img
        className={classes.image}
        src={imageUrl}
        alt="a human is publish somthing"
      />

      <div style={{ margin: '1em 5%', width: '90%' }}>
        {uploading && (
          <LinearProgress variant="determinate" value={uploadPercent} />
        )}
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={markdown.cover === '' ? focusUpload : handlePublish}
      >
        {markdown.cover === '' ? 'Upload cover' : 'Publish'}
      </Button>

      <input
        ref={uploadRef}
        type="file"
        accepts=".png"
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
    </ModalContainer>
  )
}

ArticlePublishModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

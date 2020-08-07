import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import { firestore, storage } from 'firebase/app'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { makeStyles } from '@material-ui/styles'
import { Button, Typography, LinearProgress } from '@material-ui/core'

import imageUrl from '@/images/upload_file.svg'
import { ModalContainer } from '@/components/Layout/ModalContainer'
import { useArticleEditorContext } from '../context'

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
  const {
    markdown,
    updateMarkdown,
    publishArticle,
  } = useArticleEditorContext()
  const uploadRef = createRef()
  const [article, loading] = useDocumentData(
    firestore().doc(`markdowns/${markdown.id}`)
  )

  const [uploading, setUploading] = useState(false)
  const [uploadPercent, setPercent] = useState(0)

  function focusUpload() {
    uploadRef.current.click()
  }

  const handleUpload = e => {
    const file = e.target.files[0]
    const audioRef = storage().ref(`images/${file.name}`)

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
          await firestore()
            .doc(`markdowns/${markdown.id}`)
            .update({ cover: downloadURL })
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

  if (loading) return <p>loading</p>

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
        onClick={article.cover === '' ? focusUpload : handlePublish}
      >
        {article.cover === '' ? 'Upload cover' : 'Publish'}
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

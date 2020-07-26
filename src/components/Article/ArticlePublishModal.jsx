// TODO Publish modal for article. Handle cover image upload too
import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography, Modal, LinearProgress } from '@material-ui/core'

import { editorAtom } from '@/store'
import publishImage from '@/assets/publishImage.png'
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

export function ArticlePublishModal({ open, onClose }) {
  const classes = useStyles()
  const uploadRef = createRef()
  const [currentArticle, setArticle] = useRecoilState(editorAtom)
  const articleRef = firestore.collection('markdowns').doc(currentArticle.id)

  const [uploading, setUploading] = useState(false)
  const [uploadPercent, setPercent] = useState(0)

  const focusUpload = () => uploadRef.current.click()

  const handleUpload = e => {
    const file = e.target.files[0]
    const audioRef = storage.ref(`images/${file.name}`)

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
          setArticle({ ...currentArticle, cover: downloadURL })

          toast.success('Upload article cover successfully')
        })
      }
    )
  }

  const handlePublish = async () => {
    try {
      await articleRef.update({ draft: false })
      setArticle({ ...currentArticle, draft: false })

      toast.success('Publish article successfully')
      onClose()
    } catch (err) {
      toast.error(`Publish article failed: ${err.code}`)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.content}>
        <Typography variant="h4">Publish article?</Typography>

        <img
          className={classes.image}
          src={publishImage}
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
          onClick={currentArticle.cover === '' ? focusUpload : handlePublish}
        >
          {currentArticle.cover === '' ? 'Upload cover' : 'Publish'}
        </Button>

        <input
          ref={uploadRef}
          type="file"
          accepts=".png"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>
    </Modal>
  )
}

ArticlePublishModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

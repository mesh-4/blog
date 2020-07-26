import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useRecoilState } from 'recoil'
import {
  Button,
  TextField,
  Typography,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { playerAtom } from '@/store'
import { firestore } from './FirebaseProvider'
import { AudioDeleteModal } from './AudioDeleteModal'
import { AudioPublishModal } from './AudioPublishModal'

const useStyles = makeStyles(() => ({
  head: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '1em !important',
  },
  body: {
    paddingTop: '0px !important',
  },
}))

export function AudioItem({ audio }) {
  const { id, title, description, fileName, url, draft } = audio
  const [player, setPlayer] = useRecoilState(playerAtom)

  const audioCollection = firestore.collection('audio')

  const classes = useStyles()
  const [modals, setModals] = useState({
    delete: false,
    publish: false,
  })
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorForm, setForm] = useState({
    title,
    description,
  })

  const handleModalStatus = (field, value) => {
    setModals({
      ...modals,
      [field]: value,
    })
  }

  const handlePlayAudio = () => {
    setPlayer({
      title,
      url,
    })
  }

  const handleEditorOpen = () => {
    setEditorOpen(true)
  }

  const handleEditorChange = e => {
    const { name, value } = e.currentTarget
    setForm({
      ...editorForm,
      [name]: value,
    })
  }

  const handleEditorSubmit = async () => {
    await audioCollection.doc(id).update({
      ...editorForm,
    })
    setEditorOpen(false)
  }

  return (
    <>
      <Card>
        <CardContent className={classes.head}>
          {editorOpen ? (
            <TextField
              fullWidth
              name="title"
              label="Title"
              variant="outlined"
              value={editorForm.title}
              onChange={handleEditorChange}
            />
          ) : (
            <Typography variant="h6" display="inline">
              {title}
            </Typography>
          )}

          <CardActions>
            <Button
              color="primary"
              disabled={player.url === url}
              onClick={handlePlayAudio}
            >
              Play
            </Button>

            {editorOpen ? (
              <Button onClick={handleEditorSubmit}>Submit</Button>
            ) : (
              <Button onClick={handleEditorOpen}>Edit</Button>
            )}

            {draft && (
              <Button onClick={() => handleModalStatus('publish', true)}>
                Publish
              </Button>
            )}

            <Button onClick={() => handleModalStatus('delete', true)}>
              Delete
            </Button>
          </CardActions>
        </CardContent>

        <CardContent className={classes.body}>
          {editorOpen ? (
            <TextField
              rows={4}
              multiline
              fullWidth
              variant="outlined"
              name="description"
              label="Description"
              value={editorForm.description}
              onChange={handleEditorChange}
            />
          ) : (
            <Typography variant="body1">{description}</Typography>
          )}
        </CardContent>
      </Card>

      <AudioDeleteModal
        open={modals.delete}
        onClose={() => handleModalStatus('delete', false)}
        target={{ id, fileName }}
      />
      <AudioPublishModal
        open={modals.publish}
        onClose={() => handleModalStatus('publish', false)}
        target={{ id, fileName }}
      />
    </>
  )
}

AudioItem.propTypes = {
  audio: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    draft: PropTypes.bool.isRequired,
  }).isRequired,
}

import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import EditorBase from 'rich-markdown-editor'
import { makeStyles } from '@material-ui/styles'
import { Button, TextField } from '@material-ui/core'

import { editorAtom } from '@/store'
import { firestore } from '../FirebaseProvider'
import { ArticleDeleteModal } from './ArticleDeleteModal'
import { ArticlePublishModal } from './ArticlePublishModal'

const useStyles = makeStyles(theme => ({
  editorActions: {
    width: '100%',
    margin: theme.spacing(2, 0),
  },
  editorButton: {
    flex: 'none',
    width: '80px',
    marginRight: theme.spacing(1),
  },
  editorDeleteButton: {
    flex: 'none',
    width: '80px',
  },
  editorField: {
    marginBottom: theme.spacing(1),
  },
}))

export function ArticleEditor() {
  const classes = useStyles()
  const [currentArticle, modifyArticle] = useRecoilState(editorAtom)
  const articleRef = firestore.collection('markdowns').doc(currentArticle)

  const [modalManage, setModal] = useState({
    delete: false,
    publish: false,
  })
  const [markdownForm, setMarkdownForm] = useState({
    slug: '',
    title: '',
    subtitle: '',
    content: '',
  })

  useEffect(() => {
    if (currentArticle.id.length === 0) {
      setModal({
        active: false,
        delete: false,
        publish: false,
      })
      setMarkdownForm({
        slug: '',
        title: '',
        subtitle: '',
        content: '',
      })
    }
  }, [currentArticle.id])

  const handleModalOpen = (field, status) => {
    setModal({ ...modalManage, [field]: status })
  }

  const handleFormFieldChange = e => {
    const { name, value } = e.currentTarget
    setMarkdownForm({ ...markdownForm, [name]: value })
  }

  const handleContentSubmit = async () => {
    try {
      await articleRef.update({ ...markdownForm, updatedAt: new Date() })
      modifyArticle({ ...currentArticle, ...markdownForm })

      toast.success('✍️ Article updated successfully')
    } catch (err) {
      toast.error(`Article updated failed: ${err.code}`)
    }
  }

  return (
    <>
      <div className={classes.editorActions}>
        <Button
          className={classes.editorButton}
          size="small"
          color="primary"
          variant="contained"
          onClick={handleContentSubmit}
        >
          Save
        </Button>

        {currentArticle.draft && (
          <Button
            className={classes.editorButton}
            size="small"
            color="secondary"
            variant="contained"
            disabled={currentArticle.slug.length === 0}
            onClick={() => handleModalOpen('publish', true)}
          >
            Publish
          </Button>
        )}

        <Button
          className={classes.editorDeleteButton}
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => handleModalOpen('delete', true)}
        >
          Delete
        </Button>
      </div>

      <div className={classes.editorField}>
        <TextField
          fullWidth
          name="slug"
          label="Slug"
          value={markdownForm.slug || ''}
          onChange={handleFormFieldChange}
        />
      </div>

      <div className={classes.editorField}>
        <TextField
          fullWidth
          name="title"
          label="Title"
          value={markdownForm.title || ''}
          onChange={handleFormFieldChange}
        />
      </div>

      <div className={classes.editorField}>
        <TextField
          fullWidth
          name="subtitle"
          label="Subtitle"
          value={markdownForm.subtitle || ''}
          onChange={handleFormFieldChange}
        />
      </div>

      <div>
        <EditorBase
          dark
          value={currentArticle.content}
          defaultValue={markdownForm.content}
          onChange={getValue => {
            setMarkdownForm({ ...markdownForm, content: getValue() })
          }}
        />
      </div>

      <ArticleDeleteModal
        open={modalManage.delete}
        onClose={() => handleModalOpen('delete', false)}
      />
      <ArticlePublishModal
        open={modalManage.publish}
        onClose={() => handleModalOpen('publish', false)}
      />
    </>
  )
}

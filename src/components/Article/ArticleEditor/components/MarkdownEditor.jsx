import React from 'react'
import MarkdownIt from 'markdown-it'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import EditorBase from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import { useArticleEditorContext } from '@/context'

const useStyles = makeStyles(theme => ({
  editorField: {
    marginBottom: theme.spacing(2),
  },
}))

const mdParser = new MarkdownIt()

export function MarkdownEditor() {
  const classes = useStyles()
  const { markdown, updateMarkdown } = useArticleEditorContext()

  const handleFormFieldChange = e => {
    const { name, value } = e.currentTarget
    updateMarkdown(draft => {
      draft[name] = value
    })
  }

  return (
    <>
      <div className={classes.editorField}>
        <TextField
          fullWidth
          name="slug"
          label="Slug"
          value={markdown.slug}
          onChange={handleFormFieldChange}
        />
      </div>

      <div className={classes.editorField}>
        <TextField
          fullWidth
          name="title"
          label="Title"
          value={markdown.title}
          onChange={handleFormFieldChange}
        />
      </div>

      <div className={classes.editorField}>
        <TextField
          fullWidth
          name="subtitle"
          label="Subtitle"
          value={markdown.subtitle}
          onChange={handleFormFieldChange}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <EditorBase
          config={{
            view: { menu: true, md: true, html: false },
            canView: {
              menu: true,
              md: true,
              html: false,
              fullScreen: false,
              hideMenu: true,
            },
          }}
          renderHTML={text => mdParser.render(text)}
          value={markdown.content}
          onChange={({ text }) => {
            updateMarkdown(draft => {
              draft.content = text
            })
          }}
        />
      </div>
    </>
  )
}

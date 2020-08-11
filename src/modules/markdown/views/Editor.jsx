import React from 'react'
import { Grid } from '@material-ui/core'

import './index.css'
import { ArticleEditorProvider } from '../context'
import { ArticleEditor } from '../components/ArticleEditor'

export function Editor() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <ArticleEditorProvider>
          <p className="pt-8 mb-4 text-3xl">Article Editor</p>
          <ArticleEditor />
        </ArticleEditorProvider>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}

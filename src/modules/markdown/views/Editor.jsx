import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import './index.css'
import { ArticleEditorProvider } from '../context'
import { ArticleEditor } from '../components/ArticleEditor'

export function Editor() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <ArticleEditorProvider>
          <Typography className="pt-8" variant="h5" gutterBottom>
            Article Editor
          </Typography>
          <ArticleEditor />
        </ArticleEditorProvider>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}

import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

import { ArticleEditorProvider } from '@/context'
import { ArticleEditor } from '@/components/Article/ArticleEditor'

const useStyles = makeStyles(theme => ({
  title: {
    paddingTop: theme.spacing(6),
  },
}))

export function Editor() {
  const classes = useStyles()

  return (
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <ArticleEditorProvider>
          <Typography className={classes.title} variant="h5" gutterBottom>
            Article Editor
          </Typography>
          <ArticleEditor />
        </ArticleEditorProvider>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}

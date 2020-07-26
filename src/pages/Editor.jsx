import React from 'react'
import { useRecoilValue } from 'recoil'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

import { editorAtom } from '@/store'
import { ArticleSelector } from '@/components/Article/ArticleSelector'
import { ArticleNewDraft } from '@/components/Article/ArticleNewDraft'
import { ArticleEditor } from '@/components/Article/ArticleEditor'

const useStyles = makeStyles(theme => ({
  title: {
    paddingTop: theme.spacing(6),
  },
  selectArticle: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
}))

export function Editor() {
  const currentArticle = useRecoilValue(editorAtom)
  const classes = useStyles()

  return (
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Typography className={classes.title} variant="h5" gutterBottom>
          Article Editor
        </Typography>

        <div className={classes.selectArticle}>
          <ArticleSelector />
          <ArticleNewDraft />
        </div>

        {currentArticle.id !== '' && <ArticleEditor />}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}

/*

*/

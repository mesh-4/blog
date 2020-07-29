import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { useArticleEditorContext } from '@/context'
import { MarkdownEditor } from './components/MarkdownEditor'
import { ArticleSelector } from './components/ArticleSelector'
import { ArticleCreateButton } from './components/ArticleCreateButton'
import { ArticleUpdateButton } from './components/ArticleUpdateButton'
import { ArticleDeleteButton } from './components/ArticleDeleteButton'
import { ArticlePublishButton } from './components/ArticlePublishButton'

const useStyles = makeStyles(() => ({
  selectArticle: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
}))

export function ArticleEditor() {
  const classes = useStyles()
  const { markdown } = useArticleEditorContext()

  return (
    <>
      <div>
        <ArticleSelector />
        <ArticleCreateButton />
      </div>
      {markdown.id !== '' && (
        <>
          <div className={classes.selectArticle}>
            <ArticleUpdateButton />
            {markdown.draft && (
              <ArticlePublishButton disabled={markdown.slug === ''} />
            )}
            <ArticleDeleteButton />
          </div>

          <div>
            <MarkdownEditor />
          </div>
        </>
      )}
    </>
  )
}

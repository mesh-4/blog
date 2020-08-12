import React from 'react'

import { useArticleEditorContext } from '../context'
import { MarkdownEditor } from './MarkdownEditor'
import { ArticleSelector } from './ArticleSelector'
import { ArticleCreateButton } from './ArticleCreateButton'
import { ArticleUpdateButton } from './ArticleUpdateButton'
import { ArticleDeleteButton } from './ArticleDeleteButton'
import { ArticlePublishButton } from './ArticlePublishButton'

export function ArticleEditor() {
  const { markdown } = useArticleEditorContext()

  return (
    <>
      <div className="article-editor__header">
        <ArticleSelector />
        <ArticleCreateButton />
      </div>
      {markdown.id !== '' && (
        <>
          <div className="article-editor__actions">
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

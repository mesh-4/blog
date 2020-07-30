import React from 'react'

import './index.css'
import { useArticleEditorContext } from '@/context'
import { MarkdownEditor } from './components/MarkdownEditor'
import { ArticleSelector } from './components/ArticleSelector'
import { ArticleCreateButton } from './components/ArticleCreateButton'
import { ArticleUpdateButton } from './components/ArticleUpdateButton'
import { ArticleDeleteButton } from './components/ArticleDeleteButton'
import { ArticlePublishButton } from './components/ArticlePublishButton'

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

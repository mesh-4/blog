import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

import { useArticleEditorContext } from '@/context'

export function ArticleSelector() {
  const [keyword, setKeyword] = useState('')
  const { markdown, initEditor } = useArticleEditorContext()
  const articles = useSelector(state => state.firestore.ordered.articleOptions)
  useFirestoreConnect({
    collection: `markdowns`,
    orderBy: [['createdAt', 'desc']],
    storeAs: 'articleOptions',
  })

  function handleKeywordChange(_event, word) {
    setKeyword(word)
  }

  function handleSelectArticle(_event, value) {
    const { id, slug, cover, title, subtitle, content, draft } = value
    initEditor({ id, slug, cover, title, subtitle, content, draft })
  }

  if (!isLoaded(articles)) return <p>loading</p>

  return (
    <Autocomplete
      size="small"
      freeSolo
      fullWidth
      disableClearable
      options={articles}
      getOptionLabel={option => (option.title ? option.title : '')}
      getOptionSelected={(option, currentVal) => option.id === currentVal.id}
      value={markdown}
      onChange={handleSelectArticle}
      inputValue={keyword}
      onInputChange={handleKeywordChange}
      renderInput={params => (
        <TextField {...params} label="Article" variant="outlined" />
      )}
    />
  )
}

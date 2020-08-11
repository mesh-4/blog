import React, { useState } from 'react'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { useArticleEditorContext } from '../context'

export function ArticleSelector() {
  const [keyword, setKeyword] = useState('')
  const { markdown, initEditor } = useArticleEditorContext()
  const [articles, loading] = useCollectionData(
    firestore().collection('markdowns').orderBy('createdAt', 'desc'),
    { idField: 'id' }
  )

  function handleKeywordChange(_event, word) {
    setKeyword(word)
  }

  function handleSelectArticle(_event, value) {
    const { id, slug, cover, title, subtitle, content, draft } = value
    initEditor({ id, slug, cover, title, subtitle, content, draft })
  }

  if (loading) return <p>loading</p>

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

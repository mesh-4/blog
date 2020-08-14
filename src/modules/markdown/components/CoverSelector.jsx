import React, { useState } from 'react'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { useArticleEditorContext } from '../context'

export function CoverSelector() {
  const [keyword, setKeyword] = useState('')
  const { markdown, initEditor } = useArticleEditorContext()
  const [images, loading] = useCollectionData(
    firestore().collection('images').orderBy('createdAt', 'desc'),
    { idField: 'id' }
  )

  function handleKeywordChange(_event, word) {
    setKeyword(word)
  }

  function handleSelectCover(_event, value) {
    const { filename } = value
    initEditor({
      ...markdown,
      filename,
    })
  }

  if (loading) return <p>loading</p>

  return (
    <Autocomplete
      size="small"
      freeSolo
      fullWidth
      disableClearable
      options={images}
      getOptionLabel={option => (option.filename ? option.filename : '')}
      getOptionSelected={(option, currentVal) =>
        option.filename === currentVal.name
      }
      value={markdown.cover}
      onChange={handleSelectCover}
      inputValue={keyword}
      onInputChange={handleKeywordChange}
      renderInput={params => (
        <TextField {...params} label="Cover image" variant="outlined" />
      )}
    />
  )
}

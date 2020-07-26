// TODO Handle select article to editor
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Autocomplete } from '@material-ui/lab'
import { useMediaQuery, TextField } from '@material-ui/core'

import { editorAtom } from '@/store'
import { firestore } from '../FirebaseProvider'

export function ArticleSelector() {
  const query = firestore.collection('markdowns').orderBy('createdAt', 'desc')
  const [articles, loading] = useCollectionData(query, { idField: 'id' })

  const [currentArticle, selectArticle] = useRecoilState(editorAtom)
  const isMobile = useMediaQuery('(max-width:600px)')
  const [keyword, setKeyword] = useState('')

  const handleKeywordChange = (_e, word) => {
    setKeyword(word)
  }

  const handleSelectArticle = (_e, value) => {
    const { id, slug, cover, title, subtitle, content, draft } = value
    selectArticle({ id, slug, cover, title, subtitle, content, draft })
  }

  if (loading) return <p>loading</p>

  return (
    <Autocomplete
      size="small"
      freeSolo
      disableClearable
      style={{ width: isMobile ? 200 : 300, marginRight: '30px' }}
      options={articles}
      getOptionLabel={option => (option.title ? option.title : '')}
      getOptionSelected={(option, currentVal) => option.id === currentVal.id}
      value={currentArticle}
      onChange={handleSelectArticle}
      inputValue={keyword}
      onInputChange={handleKeywordChange}
      renderInput={params => (
        <TextField {...params} label="Article" variant="outlined" />
      )}
    />
  )
}

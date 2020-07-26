// TODO Button to new draft
import React from 'react'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'
import { Button } from '@material-ui/core'

import { editorAtom } from '@/store'
import { firestore } from '../FirebaseProvider'

export function ArticleNewDraft() {
  const markdownRef = firestore.collection('markdowns')
  const setArticle = useSetRecoilState(editorAtom)

  const handleNewArticle = async () => {
    const { id } = await markdownRef.add({
      title: 'Untitled',
      subtitle: '',
      content: '',
      slug: '',
      cover: '',
      draft: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    setArticle(id)
    toast.success('✍️ New draft successfully')
  }

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={() => handleNewArticle()}
    >
      New Draft
    </Button>
  )
}

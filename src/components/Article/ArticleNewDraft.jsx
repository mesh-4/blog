import React from 'react'
import { toast } from 'react-toastify'
import { useFirestore } from 'react-redux-firebase'
import { Button } from '@material-ui/core'

export function ArticleNewDraft() {
  const firestore = useFirestore()

  const handleNewArticle = async () => {
    try {
      await firestore.collection('markdowns').add({
        title: 'Untitled',
        subtitle: '',
        content: '',
        slug: '',
        cover: '',
        draft: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      toast.success('✍️ New draft successfully')
    } catch (err) {
      toast.error(`Failed on create new draft: ${err.code}`)
    }
  }

  return (
    <Button color="primary" variant="contained" onClick={() => handleNewArticle()}>
      New Draft
    </Button>
  )
}

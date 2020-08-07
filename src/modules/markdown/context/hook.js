import { useContext } from 'react'
import { toast } from 'react-toastify'
import { firestore } from 'firebase/app'

import { ArticleEditorContext } from './provider'

const articleProto = {
  title: 'Untitled',
  subtitle: '',
  content: '',
  slug: '',
  cover: '',
  draft: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export function useArticleEditorContext() {
  const [markdown, updateMarkdown] = useContext(ArticleEditorContext)

  if (updateMarkdown === undefined) {
    throw new Error('Must have dispatch defined')
  }

  function initEditor(currentArticle) {
    updateMarkdown(draft => {
      draft.id = currentArticle.id
      draft.slug = currentArticle.slug
      draft.cover = currentArticle.cover
      draft.title = currentArticle.title
      draft.subtitle = currentArticle.subtitle
      draft.content = currentArticle.content
      draft.draft = currentArticle.draft
    })
  }

  async function createArticle() {
    try {
      const { id } = await firestore()
        .collection('markdowns')
        .add({ ...articleProto })

      updateMarkdown(draft => {
        draft.id = id
        draft.slug = ''
        draft.title = 'Untitled'
        draft.subtitle = ''
        draft.content = ''
        draft.draft = true
      })

      toast.success('Article updated successfully')
    } catch (err) {
      toast.error(`Update article failed: ${err.message}`)
    }
  }

  async function deleteArticle() {
    try {
      await firestore().collection('markdowns').doc(markdown.id).delete()
      updateMarkdown(draft => {
        draft.id = ''
        draft.slug = ''
        draft.title = ''
        draft.subtitle = ''
        draft.content = ''
        draft.draft = true
      })

      toast.success('Article deleted successfully')
    } catch (err) {
      toast.error(`Delete article failed: ${err.message}`)
    }
  }

  async function publishArticle() {
    try {
      const { id } = markdown
      updateMarkdown(draft => {
        draft.draft = false
      })
      await firestore().collection('markdowns').doc(id).update({
        draft: false,
      })

      toast.success('Article published successfully')
    } catch (err) {
      toast.error(`Publish article failed: ${err.message}`)
    }
  }

  async function updateEditorContent() {
    try {
      const { id, slug, title, subtitle, content } = markdown
      updateMarkdown(draft => {
        draft.slug = slug
        draft.title = title
        draft.subtitle = subtitle
        draft.content = content
      })

      await firestore().collection('markdowns').doc(id).update({
        slug,
        title,
        subtitle,
        content,
        updatedAt: new Date(),
      })
      toast.success('Article updated successfully')
    } catch (err) {
      toast.error(`Update article failed: ${err.message}`)
    }
  }

  return {
    markdown,
    updateMarkdown,
    initEditor,
    createArticle,
    deleteArticle,
    publishArticle,
    updateEditorContent,
  }
}
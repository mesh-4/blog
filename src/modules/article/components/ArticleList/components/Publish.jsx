import React from 'react'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { ArticleItem } from '../../ArticleItem'

export function ArticlePublishList() {
  const [articles, loading] = useCollectionData(
    firestore()
      .collection('markdowns')
      .where('draft', '==', false)
      .orderBy('updatedAt', 'desc'),
    { idField: 'id' }
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (articles.length === 0) {
    return (
      <li
        className="mb-3 flex align-center w-full"
        style={{ height: '100px' }}
      >
        No any article.
      </li>
    )
  }

  return articles.map(({ id, slug, title, subtitle, cover, updatedAt }) => (
    <ArticleItem
      key={id}
      imgNeed
      showTime
      article={{
        slug,
        cover,
        title,
        subtitle,
        updatedAt: updatedAt.toDate().toLocaleDateString(),
      }}
      gutterBottom
    />
  ))
}

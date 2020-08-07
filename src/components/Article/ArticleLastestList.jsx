import React from 'react'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Skeleton from '@material-ui/lab/Skeleton'

import { ArticleItem } from './ArticleItem'

export function ArticleLastestList() {
  const [articles, loading] = useCollectionData(
    firestore()
      .collection('markdowns')
      .where('draft', '==', false)
      .orderBy('updatedAt', 'desc')
      .limit(5),
    { idField: 'id' }
  )

  if (loading) {
    return (
      <li>
        <h2 className="mb-2">
          <Skeleton animation="wave" variant="text" width="100px" />
        </h2>
        <p className="m-0">
          <Skeleton animation="wave" variant="text" width="200px" />
        </p>
      </li>
    )
  }

  if (loading) {
    return <li>No any article.</li>
  }

  return articles.map(({ id, slug, title, subtitle }) => (
    <ArticleItem key={id} article={{ slug, title, subtitle }} gutterBottom />
  ))
}

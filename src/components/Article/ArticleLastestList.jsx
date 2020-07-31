import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Skeleton from '@material-ui/lab/Skeleton'

import { ArticleItem } from './ArticleItem'

export function ArticleLastestList() {
  const articles = useSelector(
    state => state.firestore.ordered.recommendArticles
  )
  useFirestoreConnect({
    collection: `markdowns`,
    where: [['draft', '==', false]],
    orderBy: [['updatedAt', 'desc']],
    limit: 5,
    storeAs: 'recommendArticles',
  })

  if (!isLoaded(articles)) {
    return (
      <li>
        <h2 style={{ marginBottom: '10px' }}>
          <Skeleton animation="wave" variant="text" width="100px" />
        </h2>
        <p style={{ margin: 0 }}>
          <Skeleton animation="wave" variant="text" width="200px" />
        </p>
      </li>
    )
  }

  if (isEmpty(articles)) {
    return <li>No any article.</li>
  }

  return articles.map(({ id, slug, title, subtitle }) => (
    <ArticleItem key={id} article={{ slug, title, subtitle }} gutterBottom />
  ))
}

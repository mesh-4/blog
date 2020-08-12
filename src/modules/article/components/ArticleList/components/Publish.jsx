import React from 'react'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Skeleton } from '@material-ui/lab'

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
    return (
      <li className="w-full flex">
        <div className="flex-none mr-4 w-6/12 h-full">
          <Skeleton variant="rect" height={175} animation="wave" />
        </div>

        <div className="flex-auto w-full h-full flex flex-col">
          <h2 className="mb-1 text-xl">
            <Skeleton width="60%" variant="text" animation="wave" />
          </h2>
          <p className="text-base mb-2">
            <Skeleton width="75%" variant="text" animation="wave" />
          </p>
          <div>
            <Skeleton width="80%" variant="text" animation="wave" />
            <br />
            <Skeleton width="75%" variant="text" animation="wave" />
          </div>

          <p className="absolute bottom-0 left-0 text-sm flex-none">
            <Skeleton width="40%" variant="text" animation="wave" />
          </p>
        </div>
      </li>
    )
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

  return articles.map(
    ({ id, slug, title, subtitle, cover, content, updatedAt }) => (
      <ArticleItem
        key={id}
        imgNeed
        showTime
        article={{
          slug,
          cover,
          title,
          subtitle,
          content,
          updatedAt: updatedAt.toDate().toLocaleDateString(),
        }}
        gutterBottom
      />
    )
  )
}

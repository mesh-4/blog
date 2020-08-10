import React from 'react'
import { Link } from '@reach/router'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Skeleton from '@material-ui/lab/Skeleton'

export const ArticleAssetList = () => {
  const [articles, loading] = useCollectionData(
    firestore()
      .collection('markdowns')
      .where('draft', '==', false)
      .orderBy('updatedAt', 'desc'),
    { idField: 'id' }
  )

  if (loading)
    return (
      <li className="assets-bar-files__inner">
        <p className="text-base m-0">
          <Skeleton animation="wave" variant="text" width="40%" />
        </p>
        <p className="text-sm mb-4">
          <Skeleton animation="wave" variant="text" />
        </p>
        <p className="text-xs m-0">
          <Skeleton animation="wave" variant="text" width="30%" />
        </p>
      </li>
    )

  if (articles.length === 0) {
    return <li>No any article.</li>
  }

  return articles.map(({ id, slug, title, subtitle, updatedAt }) => (
    <li key={id} className="assets-bar-files__inner">
      <article>
        <div className="flex flex-col flex-wrap w-full mb-4">
          <Link
            className="block w-full mb-2 text-base"
            to={`/article/${slug}`}
          >
            <h2 className="text-base font-semibold leading-normal">
              {title}
            </h2>
          </Link>
          <Link className="block text-sm w-full" to={`/article/${slug}`}>
            <p className="text-secondary font-normal">{subtitle}</p>
          </Link>
        </div>
        <p className="mt-3 mb-0 text-xs">
          lastest updated at {updatedAt.toDate().toLocaleDateString()}
        </p>
      </article>
    </li>
  ))
}

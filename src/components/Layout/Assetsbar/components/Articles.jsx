import React from 'react'
import { Link } from '@reach/router'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Skeleton from '@material-ui/lab/Skeleton'

export const ArticleAssetList = () => {
  const articles = useSelector(
    state => state.firestore.ordered.publishedArticles
  )
  useFirestoreConnect({
    collection: `markdowns`,
    where: [['draft', '==', false]],
    orderBy: [['updatedAt', 'desc']],
    storeAs: 'publishedArticles',
  })

  if (!isLoaded(articles))
    return (
      <li className="assets-bar-files__inner">
        <p style={{ fontSize: '18px', margin: 0 }}>
          <Skeleton animation="wave" variant="text" width="40%" />
        </p>
        <p style={{ fontSize: '15px', marginBottom: '18px' }}>
          <Skeleton animation="wave" variant="text" />
        </p>
        <p style={{ fontSize: '13px', margin: 0 }}>
          <Skeleton animation="wave" variant="text" width="30%" />
        </p>
      </li>
    )

  if (isEmpty(articles)) {
    return <li>No any article.</li>
  }

  return articles.map(({ id, slug, title, subtitle, updatedAt }) => (
    <li key={id} className="assets-bar-files__inner">
      <article>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '100%',
            marginBottom: '16px',
          }}
        >
          <Link
            to={`/article/${slug}`}
            style={{
              display: 'block',
              fontSize: '18px',
              width: '100%',
              lineHeight: '20px',
              marginBottom: '10px',
            }}
          >
            <h2 style={{ fontWeight: 600 }}>{title}</h2>
          </Link>
          <Link
            to={`/article/${slug}`}
            style={{
              display: 'block',
              fontSize: '14px',
              width: '100%',
            }}
          >
            <p
              style={{
                color: '#9c9c9c',
                fontWeight: 400,
              }}
            >
              {subtitle}
            </p>
          </Link>
        </div>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '13px' }}>
          lastest updated at {updatedAt.toDate().toLocaleDateString()}
        </p>
      </article>
    </li>
  ))
}

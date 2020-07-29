import React from 'react'
import { Link } from '@reach/router'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export function ArticleLastestList() {
  const articles = useSelector(state => state.firestore.ordered.recommendArticles)
  useFirestoreConnect({
    collection: `markdowns`,
    where: [['draft', '==', false]],
    orderBy: [['updatedAt', 'desc']],
    limit: 5,
    storeAs: 'recommendArticles',
  })

  if (!isLoaded(articles)) {
    return <li>loading</li>
  }

  if (isEmpty(articles)) {
    return <li>No any article.</li>
  }

  return articles.map(({ id, slug, title, subtitle }) => (
    <li key={id} style={{ marginBottom: '1em' }}>
      <article style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to={`/article/${slug}`}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 500 }}>{title}</h2>
          </Link>
          <Link to={`/article/${slug}`}>
            <p
              style={{
                color: '#9c9c9c',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              {subtitle}
            </p>
          </Link>
        </div>
      </article>
    </li>
  ))
}

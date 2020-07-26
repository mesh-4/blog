import React from 'react'
import { Link } from '@reach/router'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { firestore } from '../FirebaseProvider'

export const ArticleAssetList = () => {
  const articlesQuery = firestore
    .collection('markdowns')
    .where('draft', '==', false)
    .orderBy('updatedAt', 'desc')
  const [value, loading] = useCollectionData(articlesQuery, { idField: 'id' })

  if (loading) return <p>loading</p>

  return value.map(({ id, slug, title, subtitle, updatedAt }) => (
    <li key={id} className="assets-bar-files__inner">
      <article>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '100%',
            maxHeight: '50px',
            marginBottom: '16px',
          }}
        >
          <Link
            to={`/article/${slug}`}
            style={{ flex: '0 0 auto', fontSize: '18px' }}
          >
            <h2 className="text-ellipsis" style={{ fontWeight: 600 }}>
              {title}
            </h2>
          </Link>
          <Link to={`/article/${slug}`} style={{ fontSize: '15px' }}>
            <p
              className="text-ellipsis"
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

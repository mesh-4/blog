// TODO Published articles list
import React from 'react'
import { Link } from '@reach/router'
import { makeStyles } from '@material-ui/styles'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { firestore } from '../FirebaseProvider'

const useStyles = makeStyles(theme => ({
  base: {
    marginBottom: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export function ArticleLastestList() {
  const query = firestore
    .collection('markdowns')
    .where('draft', '==', false)
    .orderBy('updatedAt', 'desc')
    .limit(5)
  const [articles, loading] = useCollectionData(query, { idField: 'id' })

  const classes = useStyles()

  if (loading) {
    return <li>loading</li>
  }

  if (!loading && articles.length === 0) {
    return <li className={classes.base}>No any article.</li>
  }

  return articles.map(({ id, slug, title, subtitle }) => (
    <li key={id} className={classes.base}>
      <article className={classes.root} variant="outlined">
        <div className={classes.details}>
          <Link className={classes.title} to={`/article/${slug}`}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 500 }}>
              {title}
            </h2>
          </Link>
          <Link to={`/article/${slug}`}>
            <p
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#9c9c9c',
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

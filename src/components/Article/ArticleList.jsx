// TODO Published articles list
import React from 'react'
import { Link } from '@reach/router'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { firestore } from '../FirebaseProvider'

const useStyles = makeStyles(theme => ({
  base: {
    marginBottom: theme.spacing(2),
    width: '100%',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100px',
    flex: 'auto',
    width: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export function ArticleList() {
  const query = firestore
    .collection('markdowns')
    .where('draft', '==', false)
    .orderBy('updatedAt', 'desc')
  const [articles, loading] = useCollectionData(query, { idField: 'id' })

  const classes = useStyles()

  if (loading) {
    return <li>loading</li>
  }

  if (!loading && articles.length === 0) {
    return <li className={classes.base}>No any article.</li>
  }

  return articles.map(({ id, slug, title, subtitle, cover, updatedAt }) => (
    <li key={id} className={classes.base}>
      <Link
        to={`/article/${slug}`}
        style={{
          display: 'block',
          flex: 'none',
          width: '100px',
          height: '100px',
          marginRight: '1em',
          backgroundImage: `url(${cover})`,
          backgroundPosition: 'center',
          backgroundOrigin: 'border-box',
          backgroundSize: 'cover',
        }}
      />

      <article className={classes.root}>
        <div className={classes.details}>
          <Link to={`/article/${slug}`}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600 }}>
              {title}
            </h2>
          </Link>
          <Link to={`/article/${slug}`}>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 500,
                color: '#9c9c9c',
              }}
            >
              {subtitle}
            </p>
          </Link>
        </div>

        <Typography
          variant="caption"
          display="block"
          style={{ marginTop: '12px' }}
        >
          lastest updated at {updatedAt.toDate().toLocaleDateString()}
        </Typography>
      </article>
    </li>
  ))
}

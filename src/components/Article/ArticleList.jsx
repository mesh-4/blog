import React from 'react'
import { Link } from '@reach/router'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty, useFirestoreConnect } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

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
  const classes = useStyles()
  const articles = useSelector(
    state => state.firestore.ordered.publishedArticles
  )
  useFirestoreConnect({
    collection: `markdowns`,
    where: [['draft', '==', false]],
    orderBy: [['updatedAt', 'desc']],
    storeAs: 'publishedArticles',
  })

  if (!isLoaded(articles)) {
    return <div>Loading...</div>
  }

  if (isEmpty(articles)) {
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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundOrigin: 'border-box',
          backgroundImage: `url(${cover})`,
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
                color: '#9c9c9c',
                fontSize: '14px',
                fontWeight: 500,
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

import React from 'react'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty, useFirestoreConnect } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/styles'

import { ArticleItem } from './ArticleItem'

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
    <ArticleItem
      key={id}
      imgNeed
      showTime
      article={{
        slug,
        cover,
        title,
        subtitle,
        updatedAt: updatedAt.toDate().toLocaleDateString(),
      }}
      gutterBottom
    />
  ))
}

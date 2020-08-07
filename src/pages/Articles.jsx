import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Head } from '@/components/Layout/Head'
import { Footer } from '@/components/Layout/Footer'
import { ArticleList } from '@/components/Article/ArticleList'

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 100,
    marginBottom: '1em',
    fontSize: '36px',
  },
}))

export function Articles() {
  const classes = useStyles()

  return (
    <>
      <Head
        title="Articles"
        description="All articles that from Senlima's blog"
        url="https://senlima.blog/articles"
      />
      <main style={{ margin: '40px auto', width: '90%', maxWidth: '680px' }}>
        <h1 className={classes.title}>Articles</h1>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          <ArticleList />
        </ul>
      </main>
      <Footer isAbsolute={false} />
    </>
  )
}

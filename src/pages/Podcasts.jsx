import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Head } from '@/components/Layout/Head'
import { PodcastPublishList } from '@/components/Podcast/PodcastPublishList'

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 100,
    marginBottom: '1em',
    fontSize: '36px',
  },
}))

export function Podcasts() {
  const classes = useStyles()

  return (
    <>
      <Head
        title="Podcasts"
        description="包含所有由 Senlima Sun創造的 Podcast內容。"
        url="https://senlima.blog/podcasts"
      />
      <main style={{ margin: '40px auto', width: '90%', maxWidth: '680px' }}>
        <h1 className={classes.title}>Podcasts</h1>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          <PodcastPublishList />
        </ul>
      </main>
    </>
  )
}

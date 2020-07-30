import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { PodcastItem } from './PodcastItem'

const useStyles = makeStyles(theme => ({
  base: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export function PodcastList() {
  const classes = useStyles()
  const podcasts = useSelector(state => state.firestore.ordered.allPodcasts)
  useFirestoreConnect({
    collection: `audio`,
    orderBy: [['createdAt', 'desc']],
    storeAs: 'allPodcasts',
  })

  if (!isLoaded(podcasts)) return <p>loading</p>

  if (isEmpty(podcasts)) return <p>Did not found any podcast</p>

  return podcasts.map(podcast => (
    <Grid key={podcast.id} className={classes.base} item xs={12}>
      <PodcastItem audio={podcast} />
    </Grid>
  ))
}

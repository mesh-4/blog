import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { AudioItem } from './AudioItem'
import { firestore } from './FirebaseProvider'

const useStyles = makeStyles(theme => ({
  base: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export function AudioList() {
  const query = firestore.collection('audio').orderBy('createdAt', 'desc')
  const [audios, loading] = useCollectionData(query, { idField: 'id' })

  const classes = useStyles()

  if (loading) return <p>loading</p>

  return audios.map(audio => (
    <Grid key={audio.id} className={classes.base} item xs={12}>
      <AudioItem audio={audio} />
    </Grid>
  ))
}

import React, { useState } from 'react'
import { CloudUpload } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { Grid, Button, Hidden, Typography } from '@material-ui/core'

import { Head } from '@/components/Layout/Head'
import { PodcastList } from '@/components/Podcast/PodcastList'
import { PodcastCreateModal } from '@/components/Podcast/PodcastCreateModal'

const useStyles = makeStyles(theme => ({
  title: {
    paddingTop: theme.spacing(6),
  },
}))

export function Audios() {
  const classes = useStyles()
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <>
      <Head title="Podcasts" />
      <Grid container spacing={0}>
        <Hidden smDown>
          <Grid item md={1} />
        </Hidden>
        <Grid item xs={12} md={10}>
          <Typography className={classes.title} variant="h5" gutterBottom>
            Audios
          </Typography>

          <Button
            size="small"
            color="primary"
            variant="contained"
            startIcon={<CloudUpload />}
            onClick={() => setCreateOpen(true)}
          >
            Upload
          </Button>

          <PodcastList />

          <PodcastCreateModal
            open={createOpen}
            onClose={() => setCreateOpen(false)}
          />
        </Grid>
        <Hidden smDown>
          <Grid item md={1} />
        </Hidden>
      </Grid>
    </>
  )
}

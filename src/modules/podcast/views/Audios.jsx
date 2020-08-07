import React, { useState } from 'react'
import { CloudUpload } from '@material-ui/icons'
import { Grid, Button, Hidden, Typography } from '@material-ui/core'

import { PodcastList } from '../components/PodcastList'
import { PodcastCreateModal } from '../components/PodcastCreateModal'

export function Audios() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <Grid container spacing={0}>
      <Hidden smDown>
        <Grid item md={1} />
      </Hidden>
      <Grid item xs={12} md={10}>
        <Typography className="pt-8" variant="h5" gutterBottom>
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
  )
}

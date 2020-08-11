import React, { useState } from 'react'

import { MdCloudUpload } from 'react-icons/md'
import { Grid, Button, Hidden } from '@material-ui/core'

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
        <p className="pt-8 mb-4 text-3xl">Audios Manager</p>

        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<MdCloudUpload />}
          onClick={() => setCreateOpen(true)}
        >
          Upload
        </Button>

        <ul className="mt-6 list-none p-0">
          <PodcastList />
        </ul>

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

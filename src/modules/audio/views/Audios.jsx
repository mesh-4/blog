import React, { useState } from 'react'

import { MdCloudUpload } from 'react-icons/md'
import { Grid, Button } from '@material-ui/core'

import { AudioList } from '../components/AudioList'
import { AudioCreateModal } from '../components/AudioCreateModal'

export function Audios() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
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
          <AudioList />
        </ul>

        <AudioCreateModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}

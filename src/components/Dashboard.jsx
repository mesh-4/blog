import React from 'react'
import { Grid } from '@material-ui/core'

export function Dashboard() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <p className="pt-8 mb-4 text-3xl font-semibold">Dashboard</p>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}

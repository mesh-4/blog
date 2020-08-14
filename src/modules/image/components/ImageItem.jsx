import React from 'react'
import PropTypes from 'prop-types'
import { storage } from 'firebase/app'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export function ImageItem({ filename }) {
  const [value, loading] = useDownloadURL(storage().ref(`images/${filename}`))

  if (loading) {
    return (
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Skeleton height={225} animation="wave" variant="rect" />
      </Grid>
    )
  }

  return (
    <Grid
      className="relative overflow-hidden"
      style={{ height: '225px' }}
      item
      xs={12}
      md={6}
      lg={4}
      xl={3}
    >
      <div className="absolute top-0 left-0 w-full opacity-0 hover:opacity-100 bg-gray-900 flex items-center justify-center">
        {value}
      </div>
      <img
        className="h-full"
        src={value}
        alt="why you fucking need alt text. manager?"
      />
    </Grid>
  )
}

ImageItem.propTypes = {
  filename: PropTypes.string.isRequired,
}

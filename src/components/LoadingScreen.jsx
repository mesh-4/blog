import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export function LoadingScreen() {
  return (
    <CircularProgress
      color="primary"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

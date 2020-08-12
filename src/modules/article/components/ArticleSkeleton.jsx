import React from 'react'
import { Skeleton } from '@material-ui/lab'

export function ArticleSkeleton() {
  return (
    <div className="m-auto mt-12 mb-0 w-11/12 max-w-screen-sm">
      <h1 className="mt-0 mb-2">
        <Skeleton animation="wave" variant="text" />
      </h1>
      <h2>
        <Skeleton animation="wave" variant="text" style={{ width: '40%' }} />
      </h2>
    </div>
  )
}

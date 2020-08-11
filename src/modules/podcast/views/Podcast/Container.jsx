import React from 'react'
import { Outlet } from 'react-router-dom'

export function PodcastContainer() {
  return (
    <article className="m-auto mt-12 mb-0 w-11/12 max-w-screen-sm">
      <Outlet />
    </article>
  )
}

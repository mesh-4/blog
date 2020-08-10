import React from 'react'
import { Link } from '@reach/router'

export function Dashboard() {
  return (
    <div>
      <Link to="/">To main page</Link>
      <Link to="/audios">To audio page</Link>
      <Link to="/editor">To markdown page</Link>
    </div>
  )
}

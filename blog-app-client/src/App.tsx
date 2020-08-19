import React from 'react'
import { Router } from '@reach/router'

import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <Router>
      <Home path="/" />
      <NotFound default />
    </Router>
  )
}

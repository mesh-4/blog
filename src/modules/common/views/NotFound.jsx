import React from 'react'
import { Redirect } from '@reach/router'

export function NotFound() {
  return <Redirect to="/" noThrow />
}

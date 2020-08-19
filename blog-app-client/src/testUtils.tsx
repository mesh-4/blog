import React from 'react'
import { render } from '@testing-library/react'
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router'

export function renderWithRouter(
  ui: JSX.Element,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) {
  const result = render(
    <LocationProvider history={history}>{ui}</LocationProvider>
  )
  return {
    ...result,
    history,
  }
}

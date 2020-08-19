import React from 'react'
import { render } from '@testing-library/react'

import { NotFound } from './NotFound'

test('Navigate should be rendered', () => {
  const { getByText } = render(<NotFound />)

  const hintElement = getByText(/Back to home page/i)

  expect(hintElement).toBeInTheDocument()
})

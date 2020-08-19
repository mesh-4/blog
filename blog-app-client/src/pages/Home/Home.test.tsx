import React from 'react'
import { render } from '@testing-library/react'

import { Home } from './Home'

test('Should render normally', () => {
  const { getByText } = render(<Home />)

  const titleElement = getByText(/Home/i)

  expect(titleElement).toBeInTheDocument()
})

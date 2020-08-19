import React from 'react'
import { renderWithRouter } from './testUtils'
import { App } from './App'

test('show home page in Index router', async () => {
  const { container } = renderWithRouter(<App />)

  expect(container.innerHTML).toMatch('Home')
})

test('landing not found page', () => {
  const { container } = renderWithRouter(<App />, {
    route: '/nothing-at-all',
  })

  expect(
    container.getElementsByClassName('block w-full text-center mt-2')[0]
      .innerHTML
  ).toMatch('Back to home page')
})

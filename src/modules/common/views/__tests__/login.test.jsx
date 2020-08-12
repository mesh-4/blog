import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import { Login } from '../Login'

const BlankPage = () => <div>Home</div>

const setup = () => {
  const utils = render(
    <MemoryRouter initialEntries={['/', '/login']} initialIndex={1}>
      <Routes>
        <Route path="/" element={<BlankPage />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </MemoryRouter>
  )
  const emailInput = utils.getByTestId('email-input')
  const passwordInput = utils.getByTestId('password-input')
  const loginButton = utils.getByTestId('login-btn')

  return {
    emailInput,
    passwordInput,
    loginButton,
    ...utils,
  }
}

test('Title should be rendered', () => {
  const { getByText } = setup()

  const titleElement = getByText(/Welcome/i)

  expect(titleElement).toBeInTheDocument()
})

test("Both of email and password's input should work", () => {
  const { emailInput, passwordInput } = setup()

  fireEvent.change(emailInput, {
    target: { name: 'email', value: 'test@gmail.com' },
  })
  fireEvent.change(passwordInput, {
    target: { name: 'password', value: 'secret-password' },
  })

  expect(emailInput.value).toBe('test@gmail.com')
  expect(passwordInput.value).toBe('secret-password')
})

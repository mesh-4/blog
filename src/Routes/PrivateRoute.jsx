import React from 'react'
import PropTypes from 'prop-types'
import { auth } from 'firebase/app'
import { Redirect } from '@reach/router'
import { useAuthState } from 'react-firebase-hooks/auth'

export const PrivateRoute = ({ as: Component, path }) => {
  const [user, loading] = useAuthState(auth())

  return !loading && user ? (
    <Component path={path} />
  ) : (
    <Redirect to="login" noThrow />
  )
}

PrivateRoute.propTypes = {
  as: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
}

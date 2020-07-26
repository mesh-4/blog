import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from '@reach/router'
import { useFirebase } from '@/components/FirebaseProvider'

export const PrivateRoute = ({ as: Component, path }) => {
  const { user } = useFirebase()
  return user ? <Component path={path} /> : <Redirect to="login" noThrow />
}

PrivateRoute.propTypes = {
  as: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
}

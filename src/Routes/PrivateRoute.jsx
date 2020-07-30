import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from '@reach/router'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

export const PrivateRoute = ({ as: Component, path }) => {
  const auth = useSelector(state => state.firebase.auth)

  return isLoaded(auth) && !isEmpty(auth) ? (
    <Component path={path} />
  ) : (
    <Redirect to="login" noThrow />
  )
}

PrivateRoute.propTypes = {
  as: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
}

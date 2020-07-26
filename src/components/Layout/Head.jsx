import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

export function Head({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

Head.defaultProps = {
  description: '',
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

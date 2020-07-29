import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

export function Head({ title, description, cover }) {
  return (
    <Helmet>
      <title>Senlima Blog | {title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={cover} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={cover} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

Head.defaultProps = {
  description: '',
  cover: '',
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  cover: PropTypes.string,
}

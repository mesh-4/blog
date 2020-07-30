import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

export function Head({ url, type, cover, title, description }) {
  return (
    <Helmet>
      <title>Senlima Blog | {title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={cover} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:site" content={url} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={cover} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

Head.defaultProps = {
  description: '',
  cover: '',
  type: 'website',
}

Head.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  cover: PropTypes.string,
  type: PropTypes.string,
}

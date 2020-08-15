import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

export function Head({ url, type, cover, title, description }) {
  const defaultDescription =
    '18歲的 Web Engineer。紀錄網頁開發以及心路歷程等內容。不僅包含文章，也有 podcast內容'
  const defaultCover = 'https://senlima.blog/cover.png'

  if (title === 'Home') {
    return (
      <Helmet>
        <title>Senlima Sun's Blog</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Senlima Sun's Blog" />
        <meta property="og:url" content="https://senlima.blog" />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultCover} />

        <meta name="twitter:title" content="Senlima Sun's Blog" />
        <meta name="twitter:site" content="@senlima4" />
        <meta name="twitter:creator" content="@senlima4" />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultCover} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    )
  }

  if (type === 'article') {
    return (
      <Helmet>
        <title>{title} - Senlima's Blog</title>
        <meta name="description" content={description} />

        <meta property="og:type" content={type} />
        <meta property="og:title" content={`${title} - Senlima's Blog`} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={cover} />

        <meta name="twitter:title" content={`${title} - Senlima's Blog`} />
        <meta name="twitter:site" content="@senlima4" />
        <meta name="twitter:creator" content="@senlima4" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={cover} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    )
  }

  return (
    <Helmet>
      <title>Senlima Sun's Blog | {title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={cover} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:site" content="@senlima4" />
      <meta name="twitter:creator" content="@senlima4" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={cover} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

Head.defaultProps = {
  url: 'https://senlima.blog',
  title: '',
  description: '',
  cover: '',
  type: 'website',
}

Head.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  cover: PropTypes.string,
  type: PropTypes.string,
}

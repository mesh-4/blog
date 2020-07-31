import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

export function ArticleItem({ article, imgNeed, showTime, gutterBottom }) {
  return (
    <li style={{ width: '100%', marginBottom: gutterBottom ? '1em' : '0px' }}>
      <article style={{ display: 'flex', flexDirection: 'column' }}>
        {imgNeed && (
          <Link
            to={`/article/${article.slug}`}
            style={{
              display: 'block',
              flex: 'none',
              width: '100%',
              paddingTop: '52%',
              marginRight: '1em',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundOrigin: 'border-box',
              backgroundImage: `url(${article.cover})`,
            }}
          />
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '100%',
            marginBottom: '16px',
          }}
        >
          <Link
            to={`/article/${article.slug}`}
            style={{
              display: 'block',
              width: '100%',
              lineHeight: '20px',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '10px',
              }}
            >
              {article.title}
            </h2>
          </Link>
          <Link
            to={`/article/${article.slug}`}
            style={{
              display: 'block',
              width: '100%',
            }}
          >
            <p
              style={{
                color: '#9c9c9c',
                fontSize: '14px',
                fontWeight: 400,
              }}
            >
              {article.subtitle}
            </p>
          </Link>
        </div>

        {showTime && (
          <p style={{ margin: '0', fontSize: '13px' }}>
            lastest updated at {article.updatedAt}
          </p>
        )}
      </article>
    </li>
  )
}

ArticleItem.defaultProps = {
  imgNeed: false,
  showTime: false,
  gutterBottom: false,
}

ArticleItem.propTypes = {
  imgNeed: PropTypes.bool,
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    cover: PropTypes.string,
  }).isRequired,
  showTime: PropTypes.bool,
  gutterBottom: PropTypes.bool,
}

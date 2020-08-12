import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export function ArticleItem({ article, imgNeed, showTime, gutterBottom }) {
  return (
    <li className={`w-full ${gutterBottom ? 'mb-2' : 'mb-0'}`}>
      <article className="flex flex-col">
        {imgNeed && (
          <Link
            to={`/article/${article.slug}`}
            className="block flex-none w-full mb-4"
            style={{
              paddingTop: '52%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundOrigin: 'border-box',
              backgroundImage: `url(${article.cover})`,
            }}
          />
        )}

        <div className="flex flex-col flex-wrap w-full mb-4">
          <Link
            to={`/article/${article.slug}`}
            className="block w-full leading-normal"
          >
            <h2 className="mb-2 text-base font-semibold">{article.title}</h2>
          </Link>
          <Link className="block w-full" to={`/article/${article.slug}`}>
            <p className="text-sm text-secondary font-normal">
              {article.subtitle}
            </p>
          </Link>
        </div>

        {showTime && (
          <p className="m-0 text-xs">
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

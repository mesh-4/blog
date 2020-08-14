import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

export function ArticleItem({ article, imgNeed, showTime, gutterBottom }) {
  return (
    <li className={`w-full ${gutterBottom ? 'mb-4' : 'mb-0'}`}>
      <article className="flex flex-col md:flex-row items-start article-item">
        {imgNeed && (
          <Link
            to={`/article/${article.slug}`}
            className="block flex-none w-full md:w-6/12 h-40 md:h-full mb-2 md:mr-4 md:mb-0"
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundOrigin: 'border-box',
              backgroundColor: 'var(--senlima-text-secondary-color)',
              backgroundImage: `url(${article.cover})`,
            }}
          />
        )}

        <div className="relative flex-auto w-full h-full flex flex-col">
          <Link
            to={`/article/${article.slug}`}
            className="block leading-normal"
          >
            <h2 className="mb-1 text-lg md:text-xl font-semibold">
              {article.title}
            </h2>
          </Link>
          <Link className="block mb-2" to={`/article/${article.slug}`}>
            <p className="md:text-base font-normal">{article.subtitle}</p>
          </Link>
          <div className="text-secondary">
            <ResponsiveEllipsis
              maxLine="2"
              ellipsis="..."
              basedOn="letters"
              text={article.content}
              component="section"
            />
          </div>
          {showTime && (
            <p className="absolute bottom-0 left-0 text-sm flex-none">
              lastest updated at {article.updatedAt}
            </p>
          )}
        </div>
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
    content: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    cover: PropTypes.string,
  }).isRequired,
  showTime: PropTypes.bool,
  gutterBottom: PropTypes.bool,
}

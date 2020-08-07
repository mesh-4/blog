import React, { useState, Fragment } from 'react'
import { useParams } from '@reach/router'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import './index.css'
import { Head } from '@/components/Layout/Head'
import { Footer } from '@/components/Layout/Footer'
import { ShareRow } from '@/components/Article/ShareRow'
import { ArticleSkeleton } from './Skeleton'

const CodeSection = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
}

CodeSection.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export function Article() {
  const { slug } = useParams()
  const [coverLoading, updateCoverLoading] = useState(true)
  const article = useSelector(
    state => state.firestore.ordered.trackingArticle
  )
  useFirestoreConnect({
    collection: `markdowns`,
    where: [['slug', '==', slug]],
    storeAs: 'trackingArticle',
  })

  const removePlaceholder = () => {
    updateCoverLoading(false)
  }

  if (!isLoaded(article)) return <ArticleSkeleton />

  if (isEmpty(article)) return <p>Article not found</p>

  return article.map(({ title, subtitle, cover, content }) => (
    <Fragment key={slug}>
      <Head
        type="article"
        cover={cover}
        title={title}
        description={subtitle}
        url={`https://senlima.blog/article/${slug}`}
      />
      <article className="m-auto mt-12 mb-0 w-11/12 max-w-screen-sm medium-article">
        <section>
          <h1 className="article__title">{title}</h1>
          <h2 className="article__subtitle">{subtitle}</h2>
        </section>

        <ShareRow slug={slug} title={title} subtitle={subtitle} />

        <div
          className={`article__cover-loading ${coverLoading ? '' : 'end'}`}
        >
          <img
            className="article__cover-image"
            src={cover}
            width="1200px"
            alt={`${title} cover`}
            onLoad={removePlaceholder}
          />
        </div>

        <main>
          <Markdown
            source={content}
            escapeHtml={false}
            renderers={{ code: CodeSection }}
          />
        </main>

        <ShareRow slug={slug} title={title} subtitle={subtitle} />
      </article>
      <Footer freeGap isAbsolute={false} />
    </Fragment>
  ))
}

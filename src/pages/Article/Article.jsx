import React, { useState, Fragment } from 'react'
import { useParams, Link } from '@reach/router'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { FaAngleLeft } from 'react-icons/fa'
import { useMediaQuery } from '@material-ui/core'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'

import './index.css'
import { Head } from '@/components/Layout/Head'
import { Footer } from '@/components/Layout/Footer'
import { ShareRow } from '@/components/Article/ShareRow'
import { ArticleSkeleton } from './Skeleton'

SyntaxHighlighter.registerLanguage('javascript', js)

const CodeSection = ({ language, value }) => {
  // eslint-disable-next-line
  console.log(language || '')
  return (
    <SyntaxHighlighter language={language} style={dark}>
      {value}
    </SyntaxHighlighter>
  )
}

CodeSection.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export function Article() {
  const { slug } = useParams()
  const [result, loading] = useCollectionData(
    firestore().collection('markdowns').where('slug', '==', slug),
    { idField: 'id' }
  )
  const isMobile = useMediaQuery('(max-width:959px)')
  const [coverLoading, updateCoverLoading] = useState(true)

  const removePlaceholder = () => {
    updateCoverLoading(false)
  }

  if (loading) return <ArticleSkeleton />

  return result.map(({ title, subtitle, cover, content }) => (
    <Fragment key={slug}>
      <Head
        type="article"
        cover={cover}
        title={title}
        description={subtitle}
        url={`https://senlima.blog/article/${slug}`}
      />
      <article className="m-auto mt-12 mb-0 w-11/12 max-w-screen-sm medium-article">
        {isMobile && (
          <div className="mb-4 w-1/2">
            <Link className="flex items-center" to="/">
              <FaAngleLeft className="inline mr-2" />
              to home page
            </Link>
          </div>
        )}
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

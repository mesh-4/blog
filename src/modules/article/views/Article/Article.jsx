import React, { useState, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { FaAngleLeft } from 'react-icons/fa'
import { useMediaQuery } from '@material-ui/core'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

import './index.css'
import { Head } from '@components/seo/Head'
import { Footer } from '@components/seo/Footer'

import { ShareRow } from '@article/components/ShareRow'
import { ArticleSkeleton } from '@article/components/ArticleSkeleton'

SyntaxHighlighter.registerLanguage('javascript', js)

const CodeSection = ({ language, value }) => {
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
      {isMobile && (
        <div className="mb-4 w-1/2">
          <Link className="flex items-center" to="/">
            <FaAngleLeft className="inline mr-2" />
            to home page
          </Link>
        </div>
      )}
      <section>
        <h1 className="mt-0 mb-1 text-xl">{title}</h1>
        <h2 className="mt-0 text-secondary text-lg font-light leading-normal break-words">
          {subtitle}
        </h2>
      </section>

      <ShareRow slug={slug} title={title} subtitle={subtitle} />

      <div className={`article__cover-loading ${coverLoading ? '' : 'end'}`}>
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
      <Footer freeGap isAbsolute={false} />
    </Fragment>
  ))
}

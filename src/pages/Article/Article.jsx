import React, { useState, Fragment } from 'react'
import { useParams } from '@reach/router'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import './index.css'
import { Head } from '@/components/Layout/Head'
import { ShareRow } from '@/components/Article/ShareRow'
import { ArticleSkeleton } from './Skeleton'

export function Article() {
  const { slug } = useParams()
  const [coverLoading, updateCoverLoading] = useState(true)
  const article = useSelector(state => state.firestore.ordered.trackingArticle)
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
      <article
        className="medium-article"
        style={{ margin: '40px auto', width: '90%', maxWidth: '680px' }}
      >
        <section>
          <h1 className="article__title">{title}</h1>
          <h2 className="article__subtitle">{subtitle}</h2>
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
          <Markdown source={content} escapeHtml={false} />
        </main>

        <ShareRow slug={slug} title={title} subtitle={subtitle} />
      </article>
    </Fragment>
  ))
}

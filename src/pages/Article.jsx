import React, { useRef, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { TwitterShareButton, LinkedinShareButton } from 'react-share'
import { makeStyles } from '@material-ui/styles'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedinIcon from '@material-ui/icons/LinkedIn'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import '@/css/markdown.css'
import { Head } from '@/components/Layout/Head'

const useStyles = makeStyles(theme => ({
  shareArea: {
    margin: theme.spacing(1, 0),
  },
}))

export function Article({ slug }) {
  const classes = useStyles()
  const imgLoadRef = useRef()
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

  if (!isLoaded(article)) return <p>loading</p>

  return article.map(({ title, subtitle, cover, content }) => (
    <Fragment key={slug}>
      <Head title={title} description={subtitle} cover={cover} />
      <article
        className="medium-article"
        style={{ margin: '40px auto', width: '90%', maxWidth: '680px' }}
      >
        <section>
          <h1 className="markdown-article__title">{title}</h1>
          <h2 className="markdown-article__subtitle">{subtitle}</h2>
        </section>

        <aside className={classes.shareArea}>
          <TwitterShareButton
            url={`http://senlima.blog/article/${slug}`}
            title={title}
            via="senlima4"
            style={{ marginRight: '1em' }}
          >
            <TwitterIcon />
          </TwitterShareButton>
          <LinkedinShareButton
            url={`http://senlima.blog/article/${slug}`}
            title={title}
            summary={subtitle}
            style={{ marginRight: '1em' }}
          >
            <LinkedinIcon />
          </LinkedinShareButton>
          <a
            rel="noreferrer"
            target="_blank"
            title="Support link"
            aria-label="Senlima's support link"
            href="https://www.buymeacoffee.com/senlima"
          >
            <MonetizationOnIcon />
          </a>
        </aside>

        <div
          ref={imgLoadRef}
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '52%',
            marginBottom: '2em',
            backgroundColor: coverLoading ? '#c2c2c2' : 'transparent',
          }}
        >
          <img
            onLoad={removePlaceholder}
            src={cover}
            alt={`${title} cover`}
            width="1200px"
            style={{
              position: 'absolute',
              top: 0,
              display: 'block',
              width: '100%',
            }}
          />
        </div>

        <main>
          <Markdown source={content} escapeHtml={false} />
        </main>

        <aside className={classes.shareArea}>
          <TwitterShareButton
            url={`http://senlima.blog/article/${slug}`}
            title={title}
            via="senlima4"
            style={{ marginRight: '1em' }}
          >
            <TwitterIcon />
          </TwitterShareButton>
          <LinkedinShareButton
            url={`http://senlima.blog/article/${slug}`}
            title={title}
            summary={subtitle}
            style={{ marginRight: '1em' }}
          >
            <LinkedinIcon />
          </LinkedinShareButton>
          <a
            rel="noreferrer"
            target="_blank"
            title="Support link"
            aria-label="Senlima's support link"
            href="https://www.buymeacoffee.com/senlima"
          >
            <MonetizationOnIcon />
          </a>
        </aside>
      </article>
    </Fragment>
  ))
}

Article.defaultProps = {
  slug: '',
}

Article.propTypes = {
  slug: PropTypes.string,
}

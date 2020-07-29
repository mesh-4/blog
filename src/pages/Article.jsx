import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { TwitterShareButton, LinkedinShareButton } from 'react-share'
import { makeStyles } from '@material-ui/styles'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedinIcon from '@material-ui/icons/LinkedIn'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import '@/css/markdown.css'

const useStyles = makeStyles(theme => ({
  shareArea: {
    margin: theme.spacing(1, 0),
  },
}))

export function Article({ slug }) {
  const classes = useStyles()
  const imgLoadRef = useRef()
  const { title, subtitle, cover, content } = useSelector(
    ({
      firestore: {
        ordered: { publishedArticles },
      },
    }) => publishedArticles.filter(target => target.slug === slug)[0]
  )

  const removePlaceholder = () => {
    imgLoadRef.current.remove()
  }

  return (
    <>
      <Helmet>
        <title>Senlima Blog | {title}</title>
        <meta name="description" content={subtitle} />
      </Helmet>
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
            width: '100%',
            paddingTop: '52%',
            backgroundColor: '#c2c2c2',
          }}
        />
        <img
          onLoad={removePlaceholder}
          src={cover}
          alt={`${title} cover`}
          width="1200px"
          style={{
            display: 'block',
            margin: '10px 0',
            width: '100%',
          }}
        />

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
    </>
  )
}

Article.defaultProps = {
  slug: '',
}

Article.propTypes = {
  slug: PropTypes.string,
}

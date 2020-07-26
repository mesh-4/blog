import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Markdown from 'react-markdown'
import { TwitterShareButton, LinkedinShareButton } from 'react-share'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { makeStyles } from '@material-ui/styles'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedinIcon from '@material-ui/icons/LinkedIn'

import '@/css/markdown.css'
import { firestore } from '@/components/FirebaseProvider'

const useStyles = makeStyles(theme => ({
  shareArea: {
    margin: theme.spacing(1, 0),
  },
}))

export function Article({ slug }) {
  const query = firestore.collection('markdowns').where('slug', '==', slug)
  const [article, loading, error] = useCollectionData(query, { idField: 'id' })

  const classes = useStyles()

  if (loading) return <p>loading</p>

  if (error) return <p>Error occurred</p>

  return (
    <>
      <Helmet>
        <title>Senlima Blog | {article[0].title}</title>
        <meta name="description" content={article[0].subtitle} />
      </Helmet>
      <article
        className="medium-article"
        style={{ margin: '40px auto', width: '90%', maxWidth: '680px' }}
      >
        <section>
          <h1 className="markdown-article__title">{article[0].title}</h1>
          <h2 className="markdown-article__subtitle">{article[0].subtitle}</h2>
        </section>

        <aside className={classes.shareArea}>
          <TwitterShareButton
            url={`http://senlima.blog/article/${slug}`}
            title={article[0].title}
            via="senlima4"
            style={{ marginRight: '1em' }}
          >
            <TwitterIcon />
          </TwitterShareButton>
          <LinkedinShareButton
            url={`http://senlima.blog/article/${slug}`}
            title={article[0].title}
            summary={article[0].subtitle}
          >
            <LinkedinIcon />
          </LinkedinShareButton>
        </aside>

        <img
          src={article[0].cover}
          alt={`${article[0].title} cover`}
          style={{
            display: 'block',
            margin: '10px 0',
            width: '100%',
            backgroundColor: '#c2c2c2',
          }}
        />

        <main>
          <Markdown source={article[0].content} escapeHtml={false} />
        </main>

        <aside className={classes.shareArea}>
          <TwitterShareButton
            url={`http://senlima.blog/article/${slug}`}
            title={article[0].title}
            via="senlima4"
            style={{ marginRight: '1em' }}
          >
            <TwitterIcon />
          </TwitterShareButton>
          <LinkedinShareButton
            url={`http://senlima.blog/article/${slug}`}
            title={article[0].title}
            summary={article[0].subtitle}
          >
            <LinkedinIcon />
          </LinkedinShareButton>
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

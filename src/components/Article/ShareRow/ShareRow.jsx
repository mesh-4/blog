import React from 'react'
import PropTypes from 'prop-types'
import { TwitterShareButton, LinkedinShareButton } from 'react-share'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedinIcon from '@material-ui/icons/LinkedIn'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

export function ShareRow({ slug, title, subtitle }) {
  return (
    <div style={{ margin: '1em 0' }}>
      <TwitterShareButton
        via="senlima4"
        title={title}
        url={`http://senlima.blog/article/${slug}`}
        style={{ marginRight: '1em' }}
      >
        <TwitterIcon />
      </TwitterShareButton>
      <LinkedinShareButton
        title={title}
        summary={subtitle}
        url={`http://senlima.blog/article/${slug}`}
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
    </div>
  )
}

ShareRow.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

import React from 'react'
import PropTypes from 'prop-types'
import { TwitterShareButton, LinkedinShareButton } from 'react-share'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedinIcon from '@material-ui/icons/LinkedIn'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

export function ShareRow({ slug, title, subtitle }) {
  return (
    <div className="my-4">
      <TwitterShareButton
        className="mr-4"
        via="senlima4"
        title={title}
        url={`http://senlima.blog/article/${slug}`}
      >
        <TwitterIcon />
      </TwitterShareButton>
      <LinkedinShareButton
        className="mr-4"
        title={title}
        summary={subtitle}
        url={`http://senlima.blog/article/${slug}`}
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

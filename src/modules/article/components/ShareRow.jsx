import React from 'react'
import PropTypes from 'prop-types'
import { TwitterShareButton, LinkedinShareButton } from 'react-share'
import { FaTwitter, FaLinkedin, FaHandHoldingUsd } from 'react-icons/fa'

export function ShareRow({ slug, title, subtitle }) {
  return (
    <div className="my-4 flex items-center justify-start">
      <TwitterShareButton
        className="mr-6"
        via="senlima4"
        title={title}
        url={`http://senlima.blog/article/${slug}`}
      >
        <FaTwitter className="w-6 h-6" />
      </TwitterShareButton>
      <LinkedinShareButton
        className="mr-6"
        title={title}
        summary={subtitle}
        url={`http://senlima.blog/article/${slug}`}
      >
        <FaLinkedin className="w-6 h-6" />
      </LinkedinShareButton>
      <a
        rel="noreferrer"
        target="_blank"
        title="Support link"
        aria-label="Senlima's support link"
        href="https://www.buymeacoffee.com/senlima"
      >
        <FaHandHoldingUsd className="w-6 h-6" />
      </a>
    </div>
  )
}

ShareRow.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

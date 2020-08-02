import React from 'react'
import PropTypes from 'prop-types'

export function Footer({ isAbsolute }) {
  return (
    <footer
      style={{
        position: isAbsolute ? 'absolute' : 'relative',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <p style={{ textAlign: 'center' }}>
        Copyright © {new Date().getFullYear()} Senlima Sun All Rights Reserved
      </p>
    </footer>
  )
}

Footer.defaultProps = {
  isAbsolute: true,
}

Footer.propTypes = {
  isAbsolute: PropTypes.bool,
}

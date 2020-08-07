import React from 'react'
import PropTypes from 'prop-types'

export function Footer({ isAbsolute, freeGap }) {
  return (
    <footer
      className={`w-full ${isAbsolute ? 'absolute bottom-0' : 'relative'} ${
        freeGap ? 'py-8' : 'py-3'
      }`}
      style={
        isAbsolute
          ? {
              left: '50%',
              transform: 'translateX(-50%)',
            }
          : {}
      }
    >
      <p className="text-center">
        Copyright © {new Date().getFullYear()} Senlima Sun All Rights Reserved
      </p>
    </footer>
  )
}

Footer.defaultProps = {
  freeGap: false,
  isAbsolute: true,
}

Footer.propTypes = {
  freeGap: PropTypes.bool,
  isAbsolute: PropTypes.bool,
}

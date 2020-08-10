import React from 'react'
import PropTypes from 'prop-types'
import { useRecoilValue } from 'recoil'
import { useLocation } from '@reach/router'
import { useMediaQuery } from '@material-ui/core'

import { playerAtom } from '@/store'
import { Assetsbar } from './Assetsbar'
import { PodcastPlayer } from './PodcastPlayer'

export function Container({ children }) {
  const location = useLocation()
  const player = useRecoilValue(playerAtom)
  const isMobile = useMediaQuery('(max-width:959px)')

  return (
    <>
      <div
        className={`relative w-full h-screen overflow-hidden ${
          isMobile ? 'block' : 'grid'
        }`}
        style={{
          gridTemplateRows: '100%',
          gridTemplateColumns: 'auto 375px',
        }}
      >
        {children &&
          React.cloneElement(children, {
            className:
              'relative w-full h-full overflow-x-hidden overflow-y-scroll bg-dark',
            children: React.Children.map(children.props.children, child => {
              return React.cloneElement(child)
            }),
          })}

        {isMobile ? (
          location.pathname === '/' && (
            <div className="absolute top-0 left-0 z-50 w-screen">
              <Assetsbar />
            </div>
          )
        ) : (
          <Assetsbar />
        )}
      </div>
      {player.url && <PodcastPlayer />}
    </>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

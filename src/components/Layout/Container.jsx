import React from 'react'
import PropTypes from 'prop-types'
import { useRecoilValue } from 'recoil'
import { useLocation } from '@reach/router'
import { makeStyles } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'

import { playerAtom } from '@/store'
import { Assetsbar } from './Assetsbar'
import { PodcastPlayer } from './PodcastPlayer'

const useStyles = makeStyles(theme => ({
  content: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: 'auto 375px',
    [theme.breakpoints.down(960)]: {
      display: 'block',
    },
  },
}))

export function Container({ children }) {
  const location = useLocation()
  const player = useRecoilValue(playerAtom)

  // TODO window.matchMedia
  const isMobile = useMediaQuery('(max-width:959px)')
  const classes = useStyles()

  if (isMobile) {
    return (
      <>
        <div className={classes.content}>
          {children &&
            React.cloneElement(children, {
              className: 'router-wrapper',
              children: React.Children.map(children.props.children, child => {
                return React.cloneElement(child)
              }),
            })}
          {location.pathname === '/' && (
            <div className="absolute top-0 left-0 z-50 w-screen">
              <Assetsbar />
            </div>
          )}
        </div>
        {player.url && <PodcastPlayer />}
      </>
    )
  }

  return (
    <>
      <div className={classes.content}>
        {children &&
          React.cloneElement(children, {
            className: 'router-wrapper',
            children: React.Children.map(children.props.children, child => {
              return React.cloneElement(child)
            }),
          })}
        <Assetsbar />
      </div>
      {player.url && <PodcastPlayer />}
    </>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

import React from 'react'
import PropTypes from 'prop-types'
import { useRecoilValue } from 'recoil'
import { makeStyles } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'

import { playerAtom } from '@/store'
import { Navbar } from './Navbar'
import { NavbarBottom } from './NavbarBottom'
import { Assetsbar } from './Assetsbar'
import { AudioPlayer } from '../AudioPlayer'

const useStyles = makeStyles(theme => ({
  content: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: 'auto 315px 60px',
    [theme.breakpoints.down(960)]: {
      gridTemplateRows: 'auto 60px',
      gridTemplateColumns: '100%',
    },
  },
}))

export function Container({ children }) {
  const player = useRecoilValue(playerAtom)
  const isMobile = useMediaQuery('(max-width:959px)')
  const classes = useStyles()

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
        {isMobile ? (
          <NavbarBottom />
        ) : (
          <>
            <Assetsbar />
            <Navbar />
          </>
        )}
      </div>
      {player.url && <AudioPlayer />}
    </>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

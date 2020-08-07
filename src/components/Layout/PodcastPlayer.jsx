import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import PlayerBase from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/HighlightOff'

import { playerAtom } from '@/store'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    right: '385px',
    bottom: '2.5vh',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    outline: 'none',
    flexWrap: 'wrap',
    width: '300px',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.divider}`,
    background: '#161616',
    zIndex: 5,
    [theme.breakpoints.down(960)]: {
      right: 0,
      bottom: '60px',
      borderRadius: 0,
      width: '100vw',
      border: 'none',
    },
  },
}))

export function PodcastPlayer() {
  const [player, setPlayer] = useRecoilState(playerAtom)
  const [volume, setVolume] = useState(1.0)
  const classes = useStyles()

  const handleVolumeChange = e => {
    setVolume(e.target.volume)
  }

  const handlePlayerClear = () => {
    setPlayer({
      title: '',
      url: '',
    })
  }

  return (
    <aside className={classes.paper}>
      <div
        style={{
          width: '100%',
          padding: '15px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span className="w-full flex-auto mr-1 text-lg truncate">
          {player.title}
        </span>

        <IconButton
          className="flex-none p-0 w-4"
          size="small"
          onClick={handlePlayerClear}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <PlayerBase
        className="outline-none"
        src={player.url}
        volume={volume}
        preload="metadata"
        showJumpControls={false}
        onVolumeChange={handleVolumeChange}
      />
    </aside>
  )
}

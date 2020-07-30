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
    borderRadius: '8px',
    outline: 'none',
    flexWrap: 'wrap',
    width: '300px',
    border: `1px solid ${theme.palette.divider}`,
    zIndex: 5,
  },
  player: {
    outline: 'none',
  },
  title: {
    flex: 'auto',
    width: '100%',
    textOverflow: 'ellipsis',
    marginRight: theme.spacing(1),
  },
  closeBtn: {
    padding: 0,
    flex: 'none',
    width: '24px',
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
        <span className={classes.title}>{player.title}</span>
        <IconButton className={classes.closeBtn} size="small" onClick={handlePlayerClear}>
          <CloseIcon />
        </IconButton>
      </div>
      <PlayerBase
        className={classes.player}
        src={player.url}
        volume={volume}
        preload="metadata"
        showJumpControls={false}
        onVolumeChange={handleVolumeChange}
      />
    </aside>
  )
}

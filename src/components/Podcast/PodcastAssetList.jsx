import React from 'react'
import { useSetRecoilState } from 'recoil'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { IconButton, Typography } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'

import '@/css/assetsbar.css'
import { playerAtom } from '@/store'
import { firestore } from '../FirebaseProvider'

export function PodcastAssetList() {
  const query = firestore
    .collection('audio')
    .where('draft', '==', false)
    .orderBy('createdAt', 'desc')
  const [podcasts, loading, error] = useCollectionData(query, {
    idField: 'id',
  })
  const setPlayerUrl = useSetRecoilState(playerAtom)

  if (error) return <p>error</p>

  if (loading) return <p>loading</p>

  return podcasts.map(({ id, url, title, description, createdAt }) => (
    <li key={id} className="assets-bar-files__inner">
      <div className="assets-bar-audio__inner-header">
        <h2>{title}</h2>

        <IconButton
          size="small"
          aria-label="play"
          onClick={() => setPlayerUrl({ title, url })}
        >
          <PlayCircleFilledIcon />
        </IconButton>
      </div>
      <Typography variant="body2" display="block" gutterBottom>
        {description}
      </Typography>
      <Typography variant="caption" display="block">
        created at {createdAt.toDate().toLocaleDateString()}
      </Typography>
    </li>
  ))
}

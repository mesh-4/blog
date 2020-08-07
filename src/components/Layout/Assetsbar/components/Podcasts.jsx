import React from 'react'
import { useSetRecoilState } from 'recoil'
import LinesEllipsis from 'react-lines-ellipsis'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { IconButton } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'

import { playerAtom } from '@/store'

export function PodcastAssetList() {
  const setPlayerUrl = useSetRecoilState(playerAtom)
  const [podcasts, loading] = useCollectionData(
    firestore()
      .collection('audio')
      .where('draft', '==', false)
      .orderBy('createdAt', 'desc'),
    {
      idField: 'id',
    }
  )

  if (loading) {
    return (
      <li className="assets-bar-files__inner">
        <p className="text-base m-0">
          <Skeleton animation="wave" variant="text" width="40%" />
        </p>
        <p className="text-sm mb-4">
          <Skeleton animation="wave" variant="text" />
        </p>
        <p className="text-xs m-0">
          <Skeleton animation="wave" variant="text" width="30%" />
        </p>
      </li>
    )
  }

  if (podcasts.length === 0) {
    return <li>No any podcast.</li>
  }

  return podcasts.map(({ id, url, title, description, createdAt }) => (
    <li key={id} className="assets-bar-files__inner">
      <div
        className="w-full flex items-center justify-between mb-0 text-primary"
        style={{ height: '24px' }}
      >
        <h2 className="text-base">{title}</h2>

        <IconButton
          size="small"
          aria-label="play"
          onClick={() => setPlayerUrl({ title, url })}
        >
          <PlayCircleFilledIcon />
        </IconButton>
      </div>
      <LinesEllipsis
        className="mb-3"
        maxLine="2"
        ellipsis="..."
        basedOn="letters"
        text={description}
        component="section"
      />
      <p className="m-0 text-xs">
        created at {createdAt.toDate().toLocaleDateString()}
      </p>
    </li>
  ))
}

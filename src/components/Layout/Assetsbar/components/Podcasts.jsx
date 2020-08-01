import React from 'react'
import { useSelector } from 'react-redux'
import { useSetRecoilState } from 'recoil'
import LinesEllipsis from 'react-lines-ellipsis'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Skeleton from '@material-ui/lab/Skeleton'
import { IconButton } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'

import { playerAtom } from '@/store'

export function PodcastAssetList() {
  const setPlayerUrl = useSetRecoilState(playerAtom)
  const podcasts = useSelector(
    state => state.firestore.ordered.publishedPodcasts
  )
  useFirestoreConnect({
    collection: `audio`,
    where: [['draft', '==', false]],
    orderBy: [['createdAt', 'desc']],
    storeAs: 'publishedPodcasts',
  })

  if (!isLoaded(podcasts)) {
    return (
      <li className="assets-bar-files__inner">
        <p style={{ fontSize: '18px', margin: 0 }}>
          <Skeleton animation="wave" variant="text" width="40%" />
        </p>
        <p style={{ fontSize: '15px', marginBottom: '18px' }}>
          <Skeleton animation="wave" variant="text" />
        </p>
        <p style={{ fontSize: '13px', margin: 0 }}>
          <Skeleton animation="wave" variant="text" width="30%" />
        </p>
      </li>
    )
  }

  if (isEmpty(podcasts)) {
    return <li>No any article.</li>
  }

  return podcasts.map(({ id, url, title, description, createdAt }) => (
    <li key={id} className="assets-bar-files__inner">
      <div className="assets-bar-audio__inner-header">
        <h2 style={{ height: '18px' }}>{title}</h2>

        <IconButton
          size="small"
          aria-label="play"
          onClick={() => setPlayerUrl({ title, url })}
        >
          <PlayCircleFilledIcon />
        </IconButton>
      </div>
      <LinesEllipsis
        maxLine="2"
        ellipsis="..."
        basedOn="letters"
        text={description}
        component="section"
      />
      <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '13px' }}>
        created at {createdAt.toDate().toLocaleDateString()}
      </p>
    </li>
  ))
}

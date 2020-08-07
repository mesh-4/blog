import React from 'react'
import { useSetRecoilState } from 'recoil'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { IconButton } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'

import { playerAtom } from '@/store'

export function PodcastPublishList() {
  const setPlayerUrl = useSetRecoilState(playerAtom)
  const [podcasts, loading] = useCollectionData(
    firestore()
      .collection('audio')
      .where('draft', '==', false)
      .orderBy('createdAt', 'desc'),
    { idField: 'id' }
  )

  if (loading) return <p>loading</p>

  if (podcasts.length === 0) return <p>Did not found any podcast</p>

  return podcasts.map(({ id, url, title, description, createdAt }) => (
    <li
      key={id}
      style={{
        width: '100%',
        padding: '1em 0px',
        borderBottom: '1px solid #c5c5c5',
        fontSize: '14px',
        fontWeight: 300,
        color: '#f8f8f8',
      }}
    >
      <div className="assets-bar-audio__inner-header">
        <h2 style={{ height: '18px', fontSize: '18px' }}>{title}</h2>

        <IconButton
          size="small"
          aria-label="play"
          onClick={() => setPlayerUrl({ title, url })}
        >
          <PlayCircleFilledIcon />
        </IconButton>
      </div>
      <p style={{ margin: 0, marginBottom: '16px' }}>{description}</p>
      <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '13px' }}>
        created at {createdAt.toDate().toLocaleDateString()}
      </p>
    </li>
  ))
}

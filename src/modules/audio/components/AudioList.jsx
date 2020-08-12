import React from 'react'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { AudioItem } from './AudioItem'

export function AudioList() {
  const [podcasts, loading] = useCollectionData(
    firestore().collection('audio').orderBy('createdAt', 'desc'),
    {
      idField: 'id',
    }
  )

  if (loading) return <p>loading</p>

  if (podcasts.length === 0) return <p>Did not found any podcast</p>

  return podcasts.map(podcast => (
    <li
      key={podcast.id}
      className="mt-3 mb-3 border-b border-solid border-primary"
    >
      <AudioItem audio={podcast} />
    </li>
  ))
}

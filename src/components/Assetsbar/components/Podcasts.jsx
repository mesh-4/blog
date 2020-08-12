import React from 'react'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { firestore } from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Skeleton from '@material-ui/lab/Skeleton'
import { MdPlayArrow, MdArrowUpward } from 'react-icons/md'

import { playerAtom } from '@/store'

export function PodcastAssetList() {
  const navigate = useNavigate()
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
      <li className="mx-auto py-4 w-10/12 flex items-center justify-between">
        <Skeleton animation="wave" variant="rect" width="100%" height={20} />
      </li>
    )
  }

  if (podcasts.length === 0) {
    return <li>No any podcast.</li>
  }

  return podcasts.map(({ id, url, title }, index) => (
    <li
      key={id}
      className={`mx-auto py-4 w-10/12 flex items-center justify-between text-primary ${
        index === podcasts.length - 1 ? '' : 'border-b'
      } border-solid border-gray-400`}
    >
      <div className="w-20 flex items-center justify-start">
        <MdArrowUpward
          className="mr-6 text-xl transform -rotate-45 cursor-pointer"
          title="See more"
          aria-label={`see more information about ${title}`}
          onClick={() => navigate(`/podcast/${id}`)}
        />
        <MdPlayArrow
          className="text-xl cursor-pointer"
          title="Play"
          aria-label={`play ${title}`}
          onClick={() => setPlayerUrl({ title, url })}
        />
      </div>

      <h2 className="text-sm font-semibold">{title}</h2>
    </li>
  ))
}

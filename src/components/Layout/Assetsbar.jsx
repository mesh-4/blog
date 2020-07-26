import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { IconButton, Typography } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'

import '@/css/assetsbar.css'
import { playerAtom } from '@/store'
import { ArticleAssetList } from '@/components/Article/ArticleAssetList'
import { firestore } from '../FirebaseProvider'

const PodcastsList = () => {
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

export const Assetsbar = () => {
  const [genre, setGenre] = useState('Articles')

  const handleGenreSwitch = target => {
    setGenre(target)
  }

  const genreList = [
    {
      title: 'Articles',
      Source: ArticleAssetList,
    },
    {
      title: 'Podcasts',
      Source: PodcastsList,
    },
    {
      title: 'Series',
      Source: 'comming soon',
    },
  ]

  const genreOptionsRender = () => {
    return genreList.map(({ title }) => (
      <button
        key={title}
        className={`assets-bar-select__option ${
          genre === title ? 'activate' : ''
        }`}
        type="button"
        disabled={genre === title}
        onClick={() => handleGenreSwitch(title)}
      >
        {title}
      </button>
    ))
  }

  return (
    <div className="assets-bar__base">
      <div className="assets-bar-select__base">{genreOptionsRender()}</div>
      <ul className="assets-bar-files__base">
        {genreList.map(({ title, Source }) => {
          if (genre === title && title === 'Series')
            return <p key={`${title}-list`}>Comming soon</p>
          return genre === title && <Source key={`${title}-list`} />
        })}
      </ul>
    </div>
  )
}

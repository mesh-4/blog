import React from 'react'
import { useRecoilState } from 'recoil'

import './index.css'
import { assetsbarState } from '@/store'
import { Profile } from './components/Profile'
import { ArticleAssetList } from './components/Articles'
import { PodcastAssetList } from './components/Podcasts'

const genreList = [
  {
    title: 'Articles',
    Source: ArticleAssetList,
  },
  {
    title: 'Podcasts',
    Source: PodcastAssetList,
  },
  {
    title: 'Series',
    Source: 'comming soon',
  },
]

export const Assetsbar = () => {
  const [genre, setGenre] = useRecoilState(assetsbarState)

  const handleGenreSwitch = target => {
    setGenre(target)
  }

  return (
    <div className="assets-bar__base">
      <Profile />

      <div className="assets-bar-select__base">
        {genreList.map(({ title }) => (
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
        ))}
      </div>

      <ul className="assets-bar-files__base">
        {genreList.map(({ title, Source }) => {
          if (genre === title && title === 'Series')
            return (
              <p
                key={`${title}-list`}
                style={{ width: '90%', margin: '1em 5%' }}
              >
                Comming soon
              </p>
            )
          return genre === title && <Source key={`${title}-list`} />
        })}
      </ul>
    </div>
  )
}

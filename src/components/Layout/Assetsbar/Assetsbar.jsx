import React, { useState } from 'react'

import './index.css'
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
  const [genre, setGenre] = useState('Articles')

  const handleGenreSwitch = target => {
    setGenre(target)
  }

  return (
    <div className="assets-bar__base">
      <div className="assets-bar-select__base">
        {genreList.map(({ title }) => (
          <button
            key={title}
            className={`assets-bar-select__option ${genre === title ? 'activate' : ''}`}
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
            return <p key={`${title}-list`}>Comming soon</p>
          return genre === title && <Source key={`${title}-list`} />
        })}
      </ul>
    </div>
  )
}

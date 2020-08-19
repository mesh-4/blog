import React from 'react'
import { css } from '@emotion/core'
import { Link } from '@reach/router'

interface PodcastSerieProps {
  to: string
  name: string
  imageUrl: string
}

export function PodcastSerie({ to, name, imageUrl }: PodcastSerieProps) {
  return (
    <Link
      to={to}
      css={css`
        width: 100%;
        height: 100%;
        border-radius: '';
        background-size: 'cover';
        background-color: '#030303';
        background-position: 'center';
        background-image: url(${imageUrl});
      `}
    >
      {name}
    </Link>
  )
}

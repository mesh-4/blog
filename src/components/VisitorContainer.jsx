import React from 'react'
import { useRecoilValue } from 'recoil'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'

import { playerAtom } from '@/store'
import { PodcastPlayer } from '@podcast/components/PodcastPlayer'
import { Assetsbar } from './Assetsbar'

export function VisitorContainer() {
  const player = useRecoilValue(playerAtom)
  const isMobile = useMediaQuery('(max-width:959px)')

  return (
    <>
      <div
        className={`relative w-full h-screen overflow-hidden ${
          isMobile ? 'block' : 'grid'
        }`}
        style={{
          gridTemplateRows: '100%',
          gridTemplateColumns: 'auto 375px',
        }}
      >
        <div className="relative w-full h-full overflow-x-hidden overflow-y-scroll bg-dark">
          <Outlet />
        </div>

        {!isMobile && <Assetsbar />}
      </div>
      {player.url && <PodcastPlayer />}
    </>
  )
}

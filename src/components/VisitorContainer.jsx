import React from 'react'
import { useRecoilValue } from 'recoil'
import { Outlet } from 'react-router-dom'

import { playerAtom } from '@/store'
import { PodcastPlayer } from '@podcast/components/PodcastPlayer'

export function VisitorContainer() {
  const player = useRecoilValue(playerAtom)
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <div className="relative w-full h-full overflow-x-hidden overflow-y-scroll bg-dark">
          <Outlet />
        </div>
      </div>
      {player.url && <PodcastPlayer />}
    </>
  )
}

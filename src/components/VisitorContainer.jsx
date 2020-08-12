import React from 'react'
import { Outlet } from 'react-router-dom'

export function VisitorContainer() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full overflow-x-hidden overflow-y-scroll bg-dark">
        <Outlet />
      </div>
    </div>
  )
}

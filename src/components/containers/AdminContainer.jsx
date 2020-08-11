import React from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '../Sidebar'

export function AdminContainer() {
  return (
    <>
      <div
        className="relative w-full h-screen overflow-hidden grid"
        style={{
          gridTemplateRows: '100%',
          gridTemplateColumns: 'auto 60px',
        }}
      >
        <div className="relative w-full h-full overflow-x-hidden overflow-y-scroll bg-dark1">
          <Outlet />
        </div>
        <Sidebar />
      </div>
    </>
  )
}

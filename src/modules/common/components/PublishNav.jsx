import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  MdHome,
  MdLibraryBooks,
  MdLibraryMusic,
  MdPhotoLibrary,
} from 'react-icons/md'

export function PublishNav() {
  return (
    <nav className="w-40 h-6 flex items-center justify-between">
      <NavLink
        className="text-primary text-lg hover:text-theme-primary"
        to="/"
      >
        <MdHome />
      </NavLink>
      <NavLink
        className="text-primary text-lg hover:text-theme-primary"
        activeClassName="text-theme-primary"
        to="/articles"
      >
        <MdLibraryBooks />
      </NavLink>
      <NavLink
        className="text-primary text-lg hover:text-theme-primary"
        activeClassName="text-theme-primary"
        to="/podcasts"
      >
        <MdLibraryMusic />
      </NavLink>
      <NavLink
        className="text-secondary text-lg pointer-events-none"
        to="/tutorials"
      >
        <MdPhotoLibrary />
      </NavLink>
    </nav>
  )
}

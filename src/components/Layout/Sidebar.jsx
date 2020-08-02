import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import EditIcon from '@material-ui/icons/Edit'
import SearchIcon from '@material-ui/icons/Search'
import GraphicEqIcon from '@material-ui/icons/GraphicEq'

import '@/css/sidebar.css'

export const routes = [
  {
    path: '/',
    name: 'Home',
    icon: HomeIcon,
    public: true,
  },
  {
    path: '/about',
    name: 'About',
    icon: InfoIcon,
    public: true,
  },
  {
    path: '/search',
    name: 'Search',
    icon: SearchIcon,
    public: true,
  },
  {
    path: '/editor',
    name: 'Editor',
    icon: EditIcon,
    public: false,
  },
  {
    path: '/audios',
    name: 'Audios',
    icon: GraphicEqIcon,
    public: false,
  },
]

export function Sidebar() {
  const auth = useSelector(state => state.firebase.auth)

  return (
    <ul className="sidebar-container" role="navigation">
      {routes.map(({ name, path, icon: Icon, public: isPublic }) => {
        if (!isPublic && isLoaded(auth) && isEmpty(auth))
          return <Fragment key={name} />

        return (
          <li key={name} className="sidebar-inner">
            <Link
              to={path}
              title={name}
              aria-label={name}
              getProps={({ isCurrent }) => ({
                className: isCurrent ? 'sidebar-link active' : 'sidebar-link',
              })}
            >
              <Icon />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

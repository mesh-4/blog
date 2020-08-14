import React from 'react'
import PropTypes from 'prop-types'
import { useMatch, Link } from 'react-router-dom'
import {
  MdHome,
  MdDashboard,
  MdDescription,
  MdAssessment,
  MdImage,
} from 'react-icons/md'

const fields = [
  {
    name: 'home',
    to: '/',
    icon: <MdHome />,
  },
  {
    name: 'dashboard',
    to: '/dashboard',
    icon: <MdDashboard />,
  },
  {
    name: 'markdown',
    to: '/dashboard/markdown',
    icon: <MdDescription />,
  },
  {
    name: 'audios',
    to: '/dashboard/audios',
    icon: <MdAssessment />,
  },
  {
    name: 'images',
    to: '/dashboard/images',
    icon: <MdImage />,
  },
]

function SidebarLink({ to, name, icon }) {
  const match = useMatch(to)

  return (
    <Link
      to={to}
      title={name}
      className={`w-full h-full flex items-center justify-around ${
        match ? 'text-theme-primary' : 'text-primary'
      } hover:text-theme-primary hover:bg-dark1 text-lg`}
    >
      {icon}
    </Link>
  )
}

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export function Sidebar() {
  return (
    <ul
      className="list-none m-0 p-0 h-screen bg-dark2"
      style={{ width: '60px' }}
    >
      {fields.map(({ name, to, icon }) => (
        <li key={name} className="w-full" style={{ height: '50px' }}>
          <SidebarLink to={to} name={name} icon={icon} />
        </li>
      ))}
    </ul>
  )
}

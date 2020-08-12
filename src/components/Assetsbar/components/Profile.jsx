import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FaInfoCircle, FaGithub, FaTwitter } from 'react-icons/fa'

import avatar from '@/images/avatar.png'

export function Profile() {
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth())

  return (
    <div className="relative px-4 py-4 flex flex-col">
      <div className="flex flex-none mb-3" style={{ height: '85px' }}>
        <Link
          to="/"
          className="block flex-none"
          style={{ width: '100px', height: '85px' }}
        >
          <img
            style={{ height: '85px' }}
            src={avatar}
            alt="memoji of Senlima Sun"
          />
        </Link>

        <div className="flex flex-col flex-auto w-full">
          <p className="m-0 text-xl font-medium">Senlima Sun</p>
          <p className="m-0 mb-2 text-secondary">
            Full Stack Develop, Cola Taster
          </p>
          <nav className="flex items-center">
            <a
              className="block text-xl mr-6"
              rel="noopener noreferrer"
              target="_blank"
              title="Profile"
              aria-label="Self profile"
              href="https://senlima.info"
            >
              <FaInfoCircle />
            </a>
            <a
              className="block text-xl mr-6"
              rel="noopener noreferrer"
              target="_blank"
              title="Github"
              aria-label="Github profile"
              href="https://github.com/senlima0430"
            >
              <FaGithub />
            </a>
            <a
              className="block text-xl"
              rel="noopener noreferrer"
              target="_blank"
              title="Twitter"
              aria-label="Twitter profile"
              href="https://twitter.com/senlima4"
            >
              <FaTwitter />
            </a>
          </nav>
        </div>
      </div>

      <p className="mt-0 flex-auto h-full">Keep sharp.</p>

      <div className="flex-none flex items-center" style={{ height: '30px' }}>
        {!loading && !user ? (
          <>
            <a
              className="flex-auto block border border-solid border-white hover:border-primary hover:text-theme-primary rounded px-2 py-1 text-xs text-center mr-2"
              title="Email contact"
              aria-label="Email link"
              href="mailto:senlima0430@gmail.com"
            >
              <span>Contact</span>
            </a>
            <a
              className="flex-auto block border border-solid border-white hover:border-primary hover:text-theme-primary rounded px-2 py-1 text-xs text-center"
              rel="noopener noreferrer"
              target="_blank"
              title="Buy me a coffee"
              aria-label="Buy me a coffee profile"
              href="https://www.buymeacoffee.com/senlima"
            >
              <span>Support</span>
            </a>
          </>
        ) : (
          <>
            <button
              className="flex-1 mr-2 block text-primary bg-teal-700 rounded w-full h-full text-xs"
              type="button"
              onClick={() => navigate('/dashboard')}
            >
              <span>Dashboard</span>
            </button>

            <button
              className="flex-1 block text-primary bg-red-600 rounded w-full h-full text-xs"
              type="button"
              onClick={async () => {
                await auth().signOut()
                toast.success('Logout successfully!')
              }}
            >
              <span>Logout</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
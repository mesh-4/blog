import React from 'react'
import { Link, RouteComponentProps } from '@reach/router'

import image from '@/assets/not_found.svg'

export function NotFound(props: RouteComponentProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>
        <img className="block w-56" src={image} alt="nothing here" />
        <Link className="block w-full text-center mt-2" to="/">
          Back to home page
        </Link>
      </div>
    </div>
  )
}

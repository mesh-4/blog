import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaAngleLeft } from 'react-icons/fa'
import { useMediaQuery } from '@material-ui/core'
import { firestore } from 'firebase/app'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { Head } from '@components/seo/Head'
import { Footer } from '@components/seo/Footer'

export function Podcast() {
  const { id } = useParams()
  const [result, loading] = useDocumentData(firestore().doc(`audio/${id}`))
  const isMobile = useMediaQuery('(max-width:959px)')

  if (loading) return <p>Loading</p>

  return (
    <>
      <Head
        type="website"
        title={result.title}
        description={result.description}
        url={`https://senlima.blog/podcast/${id}`}
      />
      {isMobile && (
        <div className="mb-4 w-1/2">
          <Link className="flex items-center" to="/">
            <FaAngleLeft className="inline mr-2" />
            to home page
          </Link>
        </div>
      )}
      <main>
        <h1 className="mt-0 text-2xl font-semibold">{result.title}</h1>
        <time className="my-4 text-sm font-hairline">
          created at {result.createdAt.toDate().toLocaleDateString()}
        </time>
        <h2 className="mt-4 text-lg font-light leading-normal break-words">
          {result.description}
        </h2>
      </main>
      <Footer freeGap isAbsolute />
    </>
  )
}

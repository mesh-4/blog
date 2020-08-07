import React from 'react'

import { Head } from '@/components/Layout/Head'
import { Footer } from '@/components/Layout/Footer'

import { PodcastPublishList } from '../components/PodcastPublishList'

export function Podcasts() {
  return (
    <>
      <Head
        title="Podcasts"
        description="包含所有由 Senlima Sun創造的 Podcast內容。"
        url="https://senlima.blog/podcasts"
      />
      <main style={{ margin: '40px auto', width: '90%', maxWidth: '680px' }}>
        <h1 className="mt-0 mb-1 text-3xl">Podcasts</h1>

        <ul className="list-none p-0">
          <PodcastPublishList />
        </ul>
      </main>
      <Footer />
    </>
  )
}

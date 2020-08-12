import React from 'react'

import { Head } from '@components/seo/Head'
import { Footer } from '@components/seo/Footer'
import { PublishNav } from '@common/components/PublishNav'

import { PodcastList } from '../components/PodcastList'

export function Podcasts() {
  return (
    <div className="mx-auto mt-12 w-10/12" style={{ maxWidth: '680px' }}>
      <Head
        type="article"
        cover="https://senlima.blog/assets/cover.png"
        title="Podcasts"
        description="All published podcasts by Senlima Sun"
        url="https://senlima.blog/podcasts"
      />

      <header>
        <div className="flex items-center justify-between">
          <h1 className="block text-3xl font-semibold">Podcasts</h1>
          <PublishNav />
        </div>
        <h2 className="block text-xl text-secondary">
          All published podcasts by Senlima Sun
        </h2>
      </header>

      <main className="mt-10">
        <ul className="list-none p-0">
          <PodcastList />
        </ul>
      </main>

      <Footer isAbsolute />
    </div>
  )
}

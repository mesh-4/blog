import React from 'react'

import { Head } from '@components/seo/Head'
import { Footer } from '@components/seo/Footer'
import { PublishNav } from '@common/components/PublishNav'

import { ArticleList } from '../components/ArticleList'

export function Articles() {
  return (
    <div className="mx-auto mt-12 w-10/12" style={{ maxWidth: '680px' }}>
      <Head
        type="article"
        cover="https://senlima.blog/assets/cover.png"
        title="Articles"
        description="All published articles by Senlima Sun"
        url="https://senlima.blog/articles"
      />

      <header>
        <div className="flex items-center justify-between">
          <h1 className="block text-3xl font-semibold">Articles</h1>
          <PublishNav />
        </div>
        <h2 className="block text-xl text-secondary">
          All published articles by Senlima Sun
        </h2>
      </header>

      <main className="mt-10">
        <ArticleList type="publish" />
      </main>

      <Footer freeGap isAbsolute={false} />
    </div>
  )
}

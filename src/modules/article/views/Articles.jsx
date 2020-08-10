import React from 'react'

import { Head } from '@components/seo/Head'
import { Footer } from '@components/seo/Footer'

import { ArticleList } from '../components/ArticleList'

export function Articles() {
  return (
    <>
      <Head
        title="Articles"
        description="All articles that from Senlima's blog"
        url="https://senlima.blog/articles"
      />
      <main className="m-auto mt-12 mb-0 w-11/12 max-w-screen-sm">
        <h1 className="mb-4 text-3xl font-hairline">Articles</h1>
        <ArticleList type="publish" />
      </main>
      <Footer isAbsolute={false} />
    </>
  )
}

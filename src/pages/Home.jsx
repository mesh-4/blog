import React from 'react'

import { Head } from '@/components/Layout/Head'
import { Footer } from '@/components/Layout/Footer'
import { ArticleLastestList } from '@/components/Article/ArticleLastestList'

export function Home() {
  return (
    <>
      <Head
        title="Home"
        description="紀錄網頁開發以及心路歷程等內容。不僅包含文章，也有 podcast內容。"
        cover="gs://blog-282901.appspot.com/images/_blog-cover.jpg"
        url="https://senlima.blog"
      />
      <div className="m-auto mt-12 mb-0 w-11/12 max-w-screen-sm">
        <header className="mt-4">
          <h1 className="mb-0 font-semibold">Senlima Sun&apos;s blog</h1>
          <h2 className="my-1 font-semibold text-secondary text-xl">
            Web development note
          </h2>
        </header>

        <p className="mt-8 mb-1 text-2xl font-hairline">Lastest articles</p>
        <ul className="list-none p-0">
          <ArticleLastestList />
        </ul>
      </div>
      <Footer />
    </>
  )
}

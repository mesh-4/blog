import React from 'react'

import { Head } from '@components/seo/Head'
import { Footer } from '@components/seo/Footer'

import { SearchInput } from '@/components/SearchInput'

export function Search() {
  return (
    <>
      <Head
        title="Search"
        description="搜尋 Senlima Sun's blog中的文章頁面"
        url="https://senlima.blog/search"
      />
      <div style={{ margin: '40px auto', width: '90%', maxWidth: '680px' }}>
        <SearchInput />
      </div>
      <Footer />
    </>
  )
}

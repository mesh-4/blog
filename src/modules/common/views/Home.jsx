import React from 'react'
import { FaReact, FaPython, FaBook, FaMicrophoneAlt } from 'react-icons/fa'

import { Head } from '@components/seo/Head'
import { Footer } from '@components/seo/Footer'

export function Home() {
  return (
    <>
      <Head
        title="Home"
        description="紀錄網頁開發以及心路歷程等內容。不僅包含文章，也有 podcast內容。"
        cover="https://senlima.blog/assets/cover.png"
        url="https://senlima.blog"
      />
      <div className="m-auto mt-12 mb-0 w-11/12 max-w-screen-sm">
        <header className="mt-4">
          <h1 className="mb-0 font-semibold text-3xl">
            Senlima Sun&apos;s blog
          </h1>
          <h2 className="my-1 font-semibold text-secondary text-xl">
            Web development note
          </h2>
        </header>

        <p className="mt-6 mb-4 text-base">
          blog會不斷地更新它的頁面、架構和各種功能。 未來
          blog將會有以下種類的內容：
        </p>

        <div className="flex flex-wrap justify-between">
          <div className="mb-2 p-4 flex-initial w-5/12 bg-white rounded flex flex-no-wrap items-center">
            <FaReact
              className="flex-none h-full mr-4"
              style={{ color: '#00d8ff', width: '40px' }}
            />
            <div className="flex-auto w-full text-black">
              <h3>前端</h3>
              <p className="text-secondary">
                主要使用 React，也會寫其他框架以及工具
              </p>
            </div>
          </div>

          <div className="mb-2 p-4 flex-initial w-5/12 bg-white rounded flex flex-no-wrap items-center">
            <FaPython
              className="flex-none h-full mr-4"
              style={{ color: '#4584b6', width: '40px' }}
            />
            <div className="flex-auto w-full text-black">
              <h3>後端</h3>
              <p className="text-secondary">使用 Python以及 Node，無所不造</p>
            </div>
          </div>

          <div className="p-4 flex-initial w-5/12 bg-white rounded flex flex-no-wrap items-center">
            <div
              className="flex-none h-full mr-4 text-black flex items-center justify-between"
              style={{ width: '40px' }}
            >
              <FaMicrophoneAlt style={{ width: '30px', height: '60%' }} />
            </div>
            <div className="flex-auto w-full text-black">
              <h3>Podcast</h3>
              <p className="text-secondary">
                會講一些對架構或是其他事物的使用心得或看法
              </p>
            </div>
          </div>

          <div className="p-4 flex-initial w-5/12 bg-white rounded flex flex-no-wrap items-center">
            <div
              className="flex-none h-full mr-4 text-black flex items-center justify-between"
              style={{ width: '40px' }}
            >
              <FaBook style={{ width: '30px', height: '60%' }} />
            </div>
            <div className="flex-auto w-full text-black">
              <h3>Tutorial</h3>
              <p className="text-secondary">一些關於網頁或是其他工具的教學</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

import React from 'react'
import Typewriter from 'typewriter-effect'
import { Link } from 'react-router-dom'

import { Head } from '@components/seo/Head'
import { Footer } from '@components/seo/Footer'

import { MotionBack } from '../components/MotionBack'

export function Home() {
  return (
    <>
      <Head
        title="Home"
        description="紀錄網頁開發以及心路歷程等內容。不僅包含文章，也有 podcast內容。"
        cover="https://senlima.blog/assets/cover.png"
        url="https://senlima.blog"
      />
      <MotionBack />
      <div className="w-full h-screen flex items-center justify-around">
        <div className="w-5/6 md:w-auto">
          <main>
            <h1 className="font-black" style={{ fontSize: '81px' }}>
              Senlima Sun
            </h1>
            <h2 className="font-semibold text-2xl">
              Developer of{' '}
              <Typewriter
                options={{
                  loop: true,
                  autoStart: true,
                  strings: [
                    'Serverless',
                    'Full Stack Application',
                    'PWA',
                    'Micro Service',
                    'API service',
                  ],
                }}
              />
            </h2>
          </main>
          <nav className="relative mt-8 w-full flex items-center justify-between">
            <Link
              className="p-0 md:px-4 md:py-2 md:border border-solid border-primary rounded-lg text-theme-primary"
              to="articles"
              title="Articles"
            >
              Articles
            </Link>
            <Link
              className="p-0 md:px-4 md:py-2 md:border border-solid border-primary rounded-lg text-theme-primary"
              to="podcasts"
              title="Podcasts"
            >
              Podcasts
            </Link>
            <Link
              className="p-0 md:px-4 md:py-2 md:border border-solid border-disabled rounded-lg text-secondary pointer-events-none"
              to="images"
              aria-label="Coming soon..."
            >
              Images
            </Link>
            <Link
              className="p-0 md:px-4 md:py-2 md:border border-solid border-primary rounded-lg text-theme-primary"
              to="about"
              title="About"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  )
}

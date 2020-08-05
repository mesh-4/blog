import React from 'react'
import FaceIcon from '@material-ui/icons/Face'
import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import { Head } from '@/components/Layout/Head'
import { Footer } from '@/components/Layout/Footer'

export function About() {
  return (
    <>
      <Head
        type="profile"
        title="About"
        description="關於作者"
        url="https://senlima.blog/about"
      />
      <main className="mt-6 mx-auto max-w-screen-sm text-left">
        <p className="mb-4 text-4xl font-hairline">About me</p>

        <h1 className="mb-1 text-3xl font-semibold">Senlima Sun</h1>
        <h2 className="m-0 text-xl">Full Stack Developer, Cola Taster</h2>

        <nav className="my-4">
          <a
            className="mr-4"
            rel="noreferrer"
            target="_blank"
            title="Profile"
            aria-label="Senlima's personal profile"
            href="https://www.senlima.info"
          >
            <FaceIcon />
          </a>
          <a
            className="mr-4"
            rel="noreferrer"
            target="_blank"
            title="Github"
            aria-label="Senlima's github link"
            href="https://github.com/senlima0430"
          >
            <GitHubIcon />
          </a>
          <a
            className="mr-4"
            rel="noreferrer"
            target="_blank"
            title="Twitter"
            aria-label="Senlima's twitter link"
            href="https://twitter.com/senlima4"
          >
            <TwitterIcon />
          </a>
          <a
            className="mr-4"
            rel="noreferrer"
            target="_blank"
            title="Support link"
            aria-label="Senlima's support link"
            href="https://www.buymeacoffee.com/senlima"
          >
            <MonetizationOnIcon />
          </a>
        </nav>

        <div>
          <p>
            紀錄各種問題或是想法，不僅僅使用文字，也將使用聲音作為載體傳達內容。在未來也將會推出一系列的影片，敬請期待。
          </p>
        </div>

        <p>
          我仍在尋找工作機會以及接案機會，您可以透過{' '}
          <a
            className="text-primary"
            target="_top"
            aria-label="email link"
            href="mailto:senlima0430@gmail.com"
          >
            email
          </a>{' '}
          來與我取得聯絡。我會儘快回復您。
        </p>

        <div>
          <p className="text-xl mb-2">What I can work with?</p>
          <div>
            Nodejs, Typescript, VanillaJS, CSS, React, Vue, Sass/Scss,
            PostCSS, Webpack(self-config), Jest, Lerna, Python, MySQL,
            PostgreSQL, MongoDB, Firebase, Docker, Jenkins, Figma, Slack
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

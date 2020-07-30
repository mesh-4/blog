import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import { Head } from '@/components/Layout/Head'

export function About() {
  return (
    <>
      <Head title="About" description="關於作者" />
      <main
        style={{
          margin: '40px auto',
          width: '90%',
          maxWidth: '680px',
          textAlign: 'left',
        }}
      >
        <p style={{ fontWeight: 100, marginBottom: '1em', fontSize: '36px' }}>
          About me
        </p>

        <h1
          style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 600 }}
        >
          Senlima Sun
        </h1>
        <h2 style={{ margin: '0', fontSize: '18px' }}>
          Full Stack Developer, Cola Taster
        </h2>

        <nav className="home-information">
          <a
            rel="noreferrer"
            target="_blank"
            title="Github"
            aria-label="Senlima's github link"
            href="https://github.com/senlima0430"
          >
            <GitHubIcon />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            title="Twitter"
            aria-label="Senlima's twitter link"
            href="https://twitter.com/senlima4"
          >
            <TwitterIcon />
          </a>
          <a
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
            href="mailto:senlima0430@gmail.com"
            target="_top"
            aria-label="email link"
            style={{ color: '#37f570' }}
          >
            email
          </a>{' '}
          來與我取得聯絡。我會儘快回復您。
        </p>

        <div>
          <p style={{ fontSize: '18px', marginBottom: '0.5em' }}>
            What I can work with?
          </p>
          <div>
            Nodejs, Typescript, VanillaJS, CSS, React, Vue, Sass/Scss, PostCSS,
            Webpack(self-config), Jest, Lerna, Python, MySQL, PostgreSQL,
            MongoDB, Firebase, Docker, Jenkins, Figma, Slack
          </div>
        </div>
      </main>
    </>
  )
}

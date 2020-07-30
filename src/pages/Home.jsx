import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Head } from '@/components/Layout/Head'
import { ArticleLastestList } from '@/components/Article/ArticleLastestList'

const useStyles = makeStyles(() => ({
  header: {
    marginTop: '5vh',
  },
}))

export function Home() {
  const classes = useStyles()

  return (
    <>
      <Head
        title="Home"
        description="紀錄網頁開發以及心路歷程等內容。不僅包含文章，也有 podcast內容。"
        cover="https://drscdn.500px.org/photo/1019605743/m%3D900/v2?sig=92be0cdab57bb6c7646935f0b3724b3bfc12b37a2a829421e94e90df39e28126"
      />
      <div style={{ margin: '40px auto', width: '90%', maxWidth: '680px' }}>
        <header className={classes.header}>
          <h1 style={{ fontWeight: 700, marginBottom: '0' }}>
            Senlima Sun&apos;s blog
          </h1>
          <h2
            style={{
              fontWeight: 600,
              color: '#9c9c9c',
              margin: '5px 0',
              fontSize: '20px',
            }}
          >
            Web development note
          </h2>
        </header>

        <p
          style={{
            margin: '2.5vh 0 10px 0',
            fontSize: '26px',
            fontWeight: 100,
          }}
        >
          Lastest articles
        </p>
        <ul className="lastest-articles-container">
          <ArticleLastestList />
        </ul>
      </div>
    </>
  )
}

import RSS from 'rss'
import fs from 'fs'

const siteURL = 'https://senlima.blog'
const ownerMail = 'senlima0430@gmail.com'

type Items = {
  [key: string]: string
}

export async function generateRSS(posts: Items[]) {
  const feed = new RSS({
    title: "Senlima Sun's Blog",
    description: '太過有感才會發，也有可能隨便發一些網頁技術的文章',
    feed_url: siteURL + '/rss.xml',
    site_url: siteURL,
    image_url: siteURL + '/assets/cover.jpg',
    managingEditor: ownerMail,
    webMaster: ownerMail,
    copyright: `${new Date().getFullYear()} Senlima Sun`,
    language: 'zh-TW',
    ttl: 60,
  })

  posts.map(post => {
    feed.item({
      guid: post.slug,
      title: post.title,
      author: 'Senlima Sun',
      description: post.excerpt,
      url: `${siteURL}/posts/${post.slug}`,
      date: new Date(post.date).toUTCString(),
    })
  })

  const path = `${process.cwd()}/public/rss.xml`
  fs.writeFileSync(path, feed.xml({ indent: true }), 'utf8')
}

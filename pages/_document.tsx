import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-TW">
        <Head>
          <script
            async
            defer
            data-website-id="3d450f27-000c-4d61-aa92-a111945e22f4"
            src="https://umami-gilt.vercel.app/umami.js"
          ></script>
          <script async defer src="/hotjar.js"></script>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for blog posts"
            href="https://senlima.info/rss.xml"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

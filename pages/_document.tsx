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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

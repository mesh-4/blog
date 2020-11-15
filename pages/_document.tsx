import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import { icons, apple_touch_icons } from 'src/constants'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-TW">
        <Head>
          {icons.map(({ size, href }) => (
            <link
              key={size}
              rel="icon"
              type="image/png"
              sizes={`${size}x${size}`}
              href={href}
            />
          ))}
          {apple_touch_icons.map(({ size, href }) => (
            <link
              key={size}
              rel="apple-touch-icon"
              sizes={`${size}x${size}`}
              href={href}
            />
          ))}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#ffffff" />
          <script
            async
            defer
            data-website-id="3d450f27-000c-4d61-aa92-a111945e22f4"
            src="https://umami-gilt.vercel.app/umami.js"
          ></script>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for blog posts"
            href="https://senlima.blog/rss.xml"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

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
            src="https://ackee.senlima0430.vercel.app/tracker.js"
            data-ackee-server="https://ackee.senlima0430.vercel.app"
            data-ackee-domain-id="88273618-ce06-4d6b-8596-094a2d2f4bde"
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

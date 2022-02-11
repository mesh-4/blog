import { Outlet } from 'remix'
import type { MetaFunction, LinksFunction } from 'remix'
import { ChakraProvider, localStorageManager } from '@chakra-ui/react'

import { s3URL } from './utils/url'

import { Document } from './components/document'

import stylesheet from './styles.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesheet,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: s3URL('/blog/apple-icon-180x180.png'),
    },
    {
      rel: 'icon',
      sizes: '16x16',
      href: s3URL('/blog/favicon-16x16.png'),
    },
    {
      rel: 'icon',
      sizes: '32x32',
      href: s3URL('/blog/favicon-32x32.png'),
    },
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: "Senlima Sun's blog",
    description: 'Some web development stuff and some random stuff',
    'og:image': 'https://assets.senlima.dev/blog-cover.png',
    'og:title': "Senlima Sun's blog",
    'og:description': 'Some web development stuff and some random stuff',
    'og:url': 'https://blog.senlima.dev',
    'twitter:image': 'https://assets.senlima.dev/blog-cover.png',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@senlima4',
    'twitter:site': '@senlima4',
    'twitter:title': "Senlima Sun's blog",
    'twitter:description': 'Some web development stuff and some random stuff',
    'theme-color': '#2C7A7B',
  }
}

export default function App() {
  return (
    <Document>
      <ChakraProvider colorModeManager={localStorageManager}>
        <Outlet />
      </ChakraProvider>
    </Document>
  )
}

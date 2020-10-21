import { AppProps, NextWebVitalsMetric } from 'next/app'
import dynamic from 'next/dynamic'

import 'nprogress/nprogress.css'
import 'styles/index.css'

const TopProgressBar = dynamic(
  () => {
    return import('components/TopProgressBar')
  },
  { ssr: false }
)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopProgressBar />
      <Component {...pageProps} />
    </>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

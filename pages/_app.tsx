import { AppProps } from 'next/app'
import { localStorageManager, ChakraProvider } from '@chakra-ui/react'

import 'styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider colorModeManager={localStorageManager}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

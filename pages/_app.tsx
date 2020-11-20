import { AppProps } from 'next/app'
import { localStorageManager, ChakraProvider } from '@chakra-ui/react'

import { theme } from 'src/theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

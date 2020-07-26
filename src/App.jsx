import React from 'react'
import { useRecoilValue } from 'recoil'
import { hot } from 'react-hot-loader/root'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import { Routes } from './Routes'
import { themeAtom } from './store'

const lightTheme = createMuiTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    secondary: {
      main: '#515151',
    },
  },
})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#000000',
    },
    primary: {
      main: '#37f570',
    },
    secondary: {
      main: '#ffffff',
    },
  },
})

export function App() {
  const theme = useRecoilValue(themeAtom)

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default hot(App)

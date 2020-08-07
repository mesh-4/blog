import React from 'react'
import { auth } from 'firebase/app'
import { hot } from 'react-hot-loader/root'
import { useAuthState } from 'react-firebase-hooks/auth'

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import { Routes } from './Routes'
import { LoadingScreen } from './components/Loading'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#161616',
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
  // eslint-disable-next-line
  const [user, loading] = useAuthState(auth())

  if (loading)
    return (
      <ThemeProvider theme={theme}>
        <LoadingScreen />
      </ThemeProvider>
    )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default hot(App)

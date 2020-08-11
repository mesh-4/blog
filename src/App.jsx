import React from 'react'
import { hot } from 'react-hot-loader/root'

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import { Routes } from './Routes'

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default hot(App)

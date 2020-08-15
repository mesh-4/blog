import React from 'react'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

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
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          newestOnTop={false}
          autoClose={3000}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          pauseOnFocusLoss
        />
      </BrowserRouter>
    </RecoilRoot>
  )
}

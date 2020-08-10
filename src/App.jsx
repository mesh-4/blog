import React from 'react'
import { auth } from 'firebase/app'
import { Router } from '@reach/router'
import { hot } from 'react-hot-loader/root'
import { useAuthState } from 'react-firebase-hooks/auth'

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import { NotFound } from '@common/views/NotFound'
import { Article } from '@article/views/Article'
import { PrivateRoute } from '@components/PrivateRoute'
import { LoadingScreen } from '@components/LoadingScreen'

import { useRoutes } from './hooks/useRoutes'

import { Container } from './components/Layout/Container'

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
  const routes = useRoutes('all')

  if (loading)
    return (
      <ThemeProvider theme={theme}>
        <LoadingScreen />
      </ThemeProvider>
    )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container path="/">
          <Article path="/article/:slug" />
          {routes
            .filter(({ inContainer }) => inContainer)
            .map(({ public: isPublic, name, path, component: Component }) =>
              isPublic ? (
                <Component key={name} path={path} />
              ) : (
                <PrivateRoute key={name} as={Component} path={path} />
              )
            )}
        </Container>

        {routes
          .filter(({ inContainer }) => !inContainer)
          .map(({ public: isPublic, name, path, component: Component }) =>
            isPublic ? (
              <Component key={name} path={path} />
            ) : (
              <PrivateRoute key={name} as={Component} path={path} />
            )
          )}
        <NotFound default />
      </Router>
    </ThemeProvider>
  )
}

export default hot(App)

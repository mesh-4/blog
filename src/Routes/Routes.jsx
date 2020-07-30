import React from 'react'
import Loadable from 'react-loadable'
import { Router } from '@reach/router'

import { routes } from '@/constant'
import { NotFound } from '@/pages'
import { Container } from '@/components/Layout/Container'
import { PrivateRoute } from './PrivateRoute'

const Article = Loadable({
  loader: () => import('@/pages/Article').then(module => module.Article),
  loading() {
    return <div>Loading...</div>
  },
})

export function Routes() {
  return (
    <Router>
      <Container path="/">
        {routes
          .filter(({ inContainer }) => inContainer)
          .map(({ public: isPublic, name, path, component: Component }) =>
            isPublic ? (
              <Component key={name} path={path} />
            ) : (
              <PrivateRoute key={name} as={Component} path={path} />
            )
          )}

        <Article path="/article/:slug" />
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
  )
}

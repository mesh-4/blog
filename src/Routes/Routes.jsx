import React from 'react'
import { Router } from '@reach/router'

import { routes } from '@/constant'
import { Article, NotFound } from '@/pages'
import { Container } from '@/components/Layout/Container'
import { PrivateRoute } from './PrivateRoute'

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

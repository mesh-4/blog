import React from 'react'
import { Router } from '@reach/router'

import { routes } from '@/constant'
import { NotFound } from '@/pages'
import { Container } from '@/components/Layout/Container'
import { Article } from '@article/views/Article'

import { PrivateRoute } from './PrivateRoute'

export function Routes() {
  return (
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
  )
}

import React from 'react'
import { auth } from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, useRoutes } from 'react-router-dom'

import { Dashboard } from '@components/Dashboard'
import { LoadingScreen } from '@components/LoadingScreen'
import { AdminContainer } from '@components/AdminContainer'
import { VisitorContainer } from '@components/VisitorContainer'

import { Home } from '@common/views/Home'
import { About } from '@common/views/About'
import { Login } from '@common/views/Login'
import { NotFound } from '@common/views/NotFound'

import { Audios } from '@audio/views/Audios'
import { Editor } from '@markdown/views/Editor'

import { Images } from '@image/views/Images'
import { Articles } from '@article/views/Articles'
import { Podcasts } from '@podcast/views/Podcasts'
import { ArticleContainer, Article } from '@article/views/Article'
import { PodcastContainer, Podcast } from '@podcast/views/Podcast'

export function Routes() {
  const [user, loading] = useAuthState(auth())
  const routes = useRoutes([
    {
      path: '/',
      element: <VisitorContainer />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'articles',
          element: <Articles />,
        },
        {
          path: 'podcasts',
          element: <Podcasts />,
        },
        {
          path: 'article/*',
          element: <ArticleContainer />,
          children: [
            {
              path: ':slug',
              element: <Article />,
            },
          ],
        },
        {
          path: 'podcast/*',
          element: <PodcastContainer />,
          children: [
            {
              path: ':id',
              element: <Podcast />,
            },
          ],
        },
      ],
    },
    {
      path: 'dashboard',
      element: <AdminContainer />,
      children: [
        {
          path: '/',
          element: !user ? <Navigate to="/" replace /> : <Dashboard />,
        },
        {
          path: 'images',
          element: !user ? <Navigate to="/" replace /> : <Images />,
        },
        {
          path: 'audios',
          element: !user ? <Navigate to="/" replace /> : <Audios />,
        },
        {
          path: 'markdown',
          element: !user ? <Navigate to="/" replace /> : <Editor />,
        },
      ],
    },
    { path: 'login', element: <Login /> },
    { path: '*', element: <NotFound /> },
  ])

  if (loading) return <LoadingScreen />

  return routes
}

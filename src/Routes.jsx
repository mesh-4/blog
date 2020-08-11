import React from 'react'
import { auth } from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, useRoutes } from 'react-router-dom'

import { useMediaQuery } from '@material-ui/core'

import { Home } from '@common/views/Home'
import { Login } from '@common/views/Login'
import { NotFound } from '@common/views/NotFound'
import { Article } from '@article/views/Article'
import { Editor } from '@markdown/views/Editor'
import { Audios } from '@podcast/views/Audios'
import { ArticleContainer } from '@article/views/Article/Container'
import { PodcastContainer, Podcast } from '@podcast/views/Podcast'
import { LoadingScreen } from '@components/LoadingScreen'

import { Assetsbar } from '@components/Assetsbar'
import { Dashboard } from '@components/Dashboard'
import { AdminContainer } from '@components/containers/AdminContainer'
import { VisitorContainer } from '@components/containers/VisitorContainer'

export function Routes() {
  const [user, loading] = useAuthState(auth())
  const isMobile = useMediaQuery('(max-width:959px)')
  const routes = useRoutes([
    {
      path: '/',
      element: <VisitorContainer />,
      children: [
        { path: '/', element: isMobile ? <Assetsbar /> : <Home /> },
        {
          path: 'article/*',
          element: <ArticleContainer />,
          children: [{ path: ':slug', element: <Article /> }],
        },
        {
          path: 'podcast/*',
          element: <PodcastContainer />,
          children: [{ path: ':id', element: <Podcast /> }],
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
          path: 'markdown',
          element: !user ? <Navigate to="/" replace /> : <Editor />,
        },
        {
          path: 'audios',
          element: !user ? <Navigate to="/" replace /> : <Audios />,
        },
      ],
    },
    { path: 'login', element: <Login /> },
    { path: '*', element: <NotFound /> },
  ])

  if (loading) return <LoadingScreen />

  return routes
}

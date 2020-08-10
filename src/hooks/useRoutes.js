import Loadable from 'react-loadable'

import { Home } from '@common/views/Home'
import { Login } from '@common/views/Login'
import { LoadingScreen } from '@components/LoadingScreen'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    public: true,
    inContainer: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    public: true,
    inContainer: false,
  },
  {
    path: '/search',
    name: 'Search',
    public: true,
    inContainer: true,
    component: Loadable({
      loader: () =>
        import('@common/views/Search').then(module => module.Search),
      loading: LoadingScreen,
    }),
  },
  {
    path: '/articles',
    name: 'Articles',
    public: true,
    inContainer: true,
    component: Loadable({
      loader: () =>
        import('@article/views/Articles').then(module => module.Articles),
      loading: LoadingScreen,
    }),
  },
  {
    path: '/podcasts',
    name: 'Podcasts',
    public: true,
    inContainer: true,
    component: Loadable({
      loader: () =>
        import('@podcast/views/Podcasts').then(module => module.Podcasts),
      loading: LoadingScreen,
    }),
  },
  {
    path: '/audios',
    name: 'Audios',
    public: false,
    inContainer: true,
    component: Loadable({
      loader: () =>
        import('@podcast/views/Audios').then(module => module.Audios),
      loading: LoadingScreen,
    }),
  },
  {
    path: '/editor',
    name: 'Editor',
    public: false,
    inContainer: true,
    component: Loadable({
      loader: () =>
        import('@markdown/views/Editor').then(module => module.Editor),
      loading: LoadingScreen,
    }),
  },
]

export function useRoutes(type) {
  if (type === 'all') return routes

  return routes.filter(route => route[type] === true)
}

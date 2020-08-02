import Loadable from 'react-loadable'

import { Home, Login, About } from '@/pages'
import { LoadingScreen } from '@/components/Loading'

const Articles = Loadable({
  loader: () => import('@/pages/Articles').then(module => module.Articles),
  loading: LoadingScreen,
})

const Podcasts = Loadable({
  loader: () => import('@/pages/Podcasts').then(module => module.Podcasts),
  loading: LoadingScreen,
})

const Audios = Loadable({
  loader: () => import('@/pages/Audios').then(module => module.Audios),
  loading: LoadingScreen,
})

const Editor = Loadable({
  loader: () => import('@/pages/Editor').then(module => module.Editor),
  loading: LoadingScreen,
})

const Search = Loadable({
  loader: () => import('@/pages/Search').then(module => module.Search),
  loading: LoadingScreen,
})

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    public: true,
    inContainer: true,
  },
  {
    path: '/audios',
    name: 'Audios',
    component: Audios,
    public: false,
    inContainer: true,
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor,
    public: false,
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
    path: '/about',
    name: 'About',
    component: About,
    public: true,
    inContainer: true,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    public: true,
    inContainer: true,
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
    public: true,
    inContainer: true,
  },
  {
    path: '/podcasts',
    name: 'Podcasts',
    component: Podcasts,
    public: true,
    inContainer: true,
  },
]

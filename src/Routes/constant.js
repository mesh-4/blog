import { Home, Login, Editor, Audios, About, Articles } from '@/pages'

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
    path: '/articles',
    name: 'Articles',
    component: Articles,
    public: true,
    inContainer: true,
  },
]

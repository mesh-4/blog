import { createCookieSessionStorage } from 'remix'

if (typeof process.env.SESSION_SECRET !== 'string') {
  throw new Error('SESSION_SECRET is not defined')
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'sb',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET as string],
    secure: process.env.NODE_ENV === 'production',
  },
})

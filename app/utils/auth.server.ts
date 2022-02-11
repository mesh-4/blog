import { Authenticator, AuthorizationError } from 'remix-auth'
import { SupabaseStrategy } from 'remix-auth-supabase'
import type { Session } from '@supabase/supabase-js'

import { supabase } from '~/utils/supabase.server'
import { sessionStorage } from '~/utils/session.server'

export const supabaseStrategy = new SupabaseStrategy(
  {
    supabaseClient: supabase,
    sessionStorage,
    sessionKey: 'sb:session',
    sessionErrorKey: 'sb:error',
  },
  async ({ req, supabaseClient }) => {
    const form = await req.formData()
    const email = form?.get('email')
    const password = form?.get('password')

    if (!email) throw new AuthorizationError('Email is required')
    if (typeof email !== 'string')
      throw new AuthorizationError('Email must be a string')

    if (!password) throw new AuthorizationError('Password is required')
    if (typeof password !== 'string')
      throw new AuthorizationError('Password must be a string')

    return supabaseClient.auth.api
      .signInWithEmail(email, password)
      .then(({ data, error }): Session => {
        if (error || !data) {
          throw new AuthorizationError(
            error?.message ?? 'No user session found'
          )
        }

        return data
      })
  }
)

export const authenticator = new Authenticator<Session>(sessionStorage, {
  sessionKey: supabaseStrategy.sessionKey,
  sessionErrorKey: supabaseStrategy.sessionErrorKey,
})

authenticator.use(supabaseStrategy)

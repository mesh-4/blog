import { createClient } from '@supabase/supabase-js'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string
      SUPABASE_KEY: string
    }
  }
}

if (typeof process.env.SUPABASE_URL !== 'string') {
  throw new Error('SUPABASE_URL is not defined')
}
if (typeof process.env.SUPABASE_KEY !== 'string') {
  throw new Error('SUPABASE_KEY is not defined')
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    fetch,
    schema: 'public',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
)

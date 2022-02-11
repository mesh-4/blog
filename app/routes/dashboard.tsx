import { json, useLoaderData, Outlet } from 'remix'
import type { LoaderFunction } from 'remix'

import { supabaseStrategy } from '~/utils/auth.server'

import DashboardLayout from '~/layouts/dashboard'

interface LoaderData {
  email?: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await supabaseStrategy.checkSession(request, {
    failureRedirect: '/login',
  })

  return json<LoaderData>({ email: session.user?.email })
}

export default function Dashboard() {
  const { email } = useLoaderData<LoaderData>()

  return (
    <DashboardLayout email={email}>
      <Outlet />
    </DashboardLayout>
  )
}

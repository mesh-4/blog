import { ActionFunction, redirect } from 'remix'

import { supabase } from '~/utils/supabase.server'

import DashboardFeatureLayout from '~/layouts/dashboard/feature'

import CreatorForm from '~/features/articles/creator-form'

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()

  // create article
  const { error } = await supabase
    .from('article')
    .insert(
      {
        slug: formData.get('slug'),
        title: formData.get('title'),
        content: formData.get('content'),
        description: formData.get('description'),
        is_public: false,
      },
      { returning: 'minimal' }
    )
    .single()

  if (error) {
    console.log(error.message)
    return { message: error.message }
  }

  return redirect('/dashboard/articles', { status: 301 })
}

export default function ArticleCreator() {
  return (
    <DashboardFeatureLayout title="Create Article">
      <CreatorForm />
    </DashboardFeatureLayout>
  )
}
